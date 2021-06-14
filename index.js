const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core')

client.on('ready', () => {
    console.log(`Павел ебашит ${client.user.tag}!`);

});

client.on('message', message => {
    switch (message.content) {

        case "!команды":
            message.reply("\n Список всех команд: \n !мой аватар - показ авы \n !мое имя - показ имени \n !аватар - показ инфы по профилю \n !play (без пробела ссылка) - включить музыку \n !leave - выйти из румы \n вруби музыку - рандом музыка \n !hard - увеличение баса в музыку \n !vhard - разрывной бас");
            console.log(`${message.author.username} запросил команды`)
            break
        case "!аватар": {
            const embed = new Discord.MessageEmbed().setTitle(message.author.username).setColor('#03dffc').setDescription(`Ваш ID: ${message.author.discriminator}`).setImage(message.author.avatarURL());
            message.channel.send(embed);
            console.log(`${message.author.username} запросил аватар`)

        }
            break;

        case "!мое имя":
            message.reply(message.author.username);
            console.log(`${message.author.username} запросил свое имя`)
            break
        case "!мой аватар":
            message.reply(message.author.avatarURL()), console.log(message);
            console.log(`${message.author.username} запросил свой аватар`)
            break
        case "!test command":
         return
    }});



client.on("message", async function voiceF(message) {
    if (message.content.startsWith("!play")) {
        const str = message.content.slice(5);
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 1});
    } else if (message.content.startsWith("!hard")) {
        const str = message.content.slice(5);
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 40});
    } else if (message.content.startsWith("!vHard")) {
        const str = message.content.slice(6);
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 90});
        console.log("Разрывной бас врублен")
    }
        else if (message.content === "/leave") await message.member.voice.channel.leave()
    console.log(`вышел из комнаты ${message.member.voice.channel.id}`)

    })

client.on("messageDelete", message => message.reply(`Вы удалили сообщение "${message.content}"`));

client.on("message", async message=>  {
    if (message.content === "вруби музыку")   {
        message.reply("Врубаю, мой создатель")
        const connection = message.member.voice.channel.join();
        console.log(`Зашел в комнату ${message.member.voice.channel.id}`)
        await(await connection).play(ytdl(`https://www.youtube.com/watch?v=Qp3YBgeLULQ`, {filter: "audioonly"}), {volume: 1})
    }
})



client.on("message",   async message=> {
    if (message.content === "ты пидр") {
        const connection = message.member.voice.channel.join()
        message.reply("А может ты пидр?")
        await (await connection).play(ytdl(`https://www.youtube.com/watch?v=NyYRzn9I9zE`, {filter: "audioonly"}), {volume: 1})
        setTimeout(() => message.member.voice.channel.leave(), 15000)
    }

})




client.login('NzgxNTA4NzU1MjkxNTA0Njcw.X7-qvg.LVFPvbN4FymV26zm69qix7TuynE');

//// 12 june 2021 22:51
