import { ConnectorConfigurations } from '../configurations'

export interface ConnectorInterface {
  register(config?: ConnectorConfigurations): Promise<any>
  info(): ConnectorInfo
}

export interface ConnectorInfo {
  name: string
  version: string
}
