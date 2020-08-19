import { AuthCredentials, RequestAuth, Request } from '@hapi/hapi'

export interface Credentials extends AuthCredentials {
  id: string
  permission: string
  verified: boolean
}

export interface CustomRequestAuth extends RequestAuth {
  credentials: Credentials
}

export interface CustomRequest extends Request {
  auth: CustomRequestAuth
}

export interface LoginRequest extends CustomRequest {
  payload: {
    email: string
    password: string
  }
}

export interface twofaRequest extends CustomRequest {
  payload: {
    code: string
    rememberDevice: boolean
  }
}
