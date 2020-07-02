const VkBot = require('node-vk-bot-api') 
const bot = new VkBot(process.env.bot)

bot.startPolling()

module.exports = function(msg)
{
    bot.sendMessage(56236939,{
        message : msg,
        random_id : Math.random()
    })
}

