const Discord = require('discord.js')
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: 'bal',
    description: 'shows the balance of the user',
    async execute(message, args, client, prefix) {
        let user;
        if(message.content.startsWith(prefix)) return;
        if(message.mentions.users.first()) {
            user = message.mentions.users.first()
        } else if(args[0]) {
            user = message.guild.members.cache.get(args[0]).user
        } else if(!args[0]) {
            user = message.author
        }

        let res = await cs.balance({
            user: user,
            guild: message.guild
        })

        let Em = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Cash: 🪙${res.wallet}\nBank: 🪙${res.bank}`)
        .setFooter(user.id)
        .setColor("PURPLE")
        message.channel.send(Em)
    }
}