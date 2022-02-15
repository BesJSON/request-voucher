const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));const settings = require("./src/configs/settings.json");
const db = require('quick.db');
const yarrak = require("./src/configs/yarrak.json");
client.commands = new Collection();
client.invites = new Collection();
client.cooldown = new Map();
const Discord = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
const http = require("http");
const express = require("express");
const path = require("path");
const request = require("request");
const queue = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("[Reques Bey] Bot Giriş Yaptı!"))
  .catch(() => console.log("[Feros Bey] Bot Yarrağı Yedi .d!"));

  
  client.tarihHesapla = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);

    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;

    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;

    string = string.trim();
    return `\`${string} önce\``;
};





client.on("guildMemberAdd", member => {
    let yarramınbaşı = member.guild.channels.cache.get(yarrak.sakso)
    let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;
    let guild = member.client.guilds.cache.get(yarrak.requesserverid)
    let endAt = member.user.createdAt
    let gün = moment(new Date(endAt).toISOString()).format('DD')
    let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    let dk = moment(new Date(endAt).toISOString()).format('MM:ss')
    let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;


    if (guvenilirlik === false) {
        member.roles.add(yarrak.unreg)
        member.roles.add(yarrak.unreg)
        member.setNickname(yarrak.name)
        member.setNickname(yarrak.name)
        yarramınbaşı.send(`
:tada: ${member} **${yarrak.servername}** Hoşgeldin! Hesabın **${kuruluş}** önce oluşturulmuş.
  
Seninle beraber **${guild.memberCount}** kişiye ulaştık.
       
Kurallar kanalından sunucu kurallarımıza gözatmayı ihmal etme! Unutma \`Ceza-i işlemlerin\` <#${yarrak.rules}> kanalını okuduğunu varsayarak gerçekleştirilecek.
       
Tagımızı (?) alarak ailemize katıla bilirsin. <@&${yarrak.regl}> Yetkili arkadaşlarımız seninle ilgilenecek. Şimdiden iyi eğlenceler! :tada: :tada:
`)

    } else {
        member.roles.set([yarrak.Suspect])
        member.roles.set([yarrak.Suspect])
        member.setNickname(yarrak.Suphelinick)
        member.setNickname(yarrak.Suphelinick)
        hgkanal.send(`
${member} **${yarrak.servername}** Hoşgeldin, Fakat hesabın 7 gün önce oluşmuş.
<@&937351629332693042> Sunucunun güvenliği için ${member} **Karantinaya** yolladım!
 `)
}
  });

  // gunaydin //

client.on('message', msg => {
    if (msg.content === 'Günaydın') {
        msg.channel.send('Günaydın , Hayırlı sabahlar'); //  yazınız
    } else if (msg.content === 'gunaydin') {
        msg.channel.send('Günaydın , Hayırlı sabahlar');//  yazınız
    } else if (msg.content === 'gunaydn') {
        msg.channel.send('Sanada Günaydın');//  yazınız
    } 

    if (msg.content === 'gm') {
        msg.channel.send('Günaydın , Hayırlı sabahlar'); 
      }
  
    if (msg.content === 'Günaydin') {
        msg.channel.send('Günaydın , Hayırlı sabahlar');
      }


});

//iyi geceler//

client.on('message', msg => {
    if (msg.content === 'iyi geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar'); //  yazınız
    } else if (msg.content === 'İyi geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar');//  yazınız
    } else if (msg.content === 'iyi gcler') {
        msg.channel.send('İyi Geceler');
    } 


    if (msg.content === 'ig') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar');
      }
  
    if (msg.content === 'ii geceler') {
        msg.channel.send('İyi Geceler , Tatlı Rüyalar');
      }

});

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  let ferhattag = "?"; //Tagınızı yazın
  let ferhatserver = "937427374742601788"; //Sunucu ID'sini giriniz
  let ferhatchannel = "937427375614996537" //Mesajın atılacağı log kanalını giriniz
  let ferhatrol = "937427374826463253";//Taglı rolünün ID'sini giriniz 
  if (newUser.username.includes(ferhattag) && !client.guilds.cache.get(ferhatserver).members.cache.get(newUser.id).roles.cache.has(ferhatrol)) {
  client.channels.cache.get(ferhatchannel).send(`**${newUser} (${ferhattag}) Tagımızı alarak ailemize katıldı!**`)
  client.guilds.cache.get(ferhatserver).members.cache.get(newUser.id).roles.add(ferhatrol) }
  if (!newUser.username.includes(ferhattag) && client.guilds.cache.get(ferhatserver).members.cache.get(newUser.id).roles.cache.has(ferhatrol)) {
  client.guilds.cache.get(ferhatserver).members.cache.get(newUser.id).roles.remove(ferhatrol)
  client.channels.cache.get(ferhatchannel).send(`**${newUser} (${ferhattag}) Tagımızı çıkardığı için ailemizden ayrıldı!**`) } } })



  client.on('ready', () => {
    client.user.setPresence({ activity: { name: "Rêquest ❤️ " }, status: "online" });
    if (client.channels.cache.has('')) client.channels.cache.get('').join().catch();
});



