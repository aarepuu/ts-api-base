// TODO: is this needed for init
// import { config } from 'dotenv'
import {
  ConnectorConfigurations
  // ServerConfigurations
} from '../configurations'
// config({ path: '.env' })

// export interface ConnectorOptions {
//   serverConfigs: ServerConfigurations
//   connectorConfigs: ConnectorConfigurations
// }

export interface ConnectorInterface {
  register(config?: ConnectorConfigurations): Promise<any>
  info(): ConnectorInfo
}

export interface ConnectorInfo {
  name: string
  version: string
}
