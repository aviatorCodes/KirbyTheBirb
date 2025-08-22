const Discord = require('discord.js')

module.exports = {
    name: 'leave',
    description: 'the bot leaves the server',
    execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return;
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this")
        
        message.guild.leave().then(message.author.send(`Kirby has left ${message.guild.name}`))
    }
}