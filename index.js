const { token } = require("./config.json");

const discord = require("discord.js"); 

const { default_prefix } = require("./config.json");

const client = new discord.Client({

  

  disableEveryone: false

});

client.commands = new discord.Collection();

client.aliases = new discord.Collection();

["command", ].forEach(handler => {

  require(`./handlers/${handler}`)(client);

});

const { GiveawaysManager } = require("discord-giveaways");

// Starts updating currents giveaways

const manager = new GiveawaysManager(client, {

    storage: "./handlers/giveaways.json",

    updateCountdownEvery: 10000,

    default: {

        botsCanWin: false,

        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],

        embedColor: "#FF0000",

        reaction: "🎉"

    }

});

// We now have a giveawaysManager property to access the manager everywhere!

client.giveawaysManager = manager;

client.on("ready", () => {

    client.user.setActivity(`g?help |Servers Count - ${client.guilds.cache.size}`, { type: "WATCHING"})

})
console.log("bot is ready to giveway please subscribe Cw khan channel and join support server https://dsc.gg/kmdevs")

 client.on("message", async message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${default_prefix}\``);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000)


client.login(token);

