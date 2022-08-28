import { Message } from 'discord.js';

export default (message: Message, content: string = `${message.author!.username} : ${message.content}`) => {
  console.log(content);
};