const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs');
require("./database/mongo")()
let prefix;
const prefixSchema = require('./models/Schema/prefixSchema')
const afks = require('./models/Schema/afkSchema')
const bSchema = require('./models/Schema/blacklistSchema')
const map = new Map()

//checks for a custom prefix with the findOne method in the mongo database, if there is none the prefix is the default "!"
client.on('message', async (message) => {
    let data = await prefixSchema.findOne({
        _id: message.guild.id
    })
    if(data === null) {
        prefix = "!"
    } else {
        prefix = data.newPrefix
    }
})

//checks for afks if it's not found it goes ahead and creates it with the try catch loop
client.on('message', async (message) => {
    let data2;
    try {
        data2 = await afks.findOne({
            userId: message.author.id,
            guildId: message.guild.id
        })
        if(!data2) {
            data2 = await afks.create({
                userId: message.author.id,
                guildId: message.guild.id
            })
        }
    } catch (error) {
        message.channel.send("There was something wrong oops")
    }
    if(data2.afk === true) {
        data2.afk_reason = null
        data2.afk = false
        message.member.setNickname(message.author.username)
        message.channel.send("<a:Hexkalamation:870873454440755201> | You are no more afk")
        data2.save()
    }

    if(message.mentions.members.first()) {
        let data3;
        try {
            data3 = await afks.findOne({
                userId: message.mentions.members.first().id,
                guildId: message.guild.id
            })
            if(!data3) {
                data3 = await afks.create({
                    userId: message.mentions.members.first().id,
                    guildId: message.guild.id
                })
            }
        } catch (error) {
            message.channel.send("Something went wrong")
        }
        if(data3.afk == true) {
            message.channel.send(`${message.mentions.members.first().user.tag} is now afk \`${data3.afk_reason || "No specific reason"}\``)
        }
    }
})

//An advanced command handler look into the documents to know more...
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


   
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args, client)
    }
    if(command === 'meme'){
        client.commands.get('meme').execute(message, args, client)
    }
    if(command === 'nickname'){
        client.commands.get('nickname').execute(message, args)
    }
    if(command === 'roleinfo'){
        client.commands.get('roleinfo').execute(message, args)
    }
    if(command === 'nuke'){
        client.commands.get('nuke').execute(message, args)
    }
    if(command === 'invite'){
        client.commands.get('invite').execute(message, args)
    }
    if(command === 'leave'){
        client.commands.get('leave').execute(message, args)
    }
    if(command === 'name'){
        client.commands.get('name').execute(message, args)
    }
    if(command === 'waifu'){
        client.commands.get('waifu').execute(message, args)
    }
    if(command === 'spam'){
        client.commands.get('spam').execute(message, args)
    }
    if(command === 'eval'){
        client.commands.get('eval').execute(message, args)
    }
    if(command === 'poll'){
        client.commands.get('poll').execute(message, args, client)
    }
    if(command === 'purge'){
        client.commands.get('purge').execute(message, args, client)
    }
    if(command === 'prefix'){
        client.commands.get('prefix').execute(message, args, client)
    }
    if(command === 'warn'){
        client.commands.get('warn').execute(message, args, client)
    }
    if(command === 'warns'){
        client.commands.get('warns').execute(message, args, client)
    }
    if(command === 'rwarn'){
        client.commands.get('rwarn').execute(message, args, client)
    }
    if(command === 'afk'){
        client.commands.get('afk').execute(message, args, client)
    }
    if(command === 'invites'){
        client.commands.get('invites').execute(message, args, client)
    }
    if(command === 'tempoban'){
        client.commands.get('tempoban').execute(message, args, client)
    }
    if(command === 'unban'){
        client.commands.get('unban').execute(message, args, client)
    }
    if(command === 'help'){
        client.commands.get('help').execute(message, args, client)
    }
    if(command === 'blacklist'){
        client.commands.get('blacklist').execute(message, args, client)
    }
    if(command === 'rblacklist'){
        client.commands.get('rblacklist').execute(message, args, client)
    }
    if(command === 'verify'){
        client.commands.get('verify').execute(message, args, client)
    }
    if(command === 'giveaway'){
        client.commands.get('giveaway').execute(message, args, client)
    }
    if(command === 'bal'){
        client.commands.get('bal').execute(message, args, client)
    }
    if(command === 'add'){
        client.commands.get('add').execute(message, args, client)
    }
})

client.on('message', async (message) => {
    let d;

    try {
        d = await bSchema.findOne({
            userId: message.author.id
        })
        if(!d) {
            d = await bSchema.create({
                userId: message.author.id
            })
        }
    } catch (error) {
        message.channel.send("Oops something went wrong please try again later")
    }
    if(d.blacklisted == true) return;
});


client.on('ready', () => {
    const activities_list = 
   [
     "Cartoons",
     `over ${client.guilds.cache.size} servers`,
     "Big dreams", 
  ]; 
   setInterval(() => 
   {
     const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
     client.user.setActivity(activities_list[index], { type: 'WATCHING' }); 
   }, 4500); 
  
  })

