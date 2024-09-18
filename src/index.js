import app from './app.js'
import { connect } from './config/db.js'
import './bot.js'

const port = process.env.PORT || 8000

connect()

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port}`
  )
})
