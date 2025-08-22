const Discord = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'announces a new poll',
    async execute(message, args, prefix) {
        if(message.content.startsWith(prefix)) return; 
            const filter = m => m.author.id == message.author.id
            let e = new Discord.MessageEmbed()
            .setFooter(`Poll announced by: ${message.author.tag}`)
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor("PURPLE")

            message.channel.send("\`\`\`Please tell me what is your poll based upon\`\`\`")
            try {
                let msg = await message.channel.awaitMessages(filter, { max: 1, time: 12500, error: ['time'] })
                e.setTitle(msg.first().content)
            } catch (error) {
                message.channel.send("Oops the time got over try typing a little faster next time :sweat_smile:")
            }

            message.channel.send(`\`\`\`Mention the 1st option from your topic\`\`\``)
            try {
                let msg = await message.channel.awaitMessages(filter, { max: 1, time: 12500, error: ['time'] })
                e.addField(`1️⃣`, msg.first().content)
            } catch (error) {
                message.channel.send("Oops the time got over try typing a little faster next time :sweat_smile:")
            }

            message.channel.send("\`\`\`Mention the 2nd option from your topic\`\`\`")
            try {
                let msg = await message.channel.awaitMessages(filter, { max: 1, time: 12500, error: ['time'] })
                e.addField(`2️⃣`, msg.first().content)
            } catch (error) {
                message.channel.send("Oops the time got over try typing a little faster next time :sweat_smile:")
            }

            message.channel.send("\`\`\`Mention the 3rd option from your topic\`\`\`")
            try {
                let msg = await message.channel.awaitMessages(filter, { max: 1, time: 12500, error: ['time'] })
                e.addField(`3️⃣`, msg.first().content)
            } catch (error) {
                message.channel.send("Oops the time got over try typing a little faster next time :sweat_smile:")
            }
            message.channel.send(e).then(process => process.react('1️⃣')).then(roll => roll.message.react('2️⃣')).then(action => action.message.react('3️⃣'))
        }
    }