import { ResponseToolkit } from '@hapi/hapi'
import { unauthorized } from '@hapi/boom'
import { UserModel } from './user-model'
import { Connector } from '../../connector'
import { ServerConfigurations } from '../../configurations'
import {
  LoginRequest,
  CustomRequest,
  twofaRequest
} from '../../interfaces/request'
import { Auth } from '../../interfaces/auth'
import AuthProvider from './auth-provider'
import { authenticator } from '@otplib/preset-default'
import qrcode from 'qrcode'

export default class AuthController {
  private connector: Connector
  private configs: ServerConfigurations
  private authProvider: Auth

  constructor(configs: ServerConfigurations, connector: Connector) {
    this.connector = connector
    this.configs = configs
    // load custom auth provider
    this.authProvider = AuthProvider()
  }

  private generateQr(): Promise<string> {
    const appName = this.configs.appName
    const email = UserModel.getUser().email
    const otpauth = authenticator.keyuri(
      email,
      appName,
      UserModel.getUser().secret
    )
    return qrcode.toDataURL(otpauth)
  }

  public async loginUser(request: LoginRequest, h: ResponseToolkit) {
    const { email, password } = request.payload
    // dummy database call
    let user = UserModel.getUser(email)

    if (!user) {
      return unauthorized('User does not exists.')
    }

    if (!UserModel.validatePassword(password)) {
      return unauthorized('Password is invalid.')
    }

    const token = this.authProvider.generateToken(this.configs, {
      id: UserModel.getUser().id,
      permission: 'ADMIN',
      verified: false
    })
    if (!user.secret) {
      const key = authenticator.generateSecret()
      UserModel.setSecret(key)
      const uri = await this.generateQr()
      return h
        .response({
          uri,
          key,
          token
        })
        .code(206)
    }
    // TODO: use status and expire to set cookie expiration
    return h.response({ token }).code(206)
  }

  public async refreshUser(request: CustomRequest, h: ResponseToolkit) {
    const id = request.auth.credentials.id
    // dummy database call
    let user = UserModel.getUser(id)

    if (!user) return unauthorized('User does not exists.')

    // TODO: use status and expire to set cookie expiration
    return { token: this.authProvider.generateToken(this.configs) }
  }

  public async verifyWith2fa(request: twofaRequest, h: ResponseToolkit) {
    const session = request.auth.credentials
    const id = session.id
    // dummy database call
    let user = UserModel.getUser(id)
    if (!user) return unauthorized('User does not exists.')

    const { code, rememberDevice } = request.payload
    const valid = authenticator.check(code, UserModel.getUser(user.id).secret)
    if (valid) {
      session.verified = true
      return { token: this.authProvider.generateToken(this.configs, session) }
    }
    return unauthorized('Token is invalid')
  }

  public async loginWithRecoveryCode(request: Request, h: ResponseToolkit) {}
}
