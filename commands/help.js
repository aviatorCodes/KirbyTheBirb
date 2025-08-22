const Discord = require('discord.js')
const prefixSchema = require('../models/Schema/prefixSchema')

module.exports = {
    name: 'help',
    description: 'sends a embed with the list of command',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        const e = new Discord.MessageEmbed()
        .setTitle(`Kirby was summoned by ${message.author.username}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(message.author.id, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("PURPLE")
        .setTimestamp()
        .addField('afk', 'use it to set yourself afk due to reasons')
        .addField('invite', 'invite kirby to your server with the help of this command')
        .addField('invites', 'use this command to check the invite of your server members')
        .addField('meme', 'You can use this command to generate new memes and get yourself some entertainment')
        .addField('name', `Members with the nickname management permission can use this to modify his/her nicknames in ${message.guild.name}`)
        .addField('nuke', 'Kind of a dangeroud command so use it wisely to delete your server channel and recreate them')
        .addField('prefix', `This command can be used to modify server prefix to your own choise`)
        .addField('purge', `This command is used to delete messages within the guild. Note, it can't delete messages older than 14 days and the maximum deletion is set to 100`)
        .addField('roleinfo', 'You can get any role information via this command')
        .addField('warn', 'People with the administrator permission can use this command to warn members of the server that violate the server rules/Discord TOS')
        .addField('warns', 'This can be used to check warns of any server member')
        .addField('rwarn', 'You can use this to remove warns of any server member and reset it null')
        .addField('tempoban', 'This is used to ban your server member for temporary reasons and they will get thier ban removed after the time limit comes to an end')
        .addField('unban', `If you want to immediately revoke the ban of the member use this to do so and the member can easily join back without any hassle`)
        .addField('giveaway', `Host giveaways for ${message.guild.name} and claim the prizes`)
        message.channel.send(e)
    }
}