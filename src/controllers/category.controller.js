import CategoryModel from '../model/category.model.js'
import deleteImage from '../utils/deleteImage.js'

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body
    const file = req.file

    if (!file) {
      res.statusCode = 400
      throw Error('Image not found')
    }
    const existedCategory = await CategoryModel.findOne({
      name
    })
    if (existedCategory) {
      res.status(400)
      throw new Error('Category already exists')
    }
    const category = new CategoryModel({
      name,
      image: {
        path: file?.path,
        filename: file?.filename
      }
    })
    await category.save()
    res.status(201).json({
      message: 'Category created successfully',
      category
    })
  } catch (error) {
    const file = req.file
    if (file) deleteImage(file?.filename)
    next(error)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const file = req.file
    const { _id } = req.params
    const { name } = req.body
    const existedCategory =
      await CategoryModel.findById(_id)
    if (!existedCategory) {
      res.status(404)
      throw new Error('Category not found')
    }
    const existedCategoryName = await CategoryModel.findOne(
      { name }
    )
    if (existedCategoryName) {
      res.status(400)
      throw new Error('Category name already exists')
    }
    const updateCategory = {
      name
    }

    if (file) {
      updateCategory.image = {
        path: file?.path,
        filename: file?.filename
      }
    }
    const updatedCategory =
      await CategoryModel.findByIdAndUpdate(
        _id,
        updateCategory,
        { new: true }
      )
    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory
    })
  } catch (error) {
    const file = req.file
    if (file) deleteImage(file?.filename)
    next(error)
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const { _id } = req.params
    const existedCategory =
      await CategoryModel.findById(_id)
    if (!existedCategory) {
      res.status(404)
      throw new Error('Category not found')
    }
    await CategoryModel.findByIdAndDelete(_id)
    res.status(200).json({
      message: 'Category deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getCategories = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pageNumber = parseInt(page, 10) || 1
    const limitNumber = parseInt(limit, 10) || 10
    const skip = (pageNumber - 1) * limitNumber

    const categories = await CategoryModel.find()
      .skip(skip)
      .limit(limitNumber)

    if (!categories) {
      res.status(404)
      throw new Error('Categories not found')
    }
    const totalCategories =
      await CategoryModel.countDocuments()
    const totalPage = Math.ceil(
      totalCategories / limitNumber
    )
    res.status(200).json({
      categories,
      totalCategories,
      totalPage
    })
  } catch (error) {
    next(error)
  }
}

export const getCategory = async (req, res, next) => {
  try {
    const { _id } = req.params
    const category = await CategoryModel.findById(_id)
    if (!category) {
      res.status(404)
      throw new Error('Category not found')
    }
    res.status(200).json({
      category
    })
  } catch (error) {
    next(error)
  }
}
