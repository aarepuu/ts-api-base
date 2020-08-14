import { Request, ResponseToolkit } from '@hapi/hapi'
import { ServerConfigurations } from '../../configurations'
import { sign } from 'jsonwebtoken'
import { Auth } from '../../interfaces/auth'
import User from './user-model'

// User database
const users: User[] = [
  new User({
    id: 1,
    name: 'Valid User',
    email: 'email@email.com',
    password: 'never-share-your-password'
  })
]

const validateUser = async (
  decoded: any,
  request: Request,
  h: ResponseToolkit
): Promise<{ isValid: Boolean }> => {
  const user = users.find(i => i.id === decoded.id)
  if (!user) {
    return { isValid: false }
  }

  return { isValid: true }
}

const generateToken = (configs: ServerConfigurations): string => {
  const jwtSecret = configs.jwtSecret
  const jwtExpiration = configs.jwtExpiration
  const payload = { id: users[0].id }
  return sign(payload, jwtSecret, { expiresIn: jwtExpiration })
}

export default (): Auth => {
  return {
    validateUser,
    generateToken
  }
}
