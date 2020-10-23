const Discord = require("discord.js");
const fetch = require('node-fetch');
const bot = new Discord.Client();
const randomPuppy = require('random-puppy');

const prefix = "bery!"

// THIS IS THE STATUS

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
    bot.user.setActivity("BERY SMEXY | bery!help", { // THIS IS THE PLACE YOU PUT YOUR CUSTOM STATUS
        type: "STREAMING", // THIS IS THE STATUS TYPE
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // THIS IS THE LINK IT WILL BRING YOU TO WHEN YOU CLICK "Watch Stream"!
    });

}
)

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
 
    if(command === 'hello') {
        message.reply('Hello!');
    }
 
    if(command === 'ping') {
        const msg = await message.channel.send("Pinging...");
        msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    }
 
    if(command === 'kick') {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid user");
        if(!member.kickable) return message.channel.send("Sorry I cannot kick that person! Do they have a higher role?");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
 
        await member.kick(reason)
            .catch(e => message.reply(`Sorry I couldn't kick them! Error: ${e}`));
        message.reply(`:white_check_mark: User kicked!`);
    }
 
    if(command === 'ban') {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid user");
        if(!member.bannable) return message.channel.send("Sorry I cannot ban that person! Do they have a higher role?");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
 
        await member.ban(reason)
            .catch(e => message.reply(`Sorry I couldn't ban them! Error: ${e}`));
        message.reply(`:white_check_mark: User banned!`);
    }
     
    if (command === "cat") {
       
        const subReddits = ["cat", "kitty", "cats", "catloaf"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
		.setTitle('BERY PRETTY KITTY')
		.setAuthor('BigBery', 'https://media.discordapp.net/attachments/768993167357771777/769236103332233226/unknown.png')
		.setURL('https://reddit.com/r/${random}')
	 	.setImage(img)
		.setTimestamp()
		.setFooter('Bendy Development', 'https://images-ext-1.discordapp.net/external/iLWEn8WA-KTd-w9KlU6s4HdLW9PPzZb-16IO0ML3tnA/%3Fwidth%3D294%26height%3D294/https/media.discordapp.net/attachments/750544950860447764/756916779791679599/bendy_regular.jpg');
        
        return message.channel.send(embed)
            .catch(err => message.reply(`Something went wrong... ${err}`));
    }
});

//THIS IS THE COMMANDS

bot.login(process.env.token);
