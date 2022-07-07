const fs = require('fs');

const createNewChunk = () => {
  const pathToFile = __dirname + `/recordings/${Date.now()}.pcm`;
  return fs.createWriteStream(pathToFile);
};

exports.enter = function(msg, channelId) {

  //filter out all channels that aren't voice or stage
  const voiceChannel = msg.guild.channels.cache.get(channelId);


  console.log(`Sliding into ${voiceChannel.name} ...`);
  voiceChannel.join()
    .then(conn => {

      // const dispatcher = conn.play(__dirname + '/../sounds/drop.mp3');
      // dispatcher.on('finish', () => { console.log(`Joined ${voiceChannel.name}!\n\nREADY TO RECORD\n`); });

      const receiver = conn.receiver;
      conn.on('speaking', (user, speaking) => {
        if (speaking) {
          console.log(`${user.username} started speaking`);
          const audioStream = receiver.createStream(user, { mode: 'pcm' });
          audioStream.pipe(createNewChunk());
          audioStream.on('end', () => { console.log(`${user.username} stopped speaking`); });
        }
      });
    })
    .catch(err => { throw err; });
}

exports.exit = function(msg) {
  //check to see if the voice cache has any connections and if there is
  //no ongoing connection (there shouldn't be undef issues with this).
  if (msg.guild.voiceStates.cache.filter(a => a.connection !== null).size !== 1)
    return;

  console.log('Leaving voice channel...');
  //make sure it's .last() not .first().  some discord js magic going on rn
  // const dispatcher = conn.play(__dirname + "/../sounds/badumtss.mp3", { volume: 0.45 });
  // dispatcher.on("finish", () => {
  //     voiceChannel.leave();
  //     console.log(`\nSTOPPED RECORDING\n`);
  // });
};
