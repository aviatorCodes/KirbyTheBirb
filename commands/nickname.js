const Discord = require('discord.js')

module.exports = {
 name: 'nickname',
 description: 'Set a nickname for a person',
    async execute(message, args, prefix) {
      if(message.content.startsWith(prefix)) return;
        const person = message.mentions.members.first() || message.guild.members.cache.get(args[1])
       const user = message.mentions.users.first()
       if(!user, !person) return message.channel.send("Pls mention the member")
       if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Permission Missing")
       if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Koala is not having permission for this")
 
       let nicks = args.slice(1).join(" ")


      if(nicks.length > 32) return message.channel.send('The nickname cannot be more than 32 characters')

      person.setNickname(nicks).then(() => {
        let e = new Discord.MessageEmbed()
         .setAuthor(`Successfully Changed ✅`)
         .setDescription(`Changed nickname to "**${nicks}**"\n\n Original name: ${user.username}`)
         .setFooter(`Name Kept By: ${message.author.username}`)
         .setTimestamp()
         .setThumbnail(user.displayAvatarURL({ dynamic: true }))
         .setColor("PURPLE")
         message.channel.send(e)
      })

      .catch(error => {
          message.channel.send("Couldn't change the nickname of that member")
      })
    }
}