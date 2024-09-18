import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    path: { type: String },
    filename: { type: String }
  }
})

const CategoryModel = model('Category', categorySchema)
export default CategoryModel
