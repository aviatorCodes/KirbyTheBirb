const Discord = require('discord.js')
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: 'add',
    description: 'adds extra money to any user wallet',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else if (!args[0]) {
            return message.channel.send("Specify a user!");
        }
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You do not have requied permissions.")
        let wheretoPutMoney = args[2] || "wallet"
        let amount = parseInt(args[1]);
        if (!amount) return message.channel.send("Enter amount of money to add");
        let money = parseInt(amount);
        let result = await cs.addMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.channel.send("You cant add any negetive digit money");
        else message.channel.send(`Successfully added 🪙${money} for ${user.username} in \`${wheretoPutMoney}\``)
    }
}
