import { ResponseToolkit, Request } from '@hapi/hapi'
import { ServerConfigurations } from '../configurations'

export interface Auth {
  validateUser(
    decoded: any,
    request: Request,
    h: ResponseToolkit,
    user?: any,
    connector?: any
  ): Promise<{ isValid: Boolean }>
  generateToken(configs: ServerConfigurations, session?: any): string
}
