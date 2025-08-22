const Discord = require('discord.js')

module.exports = {
    name: 'nuke',
    description: 'nukes a channel',
    async execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return; 
            if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You don't have permission for this ${message.author.tag}`)
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Kirby is missing permission for this")

        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send("https://tenor.com/view/edp445-yeet-ok-yes-happy-dance-gif-17972081")
        })
        await message.author.send("Channel has been nuked")
    }
}