const Discord = require('discord.js')

module.exports = {
    name: 'waifu',
    description: 'gives you options',
    execute(message, args, prefix){
        if(message.content.startsWith(prefix)) return; 
            let wai = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0K7AScTdRHD9vwq58IC2ptINWzzoxUbXEpw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBYNijTIZnIJ9cfIYxbmp7dSkpO5DBlAgYQ&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvziUGBj34tANRNJF46iRhJk1ROLAvgkb6Wg&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YL55c1ObtZlTyNvmjib7R0W7ymUoeYgeNA&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtFUWdDWeirD0UXHzuDLYMlzdvSkGsO05UqA&usqp=CAU"]
            let victim = message.mentions.users.first()
            if(!victim) message.reply("Pls mention someone so I may predict")
            else{
            message.channel.send(`${wai[Math.floor(Math.random() * wai.length)]} `)
        }
    }
}