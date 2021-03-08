const Discord = require("discord.js")
module.exports = {
  name: "help",
  aliases: ["halp"],
  category: "info",
  clientPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Help Center")
    .setDescription("**EXAMPLE g?start <channel> <duration> <winners> <prize>  |  g?end <msgid> | g?reroll <msgid> **")
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .addField(`🎉GIVEWAY🎉`, '`START` | `END` | `REROLL` ')
      .addField(`❓Information❓`, '`HELP` | `BOTINFO`')
    
           

    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Made by khan manan #9006`, client.user.displayAvatarURL({ format: "png" }))
    message.channel.send(embed)
  }
}
