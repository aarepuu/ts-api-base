import { ServerConfigurations, ConnectorConfigurations } from './configurations'
import { ConnectorInterface } from './providers'

export interface ConnectorOptions {
  serverConfigs: ServerConfigurations
  connectorConfigs: ConnectorConfigurations
}

export interface Connector {
  connector: Promise<any>
}

// const isDevMode = process.env.NODE_ENV == 'development'
// TODO: Better way to return connector
export async function init(
  serverConfigs: ServerConfigurations,
  connectorConfigs: ConnectorConfigurations
): Promise<any> {
  // register/load connector
  // register plugins for connector
  const connectorType: string = serverConfigs.connector

  const connectorInterface: ConnectorInterface = require('./providers/' +
    connectorType).default()

  console.log(
    `Register Connector ${connectorInterface.info().name} v${
      connectorInterface.info().version
    }`
  )

  return connectorInterface.register(connectorConfigs)
}
