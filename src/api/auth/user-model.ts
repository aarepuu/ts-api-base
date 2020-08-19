import { hashSync, genSaltSync, compareSync } from 'bcryptjs'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  secret: string
}

class User {
  id: number
  name: string
  email: string
  password: string
  secret: string

  constructor(user: IUser) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.password = this.hashPassword(user.password)
    this.secret = ''
  }
  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync(8))
  }

  public validatePassword(requestPassword: string) {
    return compareSync(requestPassword, this.password)
  }

  public getUser(request?: any): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      secret: this.secret
    }
  }

  public setSecret(secret: string) {
    this.secret = secret
  }
}

export const UserModel = new User({
  id: 1,
  name: 'Valid User',
  email: 'email@email.com',
  password: 'secret',
  secret: ''
})
