import { Message } from 'discord.js';
import logger from '../ults/logger';

class MainCommands {
  private readonly message: Message;

  constructor(message: Message) {
    this.message = message;
    logger(message);
  }
}

export default MainCommands;