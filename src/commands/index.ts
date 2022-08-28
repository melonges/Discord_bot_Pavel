import { Message } from 'discord.js';
import logger from '../ults/logger';

export const commandsHandler: { name: string, handler: any }[] = [];

export function Command(command: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    commandsHandler.push({ name: command, handler: descriptor.value });
  };
}

class MainCommands {
  private readonly message: Message;
  private readonly commandsPrefix: string;

  constructor(message: Message, prefix: string = '!') {
    this.message = message;
    this.commandsPrefix = prefix;
    logger(message);

    const messageArgs = this.message.content.split(' ').filter(v => !v.startsWith('!'));

    for (const command of commandsHandler) {
      if (this.matchCommand(command.name)) {
        command.handler(...messageArgs);
      }
    }
  }

  private matchCommand(candidate: string) {
    const messageContent = this.message.content.split(' ').filter(v => v.startsWith('!'))[0];
    return messageContent.startsWith(this.commandsPrefix) && messageContent.split(this.commandsPrefix)[1] === candidate;
  }

  @Command('test')
  testCommand(firstArg: string, secondArg: string) {
    console.log('test', firstArg, secondArg);
  }
}

export default MainCommands;