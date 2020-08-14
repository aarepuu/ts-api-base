import { Plugin } from '..'
import { Server } from '@hapi/hapi'

const register = async (server: Server): Promise<void> => {
  try {
    return server.register({
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        // Redact Authorization headers, see https://getpino.io/#/docs/redaction
        redact: ['req.headers.authorization']
      }
    })
  } catch (err) {
    console.log(`Error registering logger plugin: ${err}`)
    throw err
  }
}

export default (): Plugin => {
  return {
    register,
    info: () => {
      return { name: 'Pino Logger', version: '1.0.0' }
    }
  }
}
