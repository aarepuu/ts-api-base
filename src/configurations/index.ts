const pkg = require('../../package.json')

export interface ServerConfigurations {
  appName: string
  host: string
  port: number
  debugLogging: boolean
  plugins: Array<string>
  routes: Array<string>
  jwtSecret: string
  jwtExpiration: string
  routePrefix: string
  connector: string
}

export interface ConnectorConfigurations {
  client: string
  host: string
  port: number
  username: string
  password: string
  database: string
  authProvider: string
  poolMin: number
  poolMax: number
  poolIdle: number
}

const isDevMode = process.env.NODE_ENV === 'development'

const server: ServerConfigurations = {
  appName: process.env.APP_NAME || pkg.name,
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT || 3000),
  debugLogging: isDevMode,
  plugins: String(process.env.PLUGINS || 'logger,jwt-auth').split(','),
  routes: String(process.env.ROUTES || 'hello,auth').split(','),
  jwtSecret: process.env.JWT_SECRET || 'never-share-secrets',
  jwtExpiration: process.env.JWT_EXP || '1h',
  routePrefix: process.env.ROUTE_PREFIX || '',
  connector: process.env.CONNECTOR || 'dummy'
}

const connector: ConnectorConfigurations = {
  client: process.env.CLIENT || 'postgres',
  port: Number(process.env.DB_PORT || 5432),
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'apidb',
  authProvider: process.env.AUTH_PROVIDER_PATH || 'auth/auth-provider',
  poolMin: Number(process.env.DATABASE_POOL_MIN || '0'),
  poolMax: Number(process.env.DATABASE_POOL_MAX || '10'),
  poolIdle: Number(process.env.DATABASE_POOL_IDLE || '10000')
}

export function getServerConfigs(): ServerConfigurations {
  return server
}

export function getConnectorConfigs(): ConnectorConfigurations {
  return connector
}
