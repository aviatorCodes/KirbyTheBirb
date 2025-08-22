const Discord = require('discord.js')
const afkSchema = require('../models/Schema/afkSchema')

module.exports = {
    name: 'afk',
    description: 'sets status to afk',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        let data;

        try {
            data = await afkSchema.findOne({
                userId: message.author.id,
                guildId: message.guild.id
            })
            if(!data) {
                data = await afkSchema.create({
                    userId: message.author.id,
                    guildId: message.guild.id
                })
            }
        } catch (error) {
            message.channel.send("Something went wrong pls try again later")
        }
        message.member.setNickname(`(AFK) ${message.author.username}`)
        message.channel.send(`<a:Tikk:868847290197106708> | You have been declared as afk`)
        data.afk = true
        data.afk_reason = args.join(" ")
        await data.save()
    }
}