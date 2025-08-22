const Discord = require('discord.js')

module.exports = {
    name: 'purge',
    description: 'mass deletes messages',
    async execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return; 
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this")
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Koala is not having permission for this")
        if (!args[0]) return message.channel.send("Pls provide a number")
        const toDelete = Number(args[0], 10)

        if (isNaN(toDelete)) return message.channel.send("Pls provide a vaild number")
        if (!Number.isInteger(toDelete)) return message.channel.send("Pls provide a whole number")
        if (!toDelete || toDelete < 0) return message.channel.send("Value needs to be more than 0")
        if (!toDelete || toDelete > 100) return message.channel.send("I cannot delete more than 100 messages")
        const fetched = await message.channel.messages.fetch({
            limit: toDelete
        });

        try {
            await message.channel.bulkDelete(fetched)
            .then(messages => message.channel.send(`<a:Tikk:868847290197106708> | Deleted ${messages.size} messages successfully`))
            .then(message => 
                message.delete({timeout: 4500})
            )
        } catch (error) {
            message.channel.send("You can't delete messages above 14 days")
        }
    }
}