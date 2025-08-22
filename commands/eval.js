const Discord = require('discord.js')
const { type } = require('os')

module.exports = {
    name: 'eval',
    description: 'evaluates the query provided by the owner',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
            if(message.author.id != 961853829492666368) return message.channel.send("Only owner is allowed to use this command")

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(`Evaluation done by ${message.author.username}`)
        .addField("Input", "```js\n" + args.join(" ") + "```")

        try {
            const code = args.join(" ")
            if(!code) return message.channel.send("Please provide content to evaluate");
            let evaled;
            evaled = eval(code)

            if(typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});

            let output = clean(evaled)
            if(output.length > 1024) {
                const {body} = await post("https://discord.js.org/#/docs/main/stable/general/welcome").send(output);
                embed.addField("Result" `https://discord.js.org/${body.key}.js`).setColor("PURPLE")
            } else {
                embed.addField("Result", "```js\n" + output + "```").setColor("PURPLE")
            }

            message.channel.send(embed)
        } catch (error) {
            let err = clean(error);
            if(err.length > 1024) {
                const {body} = await post("https://discord.js.org/#/docs/main/stable/general/welcome").send(output);
                embed.addField("Result" `https://discord.js.org/${body.key}.js`).setColor("RED")
            } else {
                embed.addField("Result", "```js\n" + err + "```").setColor("RED")
            }

            message.channel.send(embed)

        }
    }
}

function clean(string) {
    if(typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}