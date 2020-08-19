import { ResponseToolkit } from '@hapi/hapi'
import { unauthorized } from '@hapi/boom'
import { CustomRequest } from '../../interfaces/request'
import Hello from './hello-model'
import { ServerConfigurations } from '../../configurations'

export default class HelloController {
  private connector: any
  private configs: ServerConfigurations

  constructor(configs: ServerConfigurations, connector: any) {
    this.connector = connector
    this.configs = configs
  }

  public async getGreetings(request: Request, h: ResponseToolkit) {
    const greetings: Hello = { greetings: 'Hello World' }
    return h
      .response({ meta: { success: true, messages: [] }, data: greetings })
      .code(200)
  }

  public async getSecretGreetings(request: CustomRequest, h: ResponseToolkit) {
    // needed for all restricted routes
    if (!request.auth.credentials.verified)
      return unauthorized('Missing two-factor verification')

    const greetings: Hello = { greetings: 'Hello Secrets' }
    return h
      .response({ meta: { success: true, messages: [] }, data: greetings })
      .code(200)
  }
}
