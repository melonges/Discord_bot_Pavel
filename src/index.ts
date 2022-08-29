import Discord, { Message } from 'discord.js';
import { createAudioPlayer, createAudioResource } from '@discordjs/voice';
import MainCommands from './commands';
import logger from './ults/logger';
import { CustomMessage } from './types/Message';
import getBanList from './ults/getBanList';

require('dotenv').config();

if (!process.env.SECRET_KEY) {
  console.log('FUCK YOU, create .env file in root directory of project, and write = \'SECRET_KEY=YOURTOKEN\'');
  process.exit();
}

getBanList()

const client = new Discord.Client();

// Variables
let adminPLay = false;
let recentlyMovedUser = false;
const player = createAudioPlayer();
const resource = createAudioResource('./assets/sounds/sgu.mp3');

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
    console.log('DJ Pavel has been started!');

    client.on('messageDelete', message => {
      logger(message as Message, `${message.author?.username} удалил сообщение ${message.content}`);
    });

    client.on('message', (message ) => {
      (message as CustomMessage).isAuthor = ['336516852995850241', '925765821937098802'].includes(message.author.id);
      new MainCommands(message as CustomMessage);
    });
  } catch (e) {
    console.error(e);
  }
}

//
//   client.on('message', async message => {
//     switch (message.content) {
//       case '!adminPlay':
//         if (message.author.id === AUTHOR) {
//           adminPLay = true;
//           timer = setTimeout(() => adminPLay = false, 300_000);
//           message.reply('Только может включать музыку в течении этих 5 минут');
//         }
//         break;
//     }
//
//     } else if (message.content.startsWith('!hard')) {

//     } else if (message.content.startsWith('!vHard')) {
//
//     } else if (message.content === '!leave') {
//     } else if (message.content.startsWith('!ban') && message.author.id == AUTHOR) {
//
//       const id = message.content.slice(4).trim();
//       const banList = require('./banlist.json');

//     }
//
//
//     if (message.content === '!sex') {
//       const connection = message.member.voice.channel.join();
//       message.delete({ timeout: 300 });
//       await (await connection).play(ytdl(`https://youtu.be/rK-iOXgPKZU`, { filter: 'audioonly' }), { volume: 1 });
//       setTimeout(() => message.member.voice.channel.leave(), 5000);
//     } else if (message.content === '!хохол') {
//       const connection = message.member.voice.channel.join();
//       await (await connection).play(ytdl(`https://youtu.be/0YKlxX7DC_s`, { filter: 'audioonly' }), { volume: 1 });
//       message.delete({ timeout: 300 });
//     } else if (message.content === '!СГУ') await SGU(message);
//
//
//     else if (message.content === '!az' && message.author.id === AUTHOR) {
//       const connection = message.member.voice.channel.join();
//       message.delete({ timeout: 300 });
//       // message.delete()
//       await (await connection).play(ytdl(`https://youtu.be/jMgMVT5GwUI`, { filter: 'audioonly' }), { volume: 1 });
//     } else if (message.content === '!sJoin') {
//       const connection = message.member.voice.channel.join();
//       message.delete({ timeout: 300 });
//       await (await connection).play(ytdl(`https://youtu.be/4whEYvJTuxc`, { filter: 'audioonly' }), { volume: 1 });
//     } else if (message.content === '!sLeave') {
//       const connection = message.member.voice.channel.join();
//       message.delete({ timeout: 300 });
//       await (await connection).play(ytdl(`https://youtu.be/AY7LPwk3lE4`, { filter: 'audioonly' }), { volume: 1 });
//     } else if (message.content === '!lJoin') {
//       const connection = message.member.voice.channel.join();
//       message.delete({ timeout: 300 });
//       await (await connection).play(ytdl(`https://youtu.be/l94gMfQVx9k`, { filter: 'audioonly' }), { volume: 1 });
//     }
//   });
// } catch (e) {
//   console.error(e);
// }
// async function SGU(message: Message) {
//   const button1 = new MessageButton()
//     .setStyle('red')
//     .setLabel('визжалка')
//     .setID('wow');
//   const button2 = new MessageButton()
//     .setStyle('red')
//     .setLabel('туда-сюда')
//     .setID('wow_pip');
//   const button3 = new MessageButton()
//     .setStyle('red')
//     .setLabel('Крякалка')
//     .setID('kry');
//
//
//   message.channel.send(button1);
//   message.channel.send(button2);
//   message.channel.send(button3);
//
//
//   client.on('clickButton', async (button) => {
//     try {
//       const connection = button.clicker.member.voice.channel.join();
//       button.inte;
//       if (button.id === 'wow')
//         (await connection).play('./wow.mp3', { volume: 2 });
//       else if (button.id === 'wow_pip')
//         (await connection).play('./wow_pip.mp3', { volume: 2 });
//       else if (button.id === 'kry')
//         (await connection).play('./kry.mp3', { volume: 2 });
//       button.intera;
//     } catch (e) {
//       message.delete({ timeout: 100 });
//     }
//   });
// }

client.login(process.env.SECRET_KEY).then(main).catch(console.error);
