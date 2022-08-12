const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core')
require('dotenv').config()
const AUTHOR = "336516852995850241"
let adminPLay = false;
let recentlyMovedUser = false
// // logging when user joins/leaves voice channel
// client.on('voiceStateUpdate', (oldMember, newMember) => {
//     if (oldMember.voice.channel && !newMember.voice.channel) {
//         logger(`${oldMember.user.username} left voice channel ${oldMember.voice.channel.name}`)
//     } else if (!oldMember.voice.channel && newMember.voice.channel) {
//         logger(`${newMember.user.username} joined voice channel ${newMember.voice.channel.name}`)
//     }
// })



function main() {

  try {
    client.on('message', async message => {
      if (message.author.id === AUTHOR) await message.react("👍")
      if (message.content.startsWith('!move')) await moveUser(message);
      logger(message);
      switch (message.content) {
        case "!команды":
          message.reply("\n Список всех команд: \n !мой аватар - показ авы \n !мое имя - показ имени \n !аватар - показ инфы по профилю \n !play (без пробела ссылка) - включить музыку \n !leave - выйти из румы \n вруби музыку - рандом музыка \n !hard - увеличение баса в музыку \n !vhard - разрывной бас");
          console.log(`${message.author.username} запросил команды`)
          break
        case "!аватар": {
          const embed = new Discord.MessageEmbed().setTitle(message.author.username).setColor('#03dffc').setDescription(`Ваш ID: ${message.author.discriminator}`).setImage(message.author.avatarURL());
          await message.channel.send(embed);
          console.log(`${message.author.username} запросил аватар`)
        }
          break;
        case "!join": {
          if (message.member.voice.channel) {
            message.member.voice.channel.join().then(_ => message.delete({ timeout: 300 }));
          } else {
            message.reply("Вы не находитесь в голосовом канале");
          }
          break
        }
        case "!мое имя":
          message.reply(message.author.username);
          console.log(`${message.author.username} запросил свое имя`)
          break
        case "!мой аватар":
          message.reply(message.author.avatarURL()), console.log(message);
          console.log(`${message.author.username} запросил свой аватар`)
          break
        case "!adminPlay":
          if (message.author.id === AUTHOR) {
            adminPLay = true;
            timer = setTimeout(() => adminPLay = false, 300_000);
            message.reply("Только может включать музыку в течении этих 5 минут")
          }
          break
      }
    });

    client.on("message", async function voiceF(message) {
      if (message.content.startsWith("!play")) {
        if (adminPLay && message.author.id !== AUTHOR) return;
        const str = message.content.slice(5).trim();
        const connection = message.member.voice.channel.join();
        (await connection).play(ytdl(`${str}`, { filter: "audioonly" }), { volume: 1 });
      } else if (message.content.startsWith("!hard")) {
        const str = message.content.slice(5).trim();
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, { filter: "audioonly" }), { volume: 40 });
      } else if (message.content.startsWith("!vHard")) {
        const str = message.content.slice(6).trim();
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, { filter: "audioonly" }), { volume: 90 });
        console.log("Разрывной бас врублен");
      }
      else if (message.content === "!leave") {
        await message.member.voice.channel.leave()
        console.log(`вышел из комнаты ${message.member.voice.channel.id}`)
        message.delete({ timeout: 300 })
      }
    })

    client.on("messageDelete", message => {
      console.log(recentlyMovedUser)
      message.author.id !== AUTHOR && !recentlyMovedUser ? message.reply(`Вы удалили сообщение "${message.content}"`) : 0
    });

    client.on("message", async message => {
      if (message.content === "вруби музыку") {
        message.reply("Врубаю")
        const connection = message.member.voice.channel.join();
        console.log(`Зашел в комнату ${message.member.voice.channel.id}`);
        await (await connection).play(ytdl(`https://www.youtube.com/watch?v=Qp3YBgeLULQ`, { filter: "audioonly" }), { volume: 1 });
      }
    })



    client.on("message", async message => {
      if (message.content === "!sex") {
        const connection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await connection).play(ytdl(`https://youtu.be/rK-iOXgPKZU`, { filter: "audioonly" }), { volume: 1 })
        setTimeout(() => message.member.voice.channel.leave(), 5000)
      } else if (message.content === "!хохол") {
        const connection = message.member.voice.channel.join()
        await (await connection).play(ytdl(`https://youtu.be/0YKlxX7DC_s`, { filter: "audioonly" }), { volume: 1 })
        message.delete({ timeout: 300 })
      }


      else if (message.content === "!az" && message.author.id === AUTHOR) {
        const connection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        // message.delete()
        await (await connection).play(ytdl(`https://youtu.be/jMgMVT5GwUI`, { filter: "audioonly" }), { volume: 1 })
      } else if (message.content === "!sJoin") {
        const connection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await connection).play(ytdl(`https://youtu.be/4whEYvJTuxc`, { filter: "audioonly" }), { volume: 1 })
      } else if (message.content === "!sLeave") {
        const connection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await connection).play(ytdl(`https://youtu.be/AY7LPwk3lE4`, { filter: "audioonly" }), { volume: 1 })
      } else if (message.content === "!lJoin") {
        const connection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await connection).play(ytdl(`https://youtu.be/l94gMfQVx9k`, { filter: "audioonly" }), { volume: 1 })
      }

    })




  } catch (e) {
    console.error(e.message)
  }
}


client.login(process.env.SECRET_KEY).then(() => main())

//// 12 june 2021 22:51

function logger(message) {
  console.log(`${message.author.username}: ${message.content}`);
}

async function moveUser(message) {
  const result = message.content.match(/!move\s+(\d+)*\s*/)
  message.mentions.users.size ? result[2] = message.mentions.users.first().id : result[2] = message.author.id
  const member = message.guild.members.cache.get(result[2]);
  const channel = message.guild.channels.cache.get(result[1]);
  await member.voice.setChannel(channel);
  recentlyMovedUser = true
  message.delete({ timeout: 300 })
  setTimeout(() => recentlyMovedUser = false, 1000)
}
