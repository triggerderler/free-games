const { Command } = require('@greencoast/discord.js-extended');
const logger = require('@greencoast/logger');
const { GUILD_KEYS } = require('../../common/constants');

class SetChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setchannel',
      aliases: ['channel'],
      description: 'Botun ücretsiz oyun tekliflerini duyuracağı kanalı ayarlayın.',
      emoji: ':loudspeaker:',
      group: 'config',
      guildOnly: true,
      ownerOverride: false,
      userPermissions: ['MANAGE_CHANNELS']
    });
  }

  async updateChannel(message, channel) {
    const previousChannelID = await this.client.dataProvider.get(message.guild, GUILD_KEYS.channel);

    if (previousChannelID === channel.id) {
      return message.reply('bahsettiğiniz kanal zaten duyuru kanalı olarak ayarlanmıştır.');
    }

    try {
      await this.client.dataProvider.set(message.guild, GUILD_KEYS.channel, channel.id);

      logger.info(`Duyuru kanalı değiştirildi: ${message.guild.name} to #${channel.name}.`);
      return message.channel.send(`Duyuru kanalı şu şekilde değiştirildi: ${channel}.`);
    } catch (error) {
      logger.error(error);
      return message.channel.send('Duyuru kanalını güncellemeye çalışırken bir hata oldu.');
    }
  }

  run(message) {
    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.reply(`ayarlamak istediğiniz kanalı belirtmeniz gerekiyor.`);
    }

    if (!channel.viewable) {
      return message.reply(`Bahsettiğiniz kanalı göremiyorum, erişim için yeterli iznim var mı?`);
    }

    return this.updateChannel(message, channel);
  }
}

module.exports = SetChannelCommand;
