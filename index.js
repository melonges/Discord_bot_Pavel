const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core')
require('dotenv').config()
const AUTHOR = "336516852995850241"
let adminplay = false;
let timer
client.on('ready', () => {
    console.log(`Павел ебашит ${client.user.tag}!`);

});

client.on('message', message => {
     console.log(`Сообщение от ${message.author.username}: ${message.content} в канале ${message.name}`);
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
        case "!adminplay":
            if(message.author.id === AUTHOR) {
                adminplay = true;
                timer = setTimeout(() => adminplay = false, 300_000);
                message.reply("Только может включать музыку в течении этих 5 минут")
            }
            break
    }});


client.on("message", message => {
    if (message.author.id === AUTHOR) {
        message.react("👍")
    }
})

client.on("message", async function voiceF(message) {
    if (message.content.startsWith("!play")) {
        if(adminplay && message.author.id != AUTHOR) return;
        const str = message.content.slice(5).trim();
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 1});
    } else if (message.content.startsWith("!hard")) {
        const str = message.content.slice(5).trim();
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 40});
    } else if (message.content.startsWith("!vHard")) {
        const str = message.content.slice(6).trim();
        console.log(str);
        const connection = message.member.voice.channel.join();
        const playingMusic = (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 90});
        console.log("Разрывной бас врублен")
    }
        else if (message.content === "!leave"){
		await message.member.voice.channel.leave()
    console.log(`вышел из комнаты ${message.member.voice.channel.id}`)
	}
    })

client.on("messageDelete", message =>  message.author.id != AUTHOR ? message.reply(`Вы удалили сообщение "${message.content}"`) : 0);

client.on("message", async message=>  {
    if (message.content === "вруби музыку")   {
        message.reply("Врубаю")
        const connection = message.member.voice.channel.join();
        console.log(`Зашел в комнату ${message.member.voice.channel.id}`)
        await(await connection).play(ytdl(`https://www.youtube.com/watch?v=Qp3YBgeLULQ`, {filter: "audioonly"}), {volume: 1})
    }
})



client.on("message",   async message=> {
    if (message.content === "!sex") {
       const connection = message.member.voice.channel.join()
        // message.reply("А может ты пидор?")
        await(await connection).play(ytdl(`https://youtu.be/rK-iOXgPKZU`, {filter: "audioonly"}), {volume: 1})
       setTimeout(() => message.member.voice.channel.leave(), 5000)
    } else if(message.content === "!хохол") {
        const connection = message.member.voice.channel.join()
        await(await connection).play(ytdl(`https://youtu.be/0YKlxX7DC_s`, {filter: "audioonly"}), {volume: 1})
    } else if (message.content === "!arbuze" && message.author.id === AUTHOR) {
        const connection = message.member.voice.channel.join()
        message.delete()
        await(await connection).play(ytdl(`https://youtu.be/jMgMVT5GwUI`, {filter: "audioonly"}), {volume: 1})
    }

})




client.login(process.env.SECRET_KEY);

//// 12 june 2021 22:51
