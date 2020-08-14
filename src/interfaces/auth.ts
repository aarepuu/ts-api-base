import { ResponseToolkit, Request } from '@hapi/hapi'
import { ServerConfigurations } from '../configurations'

export interface Auth {
  validateUser(
    decoded: any,
    request: Request,
    h: ResponseToolkit
  ): Promise<{ isValid: Boolean }>
  generateToken(configs: ServerConfigurations, user?: any): string
}
