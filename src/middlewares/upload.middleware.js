import multer from 'multer'
import { storage } from '../config/multer.js'

const upload = multer({ storage: storage })

export default upload
