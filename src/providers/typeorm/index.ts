import { ConnectorInterface } from '..'
import { ConnectorConfigurations } from '../../configurations'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'

const isDevMode = process.env.NODE_ENV == 'development'

const register = async (
  config: ConnectorConfigurations
): Promise<Connection> => {
  const connectionParams: ConnectionOptions = {
    type: 'postgres', // TODO: fix type check
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [
      ...(isDevMode ? ['src/api/**/*-model.ts'] : ['dist/api/**/*-model.js'])
    ],
    // extra: {
    //   ssl: !isDevMode // if not development, will use SSL
    // },
    synchronize: false,
    logging: isDevMode
  }
  return createConnection(connectionParams)
}

export default (): ConnectorInterface => {
  return {
    register,
    info: () => {
      return { name: 'Typeorm', version: '1.0.0' }
    }
  }
}
