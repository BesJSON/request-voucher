const conf = require("../configs/config.json");
const data = require("../schemas/names");

module.exports = {
  conf: {
	aliases: ["i"],
	name: "isim",
	help: "isim [kullanıcı] [isim] [yaş]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!conf.registration.staffs.some((x) => message.member.roles.cache.has(x)) && !message.member.hasPermission(268435456)) return message.channel.error(message, "Kayıt işlemleri için gerekli yetkiye sahip değilsin!");
    message.react("⛔")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye belirtmelisin!");
    message.react("⛔")
    const name = args.slice(1).filter((x) => isNaN(x)).map((x) => x.charAt(0).replace(/i/g, "İ").toUpperCase() + x.slice(1)).join(" ");
    const age =  args.filter((x) => !isNaN(x) && member.id !== x)[0] || undefined;
    if (!name) return message.channel.error(message, "Geçerli bir isim belirtmelisin!");
    message.react("⛔")
    if (!age) return message.channel.error(message, "Geçerli bir yaş belirtmelisin!");
    message.react("⛔")
    if (name.length + age.length >= 40) return message.channel.error(message, "İsim ve yaşın uzunluğu 30 karakteri geçtiği için kayıt edemiyorum!");
    message.react("⛔")
    if (!member.manageable) return message.channel.error(message, "Bu kişinin yetkisi benden yüksek!");
    message.react("⚠️")
    if (member.user.username.includes(conf.tag.tag)) {
      await member.setNickname(`${conf.tag.tag} ${name}${conf.registration.brace}${age}`);
      embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }));
      message.channel.send(embed.setDescription(`${member.toString()} üyesinin ismi \`${member.displayName}\` olarak değiştirildi!`));
      message.react("✅")
    } else {
      await member.setNickname(`${conf.tag.tag2} ${name}${conf.registration.brace}${age}`);
      embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }));
      message.channel.send(embed.setDescription(`${member.toString()} üyesinin ismi \`${member.displayName}\` olarak değiştirildi!`));
      message.react("✅")
    }

    await data.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: "İsim Değişme", date: Date.now() } } }, { upsert: true });
  },
};
