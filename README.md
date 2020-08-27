# A Typescript API Project

> **Work in progress....**

This project was setup with [aarepuu/ts-api-base](https://github.com/ts-api-base), which sets up [Hapi](https://hapi.dev/) server, inspired by [dwyl/hapi-typescript-example](https://github.com/dwyl/hapi-typescript-example), with useful plugins with choice of connector interfaces and other useful Typescript tools.

## Template Features

**Dev/Build Features**

- Multi-stage docker build to install, test and deploy
- Testing setup with `jest`, `ts-jest`
- Linting setup with `tsc`
- Auto load `.env` files with `dotenv`

**API Features**

- Uses `.env` variable to specify connector provider (comes with TypeORM and Knex connector providers)
- Uses `.env` variable to load hapi plugins (comes with Pino logger and JWT Authentication plugin)
- Uses `.env` variable to load authentication controller
- Uses [JWT authentication](https://github.com/dwyl/hapi-auth-jwt2)

## Dev Commands

```bash
# Run in dev mode and restart on file changes
npm run dev

# Lint the source code
npm run lint

# Manually format code
# -> This repo runs prettier on git-stage, so committed code is always formatted
npm run prettier

# Run the unit tests
# -> Looks for .spec.ts files in the src directory
npm test

# Generate code coverage in coverage/
npm run coverage
```

## Usage/Extending

Template contains example implementation of API using `dummy` connector. Add your own API endpoints based on the [api/hello](src/api/hello) example according to the connector of choice. For JWT authentication you need to implement your own `auth provider` (see example [api/auth](src/api/auth)) according to the connector of choice and extending the `auth` interface.

For connector implementation see more about [typeorm](https://typeorm.io) and [knex](http://knexjs.org/).

### 2FA Authentication

> **DISCLAIMER!** Please note the code in the following example is not production ready and not battle tested.

Template also includes an example of 2FA leveraging [otplib](https://github.com/yeojz/otplib) that can be used with Google Authenticator application on phone or tablet.

2FA adds additional parameter of `verified` to encoded JWT token which can be set as default authenticator of routes. After login and when 2FA is successfully validated using a time limited one time verification code from the Authenticator app, JWT token property is updated to `{verified: true}`. The verified parameter is made available in credentials on the `request` as `request.auth.credentials.verified` which can be checked on restricted routes:

```js
if (!request.auth.credentials.verified)
  return Boom.unauthorized('Missing two-factor verification')
```

> For more information see [JWT Spec](https://tools.ietf.org/html/rfc7519)

## Variables

The setup of the API is done using set of `.env` variables

| Name               | Usage                               |                                                       Values                                                       |
| :----------------- | ----------------------------------- | :----------------------------------------------------------------------------------------------------------------: |
| APP_NAME           | Name of your application            |                                         defaults to name in `package.json`                                         |
| CONNECTOR          | The connector provider              |                                 `dummy`, `typeorm` or `knex`, defaults to `dummy`                                  |
| HOST               | The hostname of your application    |                                               defaults to `0.0.0.0`                                                |
| PORT               | The port number of your application |                                                 defaults to `3000`                                                 |
| PLUGINS            | The list of plugins to load         |                                            comes with `logger,jwt-auth`                                            |
| ROUTES             | The list of api endpoints to load   |                                                defaults to `hello`                                                 |
| JWT_SECRET         | The secret key for JWT              |                                         defaults to `never-share-secrets`                                          |
| JWT_EXP            | The expiry of JWT token             |                                                  defaults to `1h`                                                  |
| ROUTE_PREFIX       | The prefix for api routes           |                                                   defaults to ``                                                   |
| CLIENT             | The type of your database client    |                                              defaults to `localhost`                                               |
| DB_HOST            | The username of your `database`     | see [typeORM](https://typeorm.io/#/undefined/creating-a-connection-to-the-database) and [knex](http://knexjs.org/) |
| DB_USER            | The hostname of your `database`     |                                               defaults to `postgres`                                               |
| DB_PASS            | The password of your `database`     |                                               defaults to `postgres`                                               |
| DB_NAME            | The name of your `database`         |                                                defaults to `apidb`                                                 |
| AUTH_PROVIDER_PATH | The location of auth provider       |                                 defaults to `auth/auth-provider` (under api/auth)                                  |
| DATABASE_POOL_MIN  | The min pool for your `database`    |                                                  defaults to `0`                                                   |
| DATABASE_POOL_MAX  | The max pool for your `database`    |                                                  defaults to `10`                                                  |
| DATABASE_POOL_IDLE | The pool idle for your `database`   |                                                defaults to `10000`                                                 |

> Setup using [aarepuu/ts-node-base](https://github.com/ts-node-base)

## TODOs/Ideas

- add connector plugin loading
- implement more connector interfaces
- auto generate API documentation
- add API generation from `schema.json` file
- build 2FA as hapi-plugin
- add recovery codes to 2FA
- add remember device to 2FA
