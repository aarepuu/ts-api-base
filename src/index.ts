import * as Configs from './configurations'
import * as Server from './server'
import * as Connector from './connector'
;(async () => {
  try {
    // get server config
    const serverConfigs = Configs.getServerConfigs()
    // get connector config
    const connectorConfigs = Configs.getConnectorConfigs()
    // load connector
    // TODO: check if connector init is successful
    const connector = await Connector.init(serverConfigs, connectorConfigs)
    // start server
    const server = await Server.init(serverConfigs, connectorConfigs, connector)
    await server.start()
    console.log(`Server running @ ${server.info.uri}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
