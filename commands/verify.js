const { MessageEmbed, Role, GuildMember, GuildMemberManager } = require('discord.js')
const axios = require('axios')
const url = 'https://api.no-api-key.com/api/v2/captcha'

module.exports = {
    name: 'verify',
    description: 'verifies the member',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        const filter = e => e.content && e.author.id === message.author.id
        const Urole = message.guild.roles.cache.find(role => role.name === 'unverified' || 'Unverified')
        if(!Urole) return message.channel.send("Role missing")
        if(message.member.roles.cache.has(Urole.id)) {
            const { data } = await axios.get(url)

         const f = new MessageEmbed()
         .setTitle('To verify please write the code mentioned in the captcha')
         .setDescription('You only have 30 seconds to fill in the captcha. Be fast!')
         .setImage(data.captcha)
         await message.channel.send(f)

         const collector = message.channel.createMessageCollector(filter, {
            time: 30000
        })
        collector.on('collect', (e) => {
            if(e.content !== data.captcha_text) {
                message.channel.send("Incorrect captcha code please try again")
                .then((e) => e.delete({
                    timeout: 3000
                }))
            }
            if(e.content === data.captcha_text) {
                message.channel.send(`<a:Tikk:868847290197106708> | You are now verified`)
                .then((e) => e.delete({
                    timeout: 10000
                }))
            collector.stop()
            message.member.roles.remove(Urole)
            }
        })
        }
    }
}