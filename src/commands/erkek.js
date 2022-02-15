const conf = require("../configs/config.json");
const isimler = require("../schemas/names");
const regstats = require("../schemas/registerStats");
const nameData = require("../schemas/names");
const { MessageFlags } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["e"],
    name: "erkek",
    help: ".e [kullanıcı] [isim] [yaş]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!conf.registration.staffs.some((x) => message.member.roles.cache.has(x)) && !message.member.hasPermission(268435456)) return message.channel.error(message, "Bu komutu kullanabilmek için \`Register\` yetkisine sahip olmalısınız.");
    message.react("⛔")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye etiketlemelisin");
    message.react("⛔")
    if (!conf.registration.unregRoles.some((x) => member.roles.cache.has(x))) return message.channel.error(message, " Bu üye zaten kayıtlı! ");
    message.react("⛔")
    const name = args.slice(1).filter((x) => isNaN(x)).map((x) => x.charAt(0).replace(/i/g, "İ").toUpperCase() + x.slice(1)).join(" ");
    const age = args.filter((x) => !isNaN(x) && member.id !== x)[0] || undefined;
    if (!name) return message.channel.error(message, "Bir isim yazmalısın");
    message.react("⛔")
    if (!age) return message.channel.error(message, " Bir yaş yazmalısın");
    message.react("⛔")
    if (name.length + age.length >= 40) return message.channel.error(message, " İsim ve yaşın uzunluğu 30 karakteri geçtiği için kayıt edemiyorum! ");
    message.react("⛔")
    if (!member.manageable) return message.channel.error(message, "Bu Kişinin Yetkisi Benden Yüksek!");
    message.react("⚠️")
    if (!member.user.username.includes(conf.tag.tag)) {
      await member.setNickname(`${conf.tag.tag} ${name}${conf.registration.brace}${age}`);
    }
    await member.roles.add(conf.registration.manRoles);
    await member.roles.remove(conf.registration.unregRoles);

    const data = await isimler.findOne({ guildID: message.guild.id, userID: member.user.id });

    embed.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }));
    embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }));
    embed.setFooter(`Developed by Rêquest`)
    embed.setColor("BLUE");
    embed.setDescription(`
**Kayıt Edilen :**  ${member.toString()}
**Verilen Rol :**  ${conf.registration.manRoles.length > 1 ? conf.registration.manRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.registration.manRoles.map(x => `<@&${x}>`).slice(-1) : conf.registration.manRoles.map(x => `<@&${x}>`).join("")}
**Kayıt Yetkilisi :**  ${message.author} 
**Sunucumuzda Toplam :**  \`${(message.guild.memberCount)}\`  **Kullanıcı Bulunmaktadır.**

${data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol})`).join("\n") : ""}
    `)
    message.react("✅")
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    message.guild.channels.cache.get(conf.chat).send(`${member.toString()} **Aramıza Yeni Biri Katıldı! Ona Hoş Geldin Diyelim!** 🥳 `);
    message.member.updateTask(message.guild.id, "kayıt", 1, message.channel);
    await nameData.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: "Kayıt", date: Date.now() } } }, { upsert: true });
  },
  
};

