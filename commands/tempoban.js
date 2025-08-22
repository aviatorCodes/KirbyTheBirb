const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempoban',
    description: 'bans a member temporarily',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to use this comamnd")
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Koala isn't having permission to use this command oops")

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send("Please mention any member who you want to ban")
        let reason = args.slice(2).join(" ")
        let time = args[1]
        const e = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .addField(`${user} has been banned from`, message.guild.name)
        .addField(`Reason: ${reason}`, `Ban Duration: ${time}`)
        .setColor("PURPLE")
        .setTimestamp()

        if(!args[0]) return message.channel.send('Please mention a member who you want to ban for temporary reasons')
        if(!user.bannable) return message.channel.send("You can't ban this member oops")
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can't ban this member as he has a higher or same role as you")
        if(!reason) reason = "No specific reason"
        if(!time) return message.channel.send("You need to specify a particular time")

        await message.channel.send(e)
        await user.ban({
            days: 7,
            reason: reason
        }).catch(error => message.channel.send("Something went wrong oops"))
        setTimeout(async function () {
            await message.guild.fetchBans().then(async bans => {
                if(bans.size == 0) return message.channel.send(`There are no bans for ${message.guild.name}`)
                let bannedUser = bans.find(b => b.user.id == user.id)
                if(!bannedUser) return message.channel.send(`${user} has been unbanned from ${message.guild.name}`)
                await message.guild.members.unban(bannedUser.user, reason).catch(error => message.channel.send("oops something went wrong"))
            })
        }, ms(time));
    }
}