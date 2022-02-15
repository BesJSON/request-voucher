const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["tag-tara", "tagsay"],
    name: "tagtara",
    help: "tagtara",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: (client, message, args, embed) => {
    if (!message.member.hasPermission("")) return;
    const tag = args.slice(0).join(" ") || conf.tag.tag;
    const memberss = message.guild.members.cache.filter((member) => member.user.username.includes(tag) && !member.user.bot);
    let atilacak = `**Kullanıcı adında** **\`${tag}\`** **Tagı Olan** **${memberss.size}** **Kişi Bulunuyor:** \n${memberss.map((member) => `${member}  `).join("\n") || `${tag} **Taglı Kullanıcı Yok**`}`;
    for (var i = 0; i < Math.floor(atilacak.length / 2000); i++) {
      message.channel.send(embed.setDescription(atilacak.slice(0, 2000))); message.react("✅")
      atilacak = atilacak.slice(2000);
    }
    if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
  },
};
