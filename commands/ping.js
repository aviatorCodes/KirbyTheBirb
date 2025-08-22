const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name: 'ping',
    description: 'shows user ping latency',
    execute(message, args, client, prefix){
        if(message.content.startsWith(prefix)) return; 
            message.channel.send('Calculating ping<a:Load:868381778358976533>').then((resultMessage) => {
                const ping = resultMessage.createdTimestamp - message.createdTimestamp
    
                resultMessage.edit(`Kirby's latency: \`${ping}ms\` API latency: \`${client.ws.ping}ms\``)
            });
        }
    }