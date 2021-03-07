const { token } = require("./config.json");

const discord = require("discord.js"); 

const { default_prefix } = require("./config.json");

const client = new discord.Client({

  

  disableEveryone: true 

});

client.commands = new discord.Collection();

client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {

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

 

client.login(token);

