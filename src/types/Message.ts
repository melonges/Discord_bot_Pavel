import { Message } from 'discord.js';

export type CustomMessage = Message & {
  isAuthor: boolean;
}