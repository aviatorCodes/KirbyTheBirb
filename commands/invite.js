const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    description: 'sends Kirby OAuth2',
    execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
            let e = new Discord.MessageEmbed()
            .setTitle("Kirby's invite link")
            .setAuthor('Invite Me')
            .setURL('')
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANdhttps://discord.com/api/oauth2/authorize?client_id=865828893435625482&permissions=8&scope=bot9GcRmkWCajeAmJ8qVydLPyEqatYCg_7eCzi9ZdA&usqp=CAU')
            .setFooter(`Invite asked by ${message.author.username}`)
            .setTimestamp()
            message.channel.send(e)
    }
}