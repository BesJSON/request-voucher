const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["yaş-ortalama"],
    name: "yaşortalaması",
    help: "yaşortalaması",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("")) return;
    const members = message.guild.members.cache.filter((x) => x.nickname && x.nickname.includes(conf.registration.brace) && !isNaN(x.nickname.split(conf.registration.brace)[1]));
    const all = members.map((x) => parseInt(x.nickname.split(conf.registration.brace)[1]));
    const mans = members.filter((x) => conf.registration.manRoles.some((r) => x.roles.cache.has(r))).map((x) => parseInt(x.nickname.split(conf.registration.brace)[1]));
    const womans = members.filter((x) => conf.registration.womanRoles.some((r) => x.roles.cache.has(r))).map((x) => parseInt(x.nickname.split(conf.registration.brace)[1]));
    const taggeds = members.filter((x) => x.user.username.includes(conf.tag.tag)).map((x) => parseInt(x.nickname.split(conf.registration.brace)[1]));
    
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
    await message.channel.send(embed.setDescription(`
\`${message.guild.name}\` Sunucusunun yaş ortalaması;

Genel: ${(calculateAverage(all))}
Erkek: ${(calculateAverage(mans))}
Kız: ${(calculateAverage(womans))}
Taglı: ${(calculateAverage(taggeds))}
    `)); message.react("✅")
  },
};

function calculateAverage(arr) {
  let average = 0;
  arr.forEach((x) => average += x);
  return Math.floor(average / arr.length);
}
