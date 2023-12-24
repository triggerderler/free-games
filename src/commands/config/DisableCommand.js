const { Command } = require('@greencoast/discord.js-extended');
const logger = require('@greencoast/logger');
const { GUILD_KEYS } = require('../../common/constants');

class DisableCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'disable',
      description: 'Bu sunucudaki ücretsiz oyun duyurularını devre dışı bırakın.',
      emoji: ':no_entry_sign:',
      group: 'config',
      guildOnly: true,
      ownerOverride: false,
      userPermissions: ['MANAGE_CHANNELS']
    });
  }

  async run(message) {
    const currentChannel = await this.client.dataProvider.get(message.guild, GUILD_KEYS.channel, null);
  
    if (!currentChannel) {
      return message.reply('şu anda ayarlı duyuru kanalı yok.');
    }

    await this.client.dataProvider.set(message.guild, GUILD_KEYS.channel, null);
    
    logger.info(`Duyurular şu süre için devre dışı bırakıldı: ${message.guild.name}.`);
    return message.channel.send('Bu sunucuda duyurular devre dışı bırakıldı.');
  }
}

module.exports = DisableCommand;
