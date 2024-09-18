import BlogModel from '../model/blogSchema.js'

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, category } = req.body
    const file = req.file

    if (!file) {
      res.statusCode = 400
      throw Error('Image not found')
    }

    const blog = new BlogModel({
      title,
      content,
      category,
      mainImage: {
        path: file.path,
        filename: file.filename
      }
    })
    await blog.save()
    res.status(201).json({
      message: 'Blog created successfully',
      blog
    })
  } catch (error) {
    next(error)
  }
}

export const updateBlog = async (req, res, next) => {
  try {
    const { _id } = req.params
    const { title, content, category } = req.body
    const file = req.file

    const blog = await BlogModel.findById(_id)
    if (!blog) {
      res.status(404)
      throw new Error('Blog not found')
    }

    const update = {
      title,
      content,
      category
    }

    if (file) {
      update.mainImage = {
        path: file.path,
        filename: file.filename
      }
    }

    console.log(update)

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      _id,
      update,
      { new: true }
    )
    res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog
    })
  } catch (error) {
    next(error)
  }
}

export const deleteBlog = async (req, res, next) => {
  try {
    const { _id } = req.params
    const existedBlog = await BlogModel.findById(_id)
    if (!existedBlog) {
      res.status(404)
      throw new Error('Blog not found')
    }
    await BlogModel.findByIdAndDelete(_id)
    res.status(200).json({
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getBlogs = async (req, res, next) => {
  try {
    const { q, category, page, limit } = req.query
    const query = {}
    if (q) {
      query.title = {
        $regex: '.*' + q + '.*',
        $options: 'i'
      }
    }

    const pageNumber = parseInt(page, 10) || 1
    const limitNumber = parseInt(limit, 10) || 10
    const skip = (pageNumber - 1) * limitNumber

    if (category) {
      query.category = category
    }

    const blogs = await BlogModel.find(query)
      .skip(skip)
      .limit(limitNumber)
    if (!blogs) {
      res.status(404)
      throw new Error('Blogs not found')
    }
    const totalBlogs = await BlogModel.countDocuments(query)
    const totalPages = Math.ceil(totalBlogs / limitNumber)

    res.status(200).json({
      blogs,
      totalBlogs,
      totalPages
    })
  } catch (error) {
    next(error)
  }
}

export const getBlog = async (req, res, next) => {
  try {
    const { _id } = req.params
    const blog = await BlogModel.findById(_id)
    if (!blog) {
      res.status(404)
      throw new Error('Blog not found')
    }
    res.status(200).json({
      blog
    })
  } catch (error) {
    next(error)
  }
}
