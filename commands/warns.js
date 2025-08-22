const Discord = require('discord.js')
const schema = require('../models/Schema/warnSchema')

module.exports = {
    name: 'warns',
    description: 'checks the warns for the mentioned user',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command")
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Koala isn't having permission to use this command oops")

        let data;
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send("Please mention someone to check thier warnings")
        try {
            data = await schema.findOne({
                userId: user.id,
                guildId: message.guild.id
            })
            if(!data) {
                data = await schema.create({
                    userId: user.id,
                    guildId: message.guild.id,
                })
            }
        } catch (error) {
            message.channel.send("Something went wrong oops")
        }

        message.channel.send(`\`\`\`${user} has ${data.warns} warnings\`\`\``)
    }
}