import { Server } from '@hapi/hapi'
import AuthController from './auth-controller'
import * as UserValidator from './user-validator'
import { ServerConfigurations } from '../../configurations'

export default function(
  server: Server,
  serverConfigs: ServerConfigurations,
  connector: any
) {
  const authController = new AuthController(serverConfigs, connector)
  server.bind(authController)

  server.route({
    method: 'POST',
    path: '/auth/login',
    options: {
      handler: authController.loginUser,
      auth: false,
      tags: ['api', 'auth'],
      description: 'Login a user.',
      validate: {
        payload: UserValidator.loginUserModel
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/auth/2fa',
    options: {
      handler: authController.verifyWith2fa,
      auth: 'jwt',
      tags: ['api', 'auth', '2fa'],
      description: '2FA Login a user.',
      validate: {
        payload: UserValidator.twofaValidator,
        headers: UserValidator.jwtValidator
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/auth/refresh',
    options: {
      handler: authController.refreshUser,
      auth: 'jwt',
      tags: ['api', 'auth'],
      description: 'Refresh token for current user.',
      validate: {
        headers: UserValidator.jwtValidator
      }
    }
  })

  // server.route({
  //   method: 'POST',
  //   path: '/auth/2fa/recovery',
  //   options: {
  //     handler: authController.loginWithRecoveryCode,
  //     auth: 'jwt',
  //     tags: ['api', 'auth'],
  //     description: 'Login a user.',
  //     validate: {
  //       payload: UserValidator.twofaRecoveryValidator,
  //       headers: UserValidator.jwtValidator
  //     }
  //   }
  // })
}
