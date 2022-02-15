const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["yetkili-bilgi"],
    name: "yetkili-bilgi",
    help: "yetkili say",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("")) return;
    const filtered = message.guild.members.cache.filter((x) => (conf.registration.staffs.some((a) => x.roles.cache.has(a)) || x.hasPermission(8)) && !x.user.bot).array();
    embed.setFooter(`Developed by Rêquest`)
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
    embed.setDescription(`
Toplam yetkili sayısı: \`${filtered.length}\`
Aktif yetkili sayısı: \`${filtered.filter((x) => x.user.presence.status !== "offline").length}\`
Sesteki yetkili sayısı: \`${filtered.filter((x) => x.voice.channel).length}\`
    `); message.react("✅")
    message.channel.send(embed);
  },
};
