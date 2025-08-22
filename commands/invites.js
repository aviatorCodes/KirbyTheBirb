const Discord = require('discord.js')

module.exports = {
    name: 'invites',
    description: 'checks the invites of the mentioned person',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        let user = message.mentions.users.first()
        if(!user) return message.channel.send("Please mention member to check thier invites")
        let invites = await message.guild.fetchInvites()
        let Inv = invites.filter(u => u.inviter && u.inviter.id === user.id)

        if(Inv.size <= 0) {
            return message.channel.send(`${user} dosent have any valid invites oops`)
        }

        let z = 0;
        Inv.forEach(inv => z += inv.uses)
        let invCode = Inv.map(x => x.code).join('\n')

        const f = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Total Invites`)
        .addField(`${user.username}'s Total invites are`, z)
        .addField(`The code with which ${user.username} invited is`, invCode)
        .setColor("BLUE")
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        message.channel.send(f)
    }
}