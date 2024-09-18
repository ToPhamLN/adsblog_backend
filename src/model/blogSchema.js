import { Schema, model } from 'mongoose'

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    mainImage: {
      path: { type: String },
      filename: { type: String }
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const BlogModel = model('Blog', blogSchema)
export default BlogModel
