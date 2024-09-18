import express from 'express'
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js'
import upload from '../middlewares/upload.middleware.js'

const router = express.Router()

router.post(
  '/create',
  upload.single('image'),
  createCategory
)
router.delete('/delete/:_id', deleteCategory)
router.put('/update/:_id', updateCategory)
router.get('/read/all', getCategories)
router.get('/read/:_id', getCategory)

export default router
