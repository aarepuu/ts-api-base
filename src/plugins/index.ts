import { Server } from '@hapi/hapi'
import { ServerConfigurations } from '../configurations'

export interface PluginOptions {
  connector: any
  serverConfigs: ServerConfigurations
}

export interface Plugin {
  register(server: Server, options?: PluginOptions): Promise<void>
  info(): PluginInfo
}

export interface PluginInfo {
  name: string
  version: string
}
