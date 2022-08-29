import logger from '../ults/logger';
import getBanList from '../ults/getBanList';
import { CustomMessage } from '../types/Message';
import { MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import fs from 'fs';
import { resolve as pathResolve } from 'path';

export const commandsHandler: { name: string, description?: string, handler: Function }[] = [];

export function Command(command: string | string[], description = '') {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (Array.isArray(command)) {
      for (let commandName of command) {
        commandsHandler.push({ name: commandName, handler: descriptor.value, description });
      }
    } else {
      commandsHandler.push({ name: command, handler: descriptor.value, description });
    }
  };
}

class MainCommands {
  private readonly message: CustomMessage;
  private readonly commandsPrefix: string;
  private banList: string[] = [];

  constructor(message: CustomMessage, prefix: string = '!') {
    logger(message);

    if (message.isAuthor) {
      message.react('👍');
    }

    this.message = message;
    this.commandsPrefix = prefix;
    this.banList = getBanList()!;

    if (this.banList.includes(message.author.id)) return;

    const messageArgs = this.message.content.split(' ').filter(v => !v.startsWith('!'));

    for (const command of commandsHandler) {
      if (this.matchCommand(command.name)) {
        command.handler(message, ...messageArgs);
      }
    }
  }

  private async deleteMessage(message: CustomMessage, timeout = 100) {
    await message.delete({ timeout });
  }

  private matchCommand(candidate: string) {
    const messageContent = this.message.content.split(' ').filter(v => v.startsWith('!'))[0];
    if (!messageContent) {
      return false;
    }
    return messageContent.startsWith(this.commandsPrefix) && messageContent.split(this.commandsPrefix)[1] === candidate;
  }

  @Command('move', 'Перемещение из одного гавно канала в другой гавно канал')
  async moveUser(message: CustomMessage, channelId: string) {
    let memberId: string;
    if (message.mentions.users.size) {
      memberId = message.mentions.users.first()!.id;
    } else {
      memberId = message.author.id;
    }
    const member = message.guild!.members.cache.get(memberId);
    const channel = message.guild!.channels.cache.get(channelId);
    try {
      await member!.voice.setChannel(channel!);
    } catch (e) {
      console.log(e);
    }
    await this.deleteMessage(message);
  }

  @Command(['команды', 'help'], 'просмотр всех доступных команд')
  async commands(message: CustomMessage) {
    const helpMessage = `
Список всех команд:
${commandsHandler.map(command => {
      if (command.description !== 'просмотр всех доступных команд') {
        return `${command.name} - ${command.description}\n`;
      }
    }).join('')}
`;
    await message.reply(helpMessage);
  }

  @Command('аватар', 'получение информации о вашем профиле')
  async avatar(message: CustomMessage) {
    const embed = new MessageEmbed()
      .setTitle(message.author.username)
      .setColor('#03dffc')
      .setDescription(`Ваш ID: ${message.author.discriminator}`)
      .setImage(message.author.avatarURL()!);
    await message.channel.send(embed);
  }

  @Command('join', 'подключение к голосовому каналу')
  async join(message: CustomMessage) {
    if (message.member?.voice.channel) {
      await message.member?.voice.channel.join();
      await this.deleteMessage(message);
    } else {
      await message.reply('Вы не находитесь в голосовом канале');
    }
  }

  private async playAudio(message: CustomMessage, url: string, volume = 1) {
    const connection = message.member!.voice.channel!.join();
    (await connection).play(ytdl(`${url}`, { filter: 'audioonly' }), { volume: 1 });
  }

  @Command('play', 'ДЭНЦ ДЭНЦ ДЭНЦ')
  async play(message: CustomMessage, url: string) {
    await this.playAudio(message, url);
  }

  @Command('hard', 'БОЛЕЕ ГРОМКИЙ ДЭНЦ ДЭНЦ ДЭНЦ')
  async hard(message: CustomMessage, url: string) {
    await this.playAudio(message, url, 40);
  }

  @Command('vhard', 'ЕБЕЙШЕ КАКОЙ ДЭНЦ ДЭНЦ ДЭНЦ')
  async vhard(message: CustomMessage, url: string) {
    await this.playAudio(message, url, 90);
  }

  // @Command('leave', 'выход из голосового чата')
  // async leave(message: CustomMessage) {
  //   await message.member!.voice.channel!.leave();
  //   await message.delete({ timeout: 300 });
  // }

  @Command('ban', 'БАН НАХУЙ')
  async ban(message: CustomMessage, userId: string) {
    const banList = getBanList()!;
    if (message.isAuthor && userId && userId !== message.author.id && !banList.includes(userId)) {
      banList.push(userId);
      fs.writeFile(pathResolve(__dirname, '../banlist.json'), JSON.stringify(banList), (err) => {
        if (err) console.error(err);
        else message.delete({ timeout: 100 });
      });
    }
  }
}

export default MainCommands;