const Discord = require('discord.js')

module.exports = {
    name: 'name',
    description: 'changes the name of the guild when used',
    execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return; 
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Permission missing beep boop")

        let name = args.slice(1).join(" ")

        if(name > 10) return message.channel.send("Name can't be this long oops")
        if(name < 0) return message.channel.send("Name can't be this short")
        if(!name) return message.channel.send("You need to enter a name")

        try {
            message.guild.setName(name).then(message.channel.send(`Server name has been changed to ${name}`))
        } catch (error) {
            message.channel.send('something went wrong')
        }
    }
}