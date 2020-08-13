import { ConnectorInterface } from '..'

const register = async (): Promise<any> => {
  return Promise.resolve()
}

export default (): ConnectorInterface => {
  return {
    register,
    info: () => {
      return { name: 'Dummy', version: '1.0.0' }
    }
  }
}
