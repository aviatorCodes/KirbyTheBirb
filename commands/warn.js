const Discord = require('discord.js')
const schema = require('../models/Schema/warnSchema')

module.exports = {
    name: 'warn',
    description: 'warns the member who is mentioned',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command")
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Koala isn't having permission to use this command oops")

        let data;
        const user = message.mentions.users.first()
        if(!user) return message.channel.send("Please mention someone you want to warn")
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
        data.warns += 1
        await data.save()

        const e = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`\`\`${message.author.username} has warned ${user}\`\`\``)
        .setColor("PURPLE")
        .setTimestamp()
        .setFooter(`${message.author.id}`)
        message.channel.send(e)
        
        const f = new Discord.MessageEmbed()
        .setDescription(`You have been warned in ${message.guild.name}`)
        .setTimestamp()
        user.send(f)
    }
}