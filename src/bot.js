import TelegramBot from 'node-telegram-bot-api/lib/telegram.js'
import dotenv from 'dotenv'
import { saveUser } from './controllers/auth.controller.js'

dotenv.config()

const token = process.env.BOT_TOKEN
const bot_url = process.env.BOT_URL

const bot = new TelegramBot(token, { polling: true })
console.log(token, bot_url, bot)

bot.onText(/\/start$/, async (msg) => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const userProfile = msg.from

  const user = await saveUser(
    userId,
    userProfile.first_name,
    userProfile.first_name + userProfile.last_name
  )

  const caption = `  
    Hello ${userProfile.first_name},  
    Welcome to blog  
  `

  const options = {
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

  bot.sendMessage(chatId, caption, options)
})

export default bot
