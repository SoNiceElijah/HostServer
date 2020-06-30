const VkBot = require('node-vk-bot-api') 
const bot = new VkBot('43e35064b35be781f0a3594a332a95fdcaed62aea6ed78f4957bc9fcf0449ee236bfbf521b0d6782bbaba')

bot.startPolling()

module.exports = function(msg)
{
    bot.sendMessage(56236939,{
        message : msg,
        random_id : Math.random()
    })
}

