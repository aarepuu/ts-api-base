import { ResponseToolkit } from '@hapi/hapi'
import { hashSync, genSaltSync, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { ServerConfigurations } from '../../configurations'
import { Auth } from '../../interfaces/auth'
import { Session } from '../../interfaces/session'
import { CustomRequest } from '../../interfaces/request'
import { UserModel } from './user-model'

const validateUser = async (
  decoded: any,
  request: CustomRequest,
  h: ResponseToolkit
): Promise<{ isValid: Boolean }> => {
  const user = UserModel.getUser(decoded.id)
  if (!user) {
    return { isValid: false }
  }
  return { isValid: true }
}
const generateToken = (
  configs: ServerConfigurations,
  session: Session
): string => {
  const jwtSecret = configs.jwtSecret
  const jwtExpiration = configs.jwtExpiration
  const payload = {
    id: session.id,
    permission: session.permission,
    verified: session.verified
  }
  return sign(payload, jwtSecret, { expiresIn: jwtExpiration })
}

const hashPassword = (password: string): string => {
  return hashSync(password, genSaltSync(8))
}
const validatePassword = (
  password: string,
  requestPassword: string
): boolean => {
  return compareSync(requestPassword, password)
}

export default (): Auth => {
  return {
    validateUser,
    generateToken
  }
}
