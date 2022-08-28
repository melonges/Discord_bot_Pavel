import { Message } from 'discord.js';
import logger from '../ults/logger';
import getBanList from '../ults/getBanList';

export const commandsHandler: { name: string, handler: Function }[] = [];

export function Command(command: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    commandsHandler.push({ name: command, handler: descriptor.value });
  };
}

class MainCommands {
  private readonly message: Message;
  private readonly commandsPrefix: string;
  private banList: string[];

  constructor(message: Message, prefix: string = '!') {
    logger(message);

    this.message = message;
    this.commandsPrefix = prefix;
    this.banList = getBanList()!;

    if (this.banList.includes(message.author.id)) return;

    const messageArgs = this.message.content.split(' ').filter(v => !v.startsWith('!'));

    for (const command of commandsHandler) {
      if (this.matchCommand(command.name)) {
        command.handler(message, ...messageArgs);
        this.message.delete({ timeout: 100 });
      }
    }

  }

  private matchCommand(candidate: string) {
    const messageContent = this.message.content.split(' ').filter(v => v.startsWith('!'))[0];
    if (!messageContent) {
      return false;
    }
    return messageContent.startsWith(this.commandsPrefix) && messageContent.split(this.commandsPrefix)[1] === candidate;
  }


  @Command('move')
  async moveUser(message: Message, channelId: string) {
    let memberId: string;
    if (message.mentions.users.size) {
      memberId = message.mentions.users.first()!.id;
    } else {
      memberId = message.author.id;
    }
    const member = message.guild!.members.cache.get(memberId);
    const channel = message.guild!.channels.cache.get(channelId);
    await member!.voice.setChannel(channel!);
  }
  
}

export default MainCommands;