# [Node](https://nodejs.org) + [TypeScript](https://www.typescriptlang.org/) + [Express](https://expressjs.com/) · ![In Progress](https://img.shields.io/badge/-In%20Progress-yellow)

## TL;DR

Use `make dev` to develop TDD/BDD style.  
Use `make run` to run the service in watch mode.  
Use `make build` to create production build.  

It is recommended to use `make dev` to develop.

## Project Structure

**Root structure:**

    node-typescript/
    ├─ doc/         // Documentation
    ├─ scripts/     // Scripts to help developers
    ├─ src/         // The source code
    └─ test/        // Test entrypoint and helpers

### Documentation (doc/)

The documentation contains a base set of ADRs.  
[More about on ADR](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)

Every other type of documentation should be here too.

### Scripts (scripts/)

All the scripts that help development can be found here.  
It is recommended to prefix the scripts with a type.  
For example, scripts used in the Makefile are prefixed with `make-` and  
npm/yarn scripts are prefixed with `scripts-`.

### Source code (src/)

The source code is where the project lives.  
About content see [Project Basics](#project_basics).

### Test (test/)

The project uses a single entry point for the tests (`test/test.ts`),
and a simple helper function for HTTP calls.
The tests, however, should be in the `src/` folder.

## Project Basics

    node-typescript/
    ├─ doc/
    ├─ scripts/
    ├─ src/
    │   ├─ common/
    │   │   ├─ log.ts
    │   │   └─ pretty.ts
    │   ├─ healthcheck/
    │   │   ├─ test/
    │   │   │   ├─ suites/
    │   │   │   │   └─ online.ts
    │   │   │   └─ index.ts
    │   │   └─ index.ts
    │   └─ server/
    │       ├─ index.ts
    │       └─ server.ts
    └─ test/

The first level of `src/` should make it clear what is the purpose of the project.

The `common` package contains functionality that is used overall in the project.  
Two basics are included. The `log.ts` to provide better logging than `console.log` and `pretty.ts` that makes printing data structure more human readable.

As it is usually a web server, a basic express server has been set up with a `helthcheck` endpoint. The is resource serves not just an example but a starting-point to provide information about the server, such as the current version of it.  
The entry point of the modules are always the `index.ts`.  
The `healthcheck/test` has also a starting-point just like the main `test/test.ts`. It includes all the test suites from `healthcheck/test/suites/…`

The `server/` contains everything to run the server. The express configuration is the `index.ts` and `server.ts` is starting the server. This way the test runner can also control a server.

## Makefile

The `Makefile` will be used by developers to execute different actions of the projects

| Action      | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| build       | Build production ready docker image                             |
| publish     | Publish the image to the repository                             |
| dev         | Start container for TDD/BDD development with file watcher       |
| dev-debug   | Just like `dev` but with debugger                               |
| run         | Start the container to run the service. Also with file watching |
| run-debug   | Just like `run` but in debug mode.                              |
| sh          | Start the container and step into its shell                     |
| tag-latest  | The the built image with `latest`                               |
| tag-version | Tag the built images with the version from the version file     |

## Versioning

As the project is meant to be a service and not as a library, the version in `package.json` is ignored. The single source of truth of version is in the `version` file.
The is read by the `healthcheck` endpoint and by the `make tag-version` command.
The project uses [Semantic Versioning](https://semver.org/) with a `v` prefix.
E.g.: `v1.0.0`
