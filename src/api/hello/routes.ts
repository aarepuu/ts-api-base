import { Server } from '@hapi/hapi'
import HelloController from './hello-controller'
import * as HelloValidator from './hello-validator'
import { ServerConfigurations } from '../../configurations'

export default function(
  server: Server,
  serverConfigs: ServerConfigurations,
  connector: any
) {
  const helloController = new HelloController(serverConfigs, connector)
  server.bind(helloController)

  server.route({
    method: 'GET',
    path: '/hello',
    options: {
      handler: helloController.getGreetings,
      auth: false,
      tags: ['api', 'hello'],
      description: 'Get greetings'
    }
  })

  server.route({
    method: 'GET',
    path: '/hello/restricted',
    options: {
      handler: helloController.getSecretGreetings,
      auth: 'jwt',
      tags: ['api', 'hello', 'auth'],
      description: 'Get secret greetings',
      validate: {
        headers: HelloValidator.jwtValidator
      }
    }
  })
}
