const Discord  = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'unbans the mentioned user id',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        const member = args[0];

        const reason = args[4] || "No specific reason...";

        if(!member) {
            return message.channel.send("Pls mention the user's ID")
        }

        try {
            message.guild.fetchBans().then( bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(`<a:Boom:868783401803583558> | ${member} has been unbanned from ${message.guild.name}\nReason: ${reason}`)
        } catch (e) {
            return message.channel.send("Something went wrong")
        }
    }
}         