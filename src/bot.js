import TelegramBot from 'node-telegram-bot-api/lib/telegram.js'
import dotenv from 'dotenv'
import { saveUser } from './controllers/auth.controller.js'
import fs from 'fs' // Import fs module

dotenv.config()

const token = process.env.BOT_TOKEN
const bot_url = process.env.BOT_URL

const bot = new TelegramBot(token, { polling: true })
console.log(token, bot_url)

bot.onText(/\/start$/, async (msg) => {
  const chatId = msg.chat.id
  const gifPath =
    'https://raw.githubusercontent.com/ToPhamLN/morriapp/master/frontend/src/assets/favicon.ico'
  const userId = msg.from.id
  const userProfile = msg.from

  const user = await saveUser(
    userId,
    userProfile.first_name,
    userProfile.username
  )

  const caption = `  
    Hello ${userProfile.first_name},  
    Welcome to blog  
  `

  const options = {
    caption: caption,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: ' Start ',
            url: bot_url
          }
        ]
      ]
    }
  }

  bot.sendPhoto(chatId, gifPath, options)
})

export default bot
