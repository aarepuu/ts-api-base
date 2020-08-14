import { Server } from '@hapi/hapi'
import {
  ServerConfigurations,
  ConnectorConfigurations
} from '../configurations'

export interface PluginOptions {
  serverConfigs: ServerConfigurations
  connectorConfigs: ConnectorConfigurations
  connector?: any
}

export interface Plugin {
  register(server: Server, options?: PluginOptions): Promise<void>
  info(): PluginInfo
}

export interface PluginInfo {
  name: string
  version: string
}
