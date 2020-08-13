# A Typescript API Project

This project was setup with [aarepuu/ts-api-base](https://github.com/ts-api-base), which sets up [Hapi](https://hapi.dev/) server, inspired by [dwyl/hapi-typescript-example](https://github.com/dwyl/hapi-typescript-example), with useful plugins with choice of connector interfaces and other useful Typescript tools.

## Template Features

**Dev/Build Features**

- Multi-stage docker build to install, test and deploy
- Testing setup with `jest`, `ts-jest`
- Linting setup with `tsc`
- Auto load `.env` files with `dotenv`

**API Features**

- Uses `.env` file to specify connector providers
- Uses `.env` file to load hapi plugins
- TypeORM and Knex connector providers

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

# Usage/Extending

Add your own API endpoints based on the [api/hello](api/hello) example according to the connector of choice. See more about implementation of [typeorm](https://typeorm.io) and [knex](http://knexjs.org/).

## TODOs/Ideas

- add connector plugin loading
- implement more connector interfaces
- auto generate API documentation
- add API generation from `schema file`
- add authentication with JWT