const yavsamaSöz = [
  
  'Varlığın dünyada cenneti yaşatıyor bana.',
  'Bir gülüşü var, kelebek görse ömrü uzar.',
  'çünkü sen gittiğinde sokak lambaları gözümü kamaştırıyor', 
  'Seni düşlerken bir tebessüm beliriyor suretimde.',
  'Gölgene sığınırım en çaresiz anımda.',
  'Gamzen diyorum bir ömür sevmelik.',
  'Sen sevilmek için yaratılmışsın.',
  'Varsan var yoksan yokum.',
  'Bu dünya için fazla mükemmelsin.',
  'Yüzümdeki oluşan gülümsemenin sebebisin.',
  'Damlaya damlaya büyütüyorum sevgimi.',
  'Gecemi aydınlatan yıldızımsın.',
  'Gözlerin gökyüzü kadar uçsuz bucaksız.',
  'Ömrümün en güzel mevsimi sensin.',
  'Başıma gelen güzel şeylerin nedeni hep sensin.',
  'Gülüşünde bir şey var hep içime dokunur.',
  'Kendimi sende bulduğum için bu kadar güzelsin.',
  'Varlığın bir çocuğun gülüşü gibi; öyle güzel öyle masum ki.',
  'Uyanmak istemediğim en güzel rüyam sensin.',
  'Masallar elbette güzel; kahramanı sen isen.',
  'Her adımımda senin adını fısıldar yollar…',
  'Sen bana aitsin, Balık denize, bulut gökyüzüne ait.',
  'Her bir kirpiğinin ayrı bir büyüsü var zihnimde.',
  'Derdim de devam da sen oldun haberin yok.',
  'Sen varsan yeter ömrüme. Gerisi hikâye.',
  'Seni kokladığımda, nefes aldığımı hatırlıyorum.',
  'Lütfen üzerine alın! Kimseyi görmedim ben, senden daha güzel gülen.',
  'Fazlası zarar olmayan iki şey; biri sen biri kokun.',
  'Kokunu içime çektiğimde nefes aldığımı anlıyorum.',
  'Bir gülümse bana, o eşsiz gülüşünle güneş açsın hayatımda.',
  'Nasıl anlatsam seni sana? Gökyüzü gibi gözlerinde kaybolabiliyormuş insan.',
  'Sen varsın, bundan güzel bir teselli var mı dünyada?',
  'Gözlerimin gördüğü en güzel şey sensin.',
  'Sesini duydum, huzura kavuştum.',
  'Kalbinin güzelliği yüzüne vurmuş, ben buna ilk kez şahit oluyorum.',
  'Sen benim yeniden kendime gelişim gibisin. Seni görmek sarsıyor insanı, insan yeryüzünde melek görüyor sanki.',
  'Sen hayatın bana verdiği en güzel armağansın.',
  'Bu yeryüzünde sevilmeye dair her şey sende toplanmış',
  'Her şey çirkinken sen nasıl bu kadar güzelsin?',
  'Sen bu dünyada gülüşü olan tek manzaramsın.',
  'Benim bütün hevesim sende. Seninle ilgili her şey heyecanlandırıyor beni.',
  'Benim sadece seninle olmaya ihtiyacım var. Her şey sende toplanmış.',
  'Sen bana hep öyle tatlı tatlı bak emi.',
  'Sen benim için teksin ve bana yetersin.',
  'Biliyor musun? ilk seninle bir dilenciye para verdim. İnanmadığım yapmam dediğim her şeyi seninle yaptım.',
  'Bir buse misali öpünce izi kalansın.',
  'Gel benim ekmeğim, suyum, aşım ol',
  'Şimdi divaneye döndüm seni görünce.',
  'Çiçekler bile kıskanıyor bak aşkımızı.',
  'Senin aşkın beni gece gözlüm deli ediyor.',
  'Kurumuş bir ağaç gibiydim, sen geldin yeniden yeşerdim',
  'Küçük bir çocuğun masumiyeti gibisin sevmeye kıyamadığım.',
  'Senle aşkı öğrendim, sevgiyi, paylaşmayı…',
  'Gülerken kendini görsen inan kendi ömrüne ömür katardın.',
  'Dertlerini bana ver sevinçler senin olsun..',
  'Etrafımda olduğunda başka bir şeye ihtiyacım olmuyor.',
  'Sen olmadan nasıl var olacağımı bilmiyorum.',
  'Güneşe gerek yok, gözlerindeki sıcaklık içimi ısıtıyor.',
  'Gözlerimi senden alamıyorum, benim tüm dünyam sensin.',
  'Mutluluk ne diye sorsalar, cevabı gülüşünde ve o sıcak bakışında arardım.',
  'Bir şeyler ters gittiğinde, aramak istediğim ilk kişi sensin.',
  'Kusursuz tavırların var. Korkunç kararlar verdiğimde beni yargılamadığın için sana minnettarım.',
  'Baharı anımsatan kokunu içime çektiğimde, her şey mümkün görünüyor.',
  'Bu kadar güzel bakma, başka biri daha sana aşık olur diye ödüm kopuyor.',
  'Güzel yüzünü göremediğim için geceleri hiç sevmiyorum.',
  'Dünyadaki tüm şiirler sana yazılmış gibi hissettiriyorsun.',
  'Sen benim aldığım en doğru kararsın.',
  'Sen gülümseyince bulutlar dağılıyor göz bebeğim.',
  'Sabah uykusu kadar güzelsin.',
  'Onu Bunu Boşver de bize gel 2 bira içelim.',
  'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum',
  'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Işık oluyorsun karanlık gecelerime.',
  'Gözlerin adeta bir ay parçası.',
  'Sen benim bu hayattaki en büyük duamsın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
  'fero seni çok sevdi...',
  'Sen benim düşlerimin surete bürünmüş halisin.',
  'Mucizelerden bahsediyordum.',
  'Yaşanılacak en güzel mevsim sensin.',
  'Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.',
  'Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.',
  'Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.',
  'Denize kıyısı olan şehrin huzuru birikmiş yüzüne.',
  'Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.',
  'Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.',
  'Ne tatlısın sen öyle. Akşam gel de iki bira içelim.',
  'Bir gamzen var sanki cennette bir çukur.',
  'Gecemi aydınlatan yıldızımsın.',
  'Ponçik burnundan ısırırım seni',
  'Bu dünyanın 8. harikası olma ihtimalin?',
  'fıstık naber?',
  'Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?',
  'Süt içiyorum yarım yağlı, mutluluğum sana bağlı.',
  'Müsaitsen aklım bu gece sende kalacak.',
  'Gemim olsa ne yazar liman sen olmadıktan sonra...',
  'Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.',
  'Sabahları görmek istediğim ilk şey sensin.',
  'Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.',
  'Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.',
  'Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.',
  'Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.',
  'Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.',
  'Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.',
  'Çocukluk yapsan da gönlüme senin için salıncak mı kursam?',
  'Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.',
  'Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...',
  'Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.',
  'Telaşımı hoş gör, ıslandığım ilk yağmursun.',
  'Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...',
  'Domates biber patlıcan, bu gece sana saplıcam...',
  'Bu ego nereden geliyor. Kuyudan mı çıkarıyorsun?',
  'Çok tatlısın :blush:',
];
client.on("message", async message => {
  if(message.channel.id !== yarrak.cart) return;
  let YavsakBot = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(YavsakBot >= 81) { 
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((yavsamaSöz).length - 1) + 1);
    message.reply(`${(yavsamaSöz)[random]}`);
  };
});
