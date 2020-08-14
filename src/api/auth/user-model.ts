import { hashSync, genSaltSync, compareSync } from 'bcryptjs'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
}

export default class User {
  id: number
  name: string
  email: string
  password: string

  constructor(user: IUser) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.password = user.password
  }
  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync(8))
  }

  public validatePassword(requestPassword: string) {
    return compareSync(requestPassword, this.password)
  }
}
