const bSchema = require('../models/Schema/blacklistSchema')
const Discord = require('discord.js')

module.exports = {
    name: 'rblacklist',
    description: 'whitelists the content provided by the user',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command")
        let d;
        const user = message.mentions.users.first()
        if(!user) return message.channel.send("Please mention the member you want to blacklist")

        try {
            d = await bSchema.findOne({
                userId: user.id
            })
            if(!d) {
                d = await bSchema.create({
                    userId: user.id
                })
            }
        } catch (error) {
            message.channel.send('Something went wrong pls try again later')
        }
        d.blacklisted = false
        await d.save()
        
        let e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("RED")
        .setTimestamp()
        .setDescription(`\`\`\`The blacklist was sucessfully revoked against ${user.tag}, his id: ${user.id}\`\`\``)
        .setFooter(`${message.author.id}`)
        return message.channel.send(e)
    }
}