client.on('guildMemberAdd', async (guildMember, message) => {
    const verifiedLogs = client.channels.cache.find(channel => channel.id === "903311654266212363")
    const e = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setTimestamp()
    .setDescription(`<a:Tikk:868847290197106708> | ${guildMember} has been verified`)
    let Eroll = guildMember.guild.roles.cache.find(role => role.name === 'unverified')
    guildMember.roles.add(Eroll)
    await verifiedLogs.send(e)
})

const Fs = require('fs');

client.on("guildMemberAdd", async (member) => {
  let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"))
  UserJSON[member.id] = {
            warns: 0
        }
    Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON))
})




let badWords = ['pp', 'dick', 'fuck', 'bitch', 'ass', 'punk', 'randi', 'asshole', 'dumbfuck', 'segz', 'haram', 'vegan', 'ok boomer', 'boomer', 'peepee', 'sperm', 'penis', 'vagina', 'cock', 'pipi', 'anus', 'porn', 'xxx', 'pornhub', 'intercourse', 'cum', 'boob', 'boobs', 'breast', 'nipples', 'xxx', 'nips', 'segsi', 'shit', 'bullfuck', 'bullshit', 'half assed', 'rape', 'raping']
client.on("message", async message => {
    if(message.member.hasPermission("ADMINISTRATOR")) return
  let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

  if (!UserJSON[message.author.id]) {
    if (message.author.bot) return;
    UserJSON[message.author.id] = {
      warns: 0
    }
    Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON))
  }
for (i = 0; i < badWords.length; i++) {
if (message.content.toLowerCase().includes(badWords[i])) {
await message.delete();
message.channel.send(`\`\`\`Do not type bad words ${message.author.tag}.If bad words are seen more you will be muted and eventually banned\`\`\``)
.then(m => m.delete({ timeout: 5000 }))

UserJSON[message.author.id].warns += 1;
Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));


if (UserJSON[message.author.id].warns === 3) {
 
(Fs.readFileSync("./DB/users.json"));
     UserJSON[message.author.id].warns = 3;
     Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

           const user = message.member
           let Role = message.guild.roles.cache.find(r => r.name === "muted");
           if(!Role) return message.channel.send("This server does not have the muted role hence automod can not work")

            user.roles.add(Role)
            setTimeout(() => {
                message.member.roles.remove(Role)
                message.channel.send(`\`\`\`${message.author.tag}'s punishment is over\`\`\``)
            }, 432000000)
           }
        }
    }
 if(UserJSON[message.author.id].warns === 5) {

    (Fs.readFileSync("./DB/users.json"));
     UserJSON[message.author.id].warns = 0;
     Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

     const user = message.member;

     user.ban()
     setTimeout(async function () {
        await message.guild.fetchBans().then(async bans => {
            let bannedUser = bans.find(b => b.user.id == user.id)
            if(!bannedUser) return message.channel.send(`${user} has been unbanned from ${message.guild.name}`)
            await message.guild.members.unban(bannedUser.user).catch(error => message.channel.send("oops something went wrong"))
        })
    }, 432000000);
 }   
})

client.on('message', async (message, guild) => {
    if(map.has(message.author.id)) {
        const dayta = map.get(message.author.id)
        const { lstmsg, timer } = dayta
        const diff = message.createdTimestamp - lstmsg.createdTimestamp;
        let msgs = dayta.msgs
        if(diff > 2000) {
            clearTimeout(timer)
            dayta.msgs = 1;
            dayta.lstmsg = message
            dayta.timer = setTimeout(() => {
                map.delete(message.author.id)
            }, 432000000)
            map.set(message.author.id, dayta)
        } else {
            ++msgs
            if(parseInt(msgs) === 4) {
                const Rname = 'muted';
                const role = message.guild.roles.cache.find(roles => roles.name.toLowerCase() === Rname.toLowerCase())
                if(!role) return message.channel.send("This server does not have the muted role hence automod can not work")
                message.member.roles.add(role)
                message.channel.send(`\`\`\`Muted ${message.author.tag} due to spamming\`\`\``)
                setTimeout(() => {
                    message.member.roles.remove(role)
                    message.channel.send(`\`\`\`The punishment for ${message.author.tag} has ended so he is unmuted\`\`\``)
                }, 432000000)
            } else {
                dayta.msgs = msgs;
                map.set(message.author.id, dayta)
            }
        }
    } else {
        let remove = setTimeout(() => {
            map.delete(message.author.id)
        }, 432000000)
        map.set(message.author.id, {
            msgs: 1,
            lstmsg: message,
            timer: remove
        })
    } 
})

client.on('message', async (message, guild) => {
    const links = ['discord.gg/', 'discordapp.com/invite', 'discord.com/invite']
    if(links.some(word => message.content.toLowerCase().includes(word))) {
        await message.delete()
        return message.channel.send("You are not allowed to post links here")
        .then(m => m.delete({timeout: 5000}))
    }
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.login("Meow");