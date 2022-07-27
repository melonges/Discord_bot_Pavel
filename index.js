const Discord = require('discord.js');
const discordTTS = require('discord-tts');
const { MessageButton } = require('discord-buttons')
const commands = require('./commands.js');
const client = new Discord.Client();
require('discord-buttons')(client);
const ytdl = require('ytdl-core')
require('dotenv').config()
const AUTHOR = "336516852995850241"
let adminPLay = false;
let oldMessageGlobal = ""
let isFollowing = true;
let voiceConnection
let arbuzePresentation = "https://youtu.be/jMgMVT5GwUI"
let config = { PREFIX: process.env.PREFIX }

function main() {
  try {
    // client.on('voiceStateUpdate', async (oldState, newState) => {
    //   if (newState.member.user.id === AUTHOR && isFollowing && newState.channelID !== oldState.channelID) {
    //     voiceConnection = await newState.member.voice.channel.join();
    //     await voiceConnection.play(ytdl(arbuzePresentation, { filter: 'audioonly' }));
    //     commands.enter(0, 0, newState.member.voice.channel)
    //   }
    // });


    client.on('message', async message => {
      if (message.content === "вруби музыку") {
        message.reply("Врубаю")
        voiceConnection = message.member.voice.channel.join();
        console.log(`Зашел в комнату ${message.member.voice.channel.id}`);
        await (await voiceConnection).play(ytdl(`https://www.youtube.com/watch?v=Qp3YBgeLULQ`, { filter: "audioonly" }), { volume: 1 });
      }
      if (message.author.id === AUTHOR) await message.react("👍")
      if (message.content.startsWith('!move')) await moveUser(message);
      if (message.content.startsWith('!say')) {
        const broadcast = client.voice.createBroadcast();
        const channelId = message.member.voice.channelID;
        const channel = client.channels.cache.get(channelId);
        channel.join().then(async connection => {
          broadcast.play(discordTTS.getVoiceStream(`${message.content.substring(4)}`));
          connection.play(broadcast);
        });
        // await message.delete({ timeout: 300 })
      }
      if (message.content.startsWith(config.PREFIX) && message.author.id === AUTHOR) {
        const commandBody = message.content.substring(config.PREFIX.length).split(' ');
        let channelId;
        const result = message.content.match(/!record\s+(\d+)*\s*/)
        result ? channelId = result[1] : channelId = message.member.voice.channelID;
        await message.delete({ timeout: 500 })
        if (commandBody[0] === ('record')) commands.enter(message, channelId);
      }
      logger(message);
      if (message.content === "!sex") {
        voiceConnection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await voiceConnection).play(ytdl(`https://youtu.be/rK-iOXgPKZU`, { filter: "audioonly" }), { volume: 1 })
        setTimeout(() => message.member.voice.channel.leave(), 5000)
      } else if (message.content === "!хохол") {
        voiceConnection = message.member.voice.channel.join()
        await (await voiceConnection).play(ytdl(`https://youtu.be/0YKlxX7DC_s`, { filter: "audioonly" }), { volume: 1 })
        message.delete({ timeout: 300 })
      }
      if (message.content.startsWith("!play")) {
        if (adminPLay && message.author.id !== AUTHOR) return;
        const str = message.content.slice(5).trim();
        voiceConnection = message.member.voice.channel.join();
        (await voiceConnection).play(ytdl(`${str}`, { filter: "audioonly" }), { volume: 1 });
      } else if (message.content.startsWith("!hard")) {
        const str = message.content.slice(5).trim();
        voiceConnection = message.member.voice.channel.join();
        const playingMusic = (await voiceConnection).play(ytdl(`${str}`, { filter: "audioonly" }), { volume: 40 });
      } else if (message.content.startsWith("!vHard")) {
        const str = message.content.slice(6).trim();
        console.log(str);
        voiceConnection = message.member.voice.channel.join();
        const playingMusic = (await voiceConnection).play(ytdl(`${str}`, { filter: "audioonly" }), { volume: 90 });
        console.log("Разрывной бас врублен");
      }
      else if (message.content === "!leave") {
        await message.member.voice.channel.leave()
        console.log(`вышел из комнаты ${message.member.voice.channel.id}`)
        message.delete({ timeout: 300 })
      }
      else if (message.content === "!follow") {
        isFollowing = !isFollowing;
        message.delete({ timeout: 500 })
      }
      else if (message.content === "!az" && message.author.id === AUTHOR) {
        voiceConnection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await voiceConnection).play(ytdl(arbuzePresentation, { filter: "audioonly" }), { volume: 1 })
      } else if (message.content === "!sJoin") {
        voiceConnection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await voiceConnection).play(ytdl(`https://youtu.be/4whEYvJTuxc`, { filter: "audioonly" }), { volume: 1 })
      } else if (message.content === "!sLeave") {
        voiceConnection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await voiceConnection).play(ytdl(`https://youtu.be/AY7LPwk3lE4`, { filter: "audioonly" }), { volume: 1 })
      } else if (message.content === "!lJoin") {
        voiceConnection = message.member.voice.channel.join()
        message.delete({ timeout: 300 })
        await (await voiceConnection).play(ytdl(`https://youtu.be/l94gMfQVx9k`, { filter: "audioonly" }), { volume: 1 })
      }
      switch (message.content) {
        case "!команды":
          message.reply("\n Список всех команд: \n !мой аватар - показ авы \n !мое имя - показ имени \n !аватар - показ инфы по профилю \n !play (без пробела ссылка) - включить музыку \n !leave - выйти из румы \n вруби музыку - рандом музыка \n !hard - увеличение баса в музыку \n !vhard - разрывной бас");
          console.log(`${message.author.username} запросил команды`)
          break
        case "!аватар":
          const embed = new Discord.MessageEmbed().setTitle(message.author.username).setColor('#03dffc').setDescription(`Ваш ID: ${message.author.discriminator}`).setImage(message.author.avatarURL());
          await message.channel.send(embed);
          console.log(`${message.author.username} запросил аватар`)
          break;
        case "!join":
          if (message.member.voice.channel)
            message.member.voice.channel.join().then(_ => message.delete({ timeout: 300 }));
          else
            message.reply("Вы не находитесь в голосовом канале");
          break;
        case "!мое имя":
          message.reply(message.author.username);
          console.log(`${message.author.username} запросил свое имя`)
          break
        case "!мой аватар":
          message.reply(message.author.avatarURL()), console.log(message);
          console.log(`${message.author.username} запросил свой аватар`)
          break
        case "!adminPlay":
          if (message.author.id === AUTHOR)
            adminPLay = true;
          timer = setTimeout(() => adminPLay = false, 300_000);
          message.reply("Только может включать музыку в течении этих 5 минут")
          break
      }
    });
    client.on("messageDelete", message => message.author.id !== AUTHOR ? message.reply(`Вы удалили сообщение "${message.content}"`) : 0);
    client.on("messageUpdate", async oldMessage => {
      if (oldMessage.author.id !== AUTHOR) {
        oldMessage.reply(`Вы обновили сообщение! Показать старое содержание сообщения на публику?`)
        oldMessageGlobal = oldMessage.content;
        const button = new MessageButton()
          .setLabel("Показать?!")
          .setStyle("green")
          .setID("btn1")

        await oldMessage.channel.send(button)
      }
    })
    client.once('clickButton', async (button) => {
      if (button.id === "btn1") {
        await button.reply.defer()
        await button.message.channel.send(oldMessageGlobal)
        button.delete()
      }
    })
  } catch (e) { console.error(e.message) }
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
  message.delete({ timeout: 300 })
}


