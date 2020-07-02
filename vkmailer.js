const VkBot = require('node-vk-bot-api') 

try {
const bot = new VkBot(process.env.bot)
bot.startPolling()
}
catch(ex) { };

module.exports = function(msg)
{
    bot.sendMessage(56236939,{
        message : msg,
        random_id : Math.random()
    })
}

