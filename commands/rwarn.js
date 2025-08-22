const Discord = require('discord.js')
const db = require('../models/Schema/warnSchema')

module.exports = {
    name: 'rwarn',
    description: 'removes warn for the mentioned user',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return; 
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command")
            if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Koala isn't having permission to use this command oops")
            const user = message.mentions.members.first()
            if(!user) return message.channel.send("Please mention the member to remove thier warn")
            let data;

            try {
                data = await db.findOneAndDelete({
                    userId: user.id,
                    guildId: message.guild.id,
                })
                if(!data) {
                    data = await db.create({
                        userId: user.id,
                        guildId: message.guild.id
                    })
                }
            } catch (error) {
                message.channel.send("Something went wrong oops")
            }

            message.channel.send(`\`\`\`${message.author.tag} has removed all the warnings for ${user}\`\`\``)
        }
    }
