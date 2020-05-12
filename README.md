# 🧰 Starter Kits

- [🧰 Starter Kits](#%f0%9f%a7%b0-starter-kits)
  - [Kits](#kits)
    - [Back End](#back-end)
    - [Front End](#front-end)
    - [Project Structure](#project-structure)
  - [How to Install](#how-to-install)
  - [How to Use](#how-to-use)

Starter Kits provides _ready-to-go_ project scaffolding
for multiple technology combinations

> 🗒  **Note:** Requirements of a Starter Kit: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Kits

### Back End

- [Node + Express + TypeScript](./node-typescript) (NET)  
  Good for all sort of BE services
- [Go](./go) (GO)  
  Good for all sort of BE services
  
### Front End

- [React + Storybook+ TypeScript](./react-storybook-typescript) (RST)  
  Good for UI-Libs and Apps

### Project Structure

- [Micro-Services in Polyrepo](./microservices-polyrepo)
  
## How to Install

- **The easy way**  
  We'll use `degit` (↗ [npm](https://www.npmjs.com/package/degit),
  ↗ [github](https://github.com/Rich-Harris/degit)) to download only sub-folders

  1. choose one of the kits
  2. `npx degit sprinteins/starter-kits/<kit-folder> <target-folder>`

- **The simple way**

  1. clone the repo: `git clone git@github.com:sprinteins/starter-kits.git starter-kits`
  2. choose one of the kits
  3. copy one of the kits: `cp -R <starter-kit> <target-folder>`

## How to Use

All the starter kits use the same makefile structure:

<dl>
  <dt>make dev</dt>
    <dd>Starts a TDD style container (unit tests + file watcher)</dd>
  <dt>make run</dt>
    <dd>Starts the service with a file watcher</dd>
  <dt>make build</dt>
    <dd>Builds the production docker image</dd>
  <dt>make test</dt>
    <dd>Runs the unit tests in CI mode (no file watcher)</dd>
  <dt>make exec</dt>
    <dd>
      Starts only the development container and enters its shell.<br/>
      Similar to "docker exec".
    </dd>
</dl>

----

Brought to you by

[![SprintEins](./_assets/sprinteins_logo_black_s.png)](https://www.sprinteins.com)  
[https://www.sprinteins.com](https://www.sprinteins.com)
