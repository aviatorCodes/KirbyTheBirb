const Discord = require('discord.js')
const prefixSchema = require('../models/Schema/prefixSchema')

module.exports = {
    name: 'prefix',
    description: 'sets a custom prefix for any server',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return; 
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command")

            const newPrefix = args[0]
            if(!newPrefix) return message.channel.send(`Please mention the prefix you want to set for ${message.guild.name}`)
            if(!newPrefix.length > 3) return message.channel.send("You can't set this long prefix oops")
            let data;

            try {
                data = await prefixSchema.findOne({
                    _id: message.guild.id
                })
                if(!data) {
                    let newData = await prefixSchema.create({
                        _id: message.guild.id,
                        newPrefix: newPrefix
                    })
                    newData.save()
                } else {
                    await prefixSchema.findOneAndUpdate({
                        _id: message.guild.id,
                        newPrefix: newPrefix,
                    })
                }
                message.channel.send(`<a:MultiStar:868427625910120448> The new prefix for ${message.guild.name} is set as \`${newPrefix}\``)
            } catch (error) {
                message.channel.send("Something went wrong")
            }
        }
    }