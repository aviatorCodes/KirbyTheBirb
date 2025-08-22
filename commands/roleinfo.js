const Discord = require('discord.js')

module.exports = {
    name: 'roleinfo',
    description: 'shows information about the mentioned role',
    async execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return;
            let role;
        if(!args[0]) return message.channel.send('Pls mention the role specifically')
        if(args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first()
        if(args[0] && isNaN(args[0]) && !message.mentions.roles.first()){

            role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(' ').toLowerCase().trim())
            if(!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(' ').toLowerCase().trim())) return message.channel.send("Role not found")

        }
        if(args[0] && !isNaN(args[0])){
            role = message.guild.roles.cache.find(e => e.id == args[0])
            if(!message.guild.roles.cache.find(args[0])) return message.channel.send("Role not found")
        }

        if(!role) return message.channel.send("You must mention the role")
    let WithRole;
    if(role.members.size > 5) WithRole = role.members.map(e => `<@${e.id}>`).slice(0,5).join(", ") + `and ${role.members.size - 5} more members...`
    if(role.members.size < 5) WithRole = role.members.map(e => `<@${e.id}>`).join(", ")

        let embed = new Discord.MessageEmbed()
        .setColor(role.color)
        .setTimestamp()
        .setFooter(`Searched By: ${message.author.username}`)
        .setAuthor(message.guild.name,message.guild.iconURL())
        .setDescription(`**Role Name: ${role.name}** <@&${role.id}>
        
        **Role ID:** **\`${role.id}\`**
        
        **Role Mentionable:** ${role.mentionable.toString().replace("true","Possible").replace("false","Not Possible")}
        
        **Role Members:** ${role.members.size || 0}

        **Role Created:** ${role.createdAt}
        
        **Role Color:** #${role.color}
        
        **Role Position:** ${role.position}`)

    .addField("Role Members:",WithRole ? WithRole : "No One Has This Role")  
     
    try {
        message.channel.send(embed)
       } catch (error) {
           message.channel.send("Something went wrong :(")
       }
    }
}