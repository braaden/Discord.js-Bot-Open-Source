const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const token = require("./token.json")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', () => {
    client.user.setActivity(`${client.guilds.size} servers with ${client.users.size} users`, { type: 'WATCHING' });
});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        message.reply("Pong!")
    }

    if(command === "foo") {
        message.reply("Bar!")
    }

    if(command === "help") {
      const embed = new Discord.RichEmbed()
        .setTitle("Click Me For Commands")
        .setAuthor("Super Bot")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x4eff00)
        .setDescription("Hey, you. Yeah you who executed this command. You wanted to know my commands. Well click the Click Me For Commands.")
        .setFooter("This bot was coded by Coder#9707 on the Support server for Super Bot.")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .setURL("https://discord.gg/aAYNj")

        message.channel.send({embed});
    }

    if(command === "avatar") {
      message.reply(message.author.avatarURL)

    }

    if(command === "kick") {

      let member = message.mentions.members.first();
      let reason = args.slice(1).join(" ");
      member.kick(reason);
    }

    if(command === "ban") {
      let member = message.mentions.members.first();
      let reason = args.slice(1).join(" ");

      member.ban(reason)
    }
})

/*
This is the command handler for Owners Only
*/

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(config.ownerPrefix) !== 0) return;

    if(message.author.id !== config.ownerID) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "game") {

        const gameMessage = args.join(" ");

        client.user.setGame(gameMessage);
        message.reply("Playing " + gameMessage)
    }

    if(command === "watch") {

        const gameMessage = args.join(" ");

        client.user.setActivity(gameMessage, { type: 'WATCHING' });
        message.reply("Playing " + gameMessage)
    }

    if(command === "listen") {
        const gameMessage = args.join(" ");

        client.user.setActivity(gameMessage, { type: 'LISTENING' });
        message.reply("Playing " + gameMessage)
    }

    if(command === "resetstatus") {
        client.user.setActivity(`${client.guilds.size} servers with ${client.users.size} users`, { type: 'WATCHING' });
    }

    if(command === "eval") {
      if(message.author.id !== config.ownerID) return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);
​
        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
​
        message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
})

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(token.token);
