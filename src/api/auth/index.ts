import { Server } from '@hapi/hapi'
import { Route } from '..'
import Routes from './routes'
import { ServerConfigurations } from '../../configurations'

const register = (
  server: Server,
  configs: ServerConfigurations,
  connector: any
): void => {
  Routes(server, configs, connector)
}

export default (): Route => {
  return {
    register,
    info: () => {
      return { name: 'Auth', version: '1.0.0' }
    }
  }
}
