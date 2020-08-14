# A Typescript API Project

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

Add your own API endpoints based on the [api/hello](src/api/hello) example according to the connector of choice. For JWT authentication you need to implement your own auth controller based on the [api/auth](src/api/auth) example according to the connector of choice (using `auth` interface). Template uses `dummy` connector and auth. See more about implementation of [typeorm](https://typeorm.io) and [knex](http://knexjs.org/).

## Variables

The setup of the API is done using set of `.env` variables

| Name                 | Usage                               |                                                       Values                                                       |
| :------------------- | ----------------------------------- | :----------------------------------------------------------------------------------------------------------------: |
| CONNECTOR            | The connector provider              |                                 `dummy`, `typeorm` or `knex`, defaults to `dummy`                                  |
| HOST                 | The hostname of your application    |                                               defaults to `0.0.0.0`                                                |
| PORT                 | The port number of your application |                                                 defaults to `3000`                                                 |
| PLUGINS              | The list of plugins to load         |                                            comes with `logger,jwt-auth`                                            |
| ROUTES               | The list of api endpoints to load   |                                                defaults to `hello`                                                 |
| JWT_SECRET           | The secret key for JWT              |                                         defaults to `never-share-secrets`                                          |
| JWT_EXP              | The expiry of JWT token             |                                                  defaults to `1h`                                                  |
| ROUTE_PREFIX         | The prefix for api routes           |                                                   defaults to ``                                                   |
| CLIENT               | The type of your database client    |                                              defaults to `localhost`                                               |
| DB_HOST              | The username of your `database`     | see [typeORM](https://typeorm.io/#/undefined/creating-a-connection-to-the-database) and [knex](http://knexjs.org/) |
| DB_USER              | The hostname of your `database`     |                                               defaults to `postgres`                                               |
| DB_PASS              | The password of your `database`     |                                               defaults to `postgres`                                               |
| DB_NAME              | The name of your `database`         |                                                defaults to `apidb`                                                 |
| AUTH_CONTROLLER_PATH | The location of auth controller     |                                        defaults to `auth` (under api/auth)                                         |
| DATABASE_POOL_MIN    | The min pool for your `database`    |                                                  defaults to `0`                                                   |
| DATABASE_POOL_MAX    | The max pool for your `database`    |                                                  defaults to `10`                                                  |
| DATABASE_POOL_IDLE   | The pool idle for your `database`   |                                                defaults to `10000`                                                 |

## TODOs/Ideas

- add connector plugin loading
- implement more connector interfaces
- auto generate API documentation
- add API generation from `schema.json` file
