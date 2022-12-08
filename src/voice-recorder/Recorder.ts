import { CustomMessage } from '../types/Message';
import fs from 'fs';
export class Recorder {
  private createNewChunk() {
    const pathToFile = __dirname + `/../recordings/${Date.now()}.pcm`;
    return fs.createWriteStream(pathToFile);
  }

  private join(message: CustomMessage) {
    return message.member?.voice.channel?.join();
  }

  async record(message: CustomMessage) {
    const connection = await this.join(message);
    if (!connection) {
      console.error('No connection');
      return;
    }
    const receiver = connection.receiver;
    connection.on('speaking', (user, speaking) => {
      if (speaking.bitfield === 0 || user.bot) {
        return;
      }
      console.log(`${user.username} speaking`);
      const audioStream = receiver.createStream(user, { mode: 'pcm' });
      audioStream.pipe(this.createNewChunk());
    });
  }

  async saveExit(message: CustomMessage) {
    if (
      message.guild?.voiceStates.cache.filter((a) => a.connection !== null)
        .size === 1
    )
      return;

    const state = message.guild?.voiceStates.cache.last();
    if (!state || !state.connection) {
      console.error('No connection');
      return;
    }
    state.channel?.leave();
    console.log('stop recording');
  }
}
