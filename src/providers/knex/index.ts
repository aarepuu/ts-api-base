import { ConnectorInterface } from '..'
import { ConnectorConfigurations } from '../../configurations'
import Knex from 'knex'

const isDevMode = process.env.NODE_ENV == 'development'

const register = async (config: ConnectorConfigurations): Promise<any> => {
  const knex = Knex({
    client: config.client,
    connection: {
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      database: config.database
    },
    pool: {
      min: config.poolMin,
      max: config.poolMax,
      idleTimeoutMillis: config.poolIdle
    },
    acquireConnectionTimeout: 2000,
    debug: isDevMode
  })
  // Verify the connection before proceeding
  try {
    await knex.raw('SELECT now()')
    return knex
  } catch (error) {
    throw new Error(
      `Unable to connect to ${config.client} via Knex. Ensure a valid connection.`
    )
  }
}

export default (): ConnectorInterface => {
  return {
    register,
    info: () => {
      return { name: 'Knex', version: '1.0.0' }
    }
  }
}
