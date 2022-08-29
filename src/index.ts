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

getBanList();

const client = new Discord.Client();
// disbut(client, "", "", "");

// Variables
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
      if (message!.author!.bot) return;
      if (MainCommands.recentlyDeletedMessageByBot) return;
      logger(message as Message, `${message.author?.username} удалил сообщение ${message.content}`);
    });

    client.on('message', (message) => {
      (message as CustomMessage).isAuthor = ['336516852995850241', '925765821937098802'].includes(message.author.id);
      new MainCommands(message as CustomMessage);
    });

    client.on('clickButton', async (button) => {
        const connection = button.clicker.member.voice.channel!.join();
        if (button.id === 'wow')
          (await connection).play('./assets/sounds/wow.mp3', { volume: 2 });
        else if (button.id === 'wow_pip')
          (await connection).play('./assets/sounds/wow_pip.mp3', { volume: 2 });
        else if (button.id === 'kry')
          (await connection).play('./assets/sounds/kry.mp3', { volume: 2 });
    });
  } catch (e) {
    console.error(e);
  }
}

client.login(process.env.SECRET_KEY).then(main).catch(console.error);
