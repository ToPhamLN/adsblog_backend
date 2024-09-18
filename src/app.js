import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import {
  notFound,
  errorHandler
} from './middlewares/error.middleware.js'
import { fileURLToPath } from 'url'
import path from 'path'
import authRoute from './routes/auth.route.js'
import blogRoute from './routes/blog.route.js'
import categoryRoute from './routes/category.route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(
  bodyParser.urlencoded({ limit: '30mb', extended: true })
)
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../', 'uploads'))
)

app.use('/api/auth', authRoute)
app.use('/api/blogs', blogRoute)
app.use('/api/categories', categoryRoute)

app.use(notFound)
app.use(errorHandler)

export default app
