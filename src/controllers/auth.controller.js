import UserModel from '../model/user.model.js'
import { ERole } from '../constants/enum.js'

export const saveUser = async ({
  id,
  first_name,
  username
}) => {
  try {
    const existedUser = await UserModel.findOne({
      telegramId: id
    })
    if (!existedUser) {
      const newUser = new UserModel({
        telegramId: id,
        username: username,
        firstName: first_name,
        role: ERole.User
      })

      const user = await newUser.save()
      return { user }
    } else {
      return { user: existedUser }
    }
  } catch (error) {
    return { error }
  }
}

export const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const existed = await UserModel.findOne({ username })
    if (!existed) {
      res.statusCode = 400
      throw new Error('Username not found. ')
    }

    if (password !== existed.password) {
      res.statusCode = 400
      throw new Error('Wrong password, please try again. ')
    }

    // eslint-disable-next-line no-unused-vars
    const { password: omitPassword, ...others } =
      existed.toObject()
    res.status(200).json({
      user: { ...others },
      message: 'Logged in successfully '
    })
  } catch (error) {
    next(error)
  }
}
