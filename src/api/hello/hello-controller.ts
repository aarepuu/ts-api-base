import { Request, ResponseToolkit } from '@hapi/hapi'
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

  public async getSecretGreetings(request: Request, h: ResponseToolkit) {
    const greetings: Hello = { greetings: 'Hello Secrets' }
    return h
      .response({ meta: { success: true, messages: [] }, data: greetings })
      .code(200)
  }
}
