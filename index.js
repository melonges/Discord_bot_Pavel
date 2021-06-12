const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    switch (message.content) {

        case "команды":
            message.reply("Список всех команд \n  мой аватар - показ авы \n мое имя - показ имени \n аватар - показ инфы по профилю \n !play (без пробела ссылка) - включить музыку \n /leave - выйти из румы \n вруби музыку - рандом музыка");
            break
        case "аватар": {
            const embed = new Discord.MessageEmbed().setTitle(message.author.username).setColor('#03dffc').setDescription(`Ваш ID: ${message.author.discriminator}`);
            message.channel.send(embed);

        }
            break;

        case "мое имя":
            message.reply(message.author.username);
            break
        case "мой аватар":
            message.reply(message.author.avatarURL()), console.log(message);
            break

}});



client.on("message", async function voiceF(message) {
    if (message.content.startsWith("!play")){
        const str = message.content.slice(5)
        // const vlm = message.content.slice(5)
        console.log(str)
        const connection = message.member.voice.channel.join();
        await (await connection).play(ytdl(`${str}`, {filter: "audioonly"}), {volume: 1})
    }





        else if (message.content === "/leave") await message.member.voice.channel.leave()


    })

client.on("messageDelete", message => message.channel.send(`Вы удалили сообщение ${message.content}`))

client.on("message", async message=>  {
    if (message.content === "вруби музыку") {
        message.reply("Врубаю, мой создатель")
        const connection = message.member.voice.channel.join();
        await(await connection).play(ytdl(`https://www.youtube.com/watch?v=Qp3YBgeLULQ`, {filter: "audioonly"}), {volume: 1})
    }
})
client.login('NzgxNTA4NzU1MjkxNTA0Njcw.X7-qvg.LVFPvbN4FymV26zm69qix7TuynE');

