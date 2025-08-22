const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'giveaway',
    description: 'hosts a giveaway',
    async execute(message, args, client, prefix) {
        if(message.content.startsWith(prefix)) return;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return channel.reply("You don't have permission to use this oops");

   
    if(!args[0]) return message.channel.send(`Correct uage: \`1s,h,d(Any Time)\` \`1/2/3(winner/winners)\` \`Prize(The item name)\` `)
    
    
    if(!args[0].endsWith("s")&&!args[0].endsWith("h")&&!args[0].endsWith("d")&&!args[0].endsWith("m")) return message.channel.send(`Correct uage: \`1s,h,d(Any Time)\` \`1/2/3(winner/winners)\` \`Prize(The item name)\` `)
    
    
    if(isNaN(args[0][0])) return message.channel.send(`Correct uage: \`1s,h,d(Any Time)\` \`1/2/3(winner/winners)\` \`Prize(The item name)\` `)

    
    let winnerCount = args[1]
    
    
    let prize = args.slice(2).join(" ")
    
    
    if(!args[1]) return message.channel.send(`How many winners are there in the giveaway?`)
    
   
    if(!args[2]) return message.channel.send(`What is the prize for the giveaway?`)
    
   
    message.delete()
    
    
    var e = new Discord.MessageEmbed()
     .setTitle(`😨${prize}😨`)
     .setDescription(`
     React with 😨 to take part in this giveaway
     Total winners: ${winnerCount}
     Duration: ${args[0]}
     Hosted By: ${message.author}`)
     .setTimestamp(`Ends on ${Date.now()+ms(args[0])}`)
     .setColor("PURPLE")
     
   
    var msg = await message.channel.send(e)
    
   
    msg.react('😨')

    
    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;
    
        
        var peopleReacted = msg.reactions.cache.get("😨").users.cache.array();

       
        for (let i = 0; i < peopleReacted.length; i++) {

            if(peopleReacted[i].id == client.user.id){
                peopleReacted.splice(i,1);
                continue;
            }
        }

       
        if(peopleReacted.length == 0) {
            var non = new Discord.MessageEmbed()
             .setColor("RED")
             .setTitle("😨 GIVEAWAY ENDS 😨")
             .setDescription(`There are no winners as no one participated
             
             Hosted By: **${message.author}`)
            msg.edit(non)

            return message.channel.send(`There are no winners as no one participated\n${msg.url}`)
        }

       
        if(peopleReacted.length < winnerCount) {
            var non = new Discord.MessageEmbed()
             .setColor("RED")
             .setTitle("😨 Giveaway Ended 😨")
             .setDescription(`There are no winners as no one participated
             
             Hosted By: ${message.author}`)
            msg.edit(non)

            return message.channel.send(`There are no winners as no one participated\n${msg.url}`)
        }

        
        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

           
            for (let o = 0; o < winners.length; o++) {

                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
            }


            
            if(!inList){
                winners.push(peopleReacted[random]);
            }
        }

      
        var response = ``

       
        for (let y = 0; y < winners.length; y++) {

           
            response += `${winners[y]}\n`
               
            
            var embed = new Discord.MessageEmbed()
             .setColor("PURPLE")
             .setTitle("😨 Giveaway Ended 😨")
             .setDescription(`
             Prize: ${prize}
             Winner/Winners: ${response}
             Hosted By: ${message.author}`)
            msg.edit(embed)  
    
            message.channel.send(`Congratulations ${response} for winning the prize\nContact \`\`\`${message.author.tag}\`\`\` to claim your prize`) 
        }
    }, ms(args[0]));
    }
}