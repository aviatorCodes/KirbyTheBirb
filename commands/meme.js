const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    description: 'fetches a meme',
    execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return; 
            fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {
            const e = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setTimestamp()
            .setFooter(`Meme searched By: ${message.author.username}`)

            message.channel.send("Finding your meme son").then(message => {
                setTimeout(() => {
                    message.edit(e)
                }, 2500);
            })
        })
    }
}    