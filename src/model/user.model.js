import { Schema, model } from 'mongoose'
import { ERole } from '../constants/enum.js'

const userSchema = new Schema(
  {
    telegramId: {
      type: String,
      unique: true
    },
    username: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    role: {
      type: String,
      enum: Object.values(ERole),
      default: ERole.USER
    },
    password: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
)
const UserModel = model('User', userSchema)
export default UserModel
