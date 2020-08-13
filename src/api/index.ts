import { Server } from '@hapi/hapi'
import { ServerConfigurations } from '../configurations'

export interface Route {
  register(config: Server, configs: ServerConfigurations, connector: any): void
  info(): RouteInfo
}

export interface RouteInfo {
  name: string
  version: string
}
