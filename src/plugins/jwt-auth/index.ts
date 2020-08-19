import { Plugin, PluginOptions } from '..'
import { Server } from '@hapi/hapi'
import { ServerConfigurations } from '../../configurations'
import { Auth } from '../../interfaces/auth'

const register = async (
  server: Server,
  options: PluginOptions
): Promise<void> => {
  try {
    const connectorConfig = options.connectorConfigs
    const serverConfig = options.serverConfigs
    // load custom auth provider
    const authProvider: Auth = require('../../api/' +
      connectorConfig.authProvider).default()

    await server.register(require('hapi-auth-jwt2'))

    return setAuthStrategy(server, {
      config: serverConfig,
      validate: authProvider.validateUser
    })
  } catch (err) {
    console.log(`Error registering jwt plugin: ${err}`)
    throw err
  }
}

const setAuthStrategy = async (
  server: Server,
  { config, validate }: { config: ServerConfigurations; validate: any }
) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  })

  server.auth.default('jwt')

  return
}

export default (): Plugin => {
  return {
    register,
    info: () => {
      return { name: 'JWT Authentication', version: '1.0.0' }
    }
  }
}
