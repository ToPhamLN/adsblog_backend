import express from 'express'
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blog.controller.js'
import upload from '../middlewares/upload.middleware.js'

const router = express.Router()

router.post('/create', upload.single('image'), createBlog)
router.delete('/delete/:_id', deleteBlog)
router.put(
  '/update/:_id',
  upload.single('image'),
  updateBlog
)
router.get('/read/all', getBlogs)
router.get('/read/:_id', getBlog)

export default router
