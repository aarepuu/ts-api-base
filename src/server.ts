import { Server } from '@hapi/hapi'
import { Plugin } from './plugins'
import { Route } from './api'
import { ServerConfigurations } from './configurations'

export async function init(
  configs: ServerConfigurations,
  connector: any
): Promise<Server> {
  try {
    const server = new Server({
      debug: { request: ['error'] },
      port: configs.port,
      routes: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with']
        }
      }
    })

    if (configs.routePrefix) {
      server.realm.modifiers.route.prefix = configs.routePrefix
    }

    // TODO: setup connector plugins

    //  Setup Hapi Plugins
    const plugins: Array<string> = configs.plugins
    const pluginOptions = {
      connector: connector,
      serverConfigs: configs
    }
    let pluginPromises: Promise<any>[] = []
    plugins.forEach((pluginName: string) => {
      let plugin: Plugin = require('./plugins/' + pluginName).default()
      console.log(
        `Register Plugin ${plugin.info().name} v${plugin.info().version}`
      )
      pluginPromises.push(plugin.register(server, pluginOptions))
    })
    await Promise.all(pluginPromises)
    console.log('All plugins registered successfully.')

    // Setup API routes
    const routes: Array<string> = configs.routes
    routes.forEach((routeName: string) => {
      let route: Route = require('./api/' + routeName).default()
      console.log(
        `Register Route ${route.info().name} v${route.info().version}`
      )
      route.register(server, configs, connector)
    })
    // console.log('Routes registered successfully.')
    return server
  } catch (err) {
    console.log('Error starting server: ', err)
    throw err
  }
}
