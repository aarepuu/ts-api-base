import { Server } from '@hapi/hapi'
// import * as Joi from 'joi'
import HelloController from './hello-controller'
// import { DetectionModel } from './detection'
// import { Connector } from '../../connector'
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
      tags: ['api', 'hello'],
      description: 'Get greetings'
    }
  })
}
