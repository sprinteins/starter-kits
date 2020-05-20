# [React](https://reactjs.org/) + [Storybook](https://storybook.js.org/) + [TypeScript](https://www.typescriptlang.org/)

![Beta](https://img.shields.io/badge/-Beta-blue)

The setup provides the common components and stylings to the front end apps
in the project

## Install

```sh
npx degit sprinteins/starter-kits/react-storybook-typescript <target-folder>
```

## Best Suited for

- Standalone UI Library
- SPA with integrated UI Library

## Quick Start

- `make run`: starts storybook
- `make dev`: starts development in TDD mode
- `make build`: builds the lib
- `make exec`: starts the development container and enter its shell

## How to Build

### With only Docker

1. Install [Docker](https://www.docker.com/)
2. Execute the make: `make build-lib`  
  It will build into the `/dist` folder

### With Node

## How to Develop

Developing the UI-Lib requires [Docker](https://www.docker.com/) and any editor.  
_Recommended: [VSCode](https://code.visualstudio.com/)_

**`make dev`** launches Chromium (asks you to install it if you don't have it),
starts the tests and watches the files for changes.

**`make run`** starts the storybook and watches for file changes.  
It is reachable at [http://localhost:9000](http://localhost:9000)

## Alternative Building and Developing

Using Docker streamlines both process.  
However, if necessary we develop and build the project without Docker:

- to develop: `yarn install && yarn tdd`
- to run: `yarn install && yarn start`
- to build storybook: `yarn install && yarn build`
- to build the lib: `yarn install --prod && yarn build-lib`

## Component File Structure

```txt
src/
└─ components/
   └─ <components>/
      ├─ index.ts
      ├─ <components>.tsx
      ├─ <sub-components>.tsx
      ├─ <components>.stories.tsx
      ├─ <components>.spec.stories.tsx
      └─ <components>.spec.ts
```

Components are located in `/src/components` folder.  
Each component has a folder with the name of the component (e.g.: `button/`)

In this folder there are required files:

- `<component.jsx>` is where the component lives (e.g.: `button.tsx`)  
  >⚠ If the component gets too big, split it up into sub-components: `<sub-component>.tsx`

  ✏️ Example: [button.tsx](./src/components/button/button.tsx)

  ```tsx
  import * as React from 'react'

  export function Button(props: React.PropsWithChildren<Props>) {

      const {
          onClick = noopOnClick,
          children,
      } = props;

      return (
          <button
              access-id="button"
              onClick={onClick} >
              {children}
          </button>
      )
  }

  interface Props {
      onClick?: () => void
  }

  function noopOnClick() { }
  ```

- `index.ts`: we think of the folder as a package and `index.ts` exports everything
  that is meant for public usage.  
  ✏️ Example: [index.ts](./src/components/button/index.ts)

  ```js
  export { default as Button } from './button'
  ```

- `<component>.stories.tsx` creates style guide stories for the component.
  Style guide stories demonstrate, among other thins, the different visual appearances.  
  ✏️ Example: [button.stories.tsx](./src/components/button/button.stories.tsx)

  ```tsx
  import * as React from 'react';
  import { Button } from "./button"

  export default {
      component: Button,
      title: 'Components|Button',
  };

  export const text = () => <Button>Hello, Button!</Button>;

  ```

- `<component>.spec.stories.tsx` contain the stories that setup components for the tests
  > ⚠ Why not `<component>.stories.spec.tsx`?  
  > Everything ending with `*.spec` are considered to be tests and would be confusing for developers  
  > See `<component>.spec.ts`

  ✏️ Example: [button.spec.stories.tsx](./src/components/button/button.spec.stories.tsx)
  
  ```jsx
  import * as React from 'react';
  import { Button } from "./button"

  export default {
      component: Button,
      title: 'Components|Button/Test',
  };

  export const TestOnClick = () => {

      const [text, setText] = React.useState("not clicked")

      return (
          <div>
              <Button
                  onClick={() => setText("clicked")}
              >
                  Click to set text 1
                  </Button>
              <div access-id="text-target">{text}</div>
          </div>
      )
  }
  ```

- `<component>.spec.ts` contains the component tests  
  In case the spec gets too large on can split up and prefix specs e.g.:
  - `<component>.awesomeFeature.spec.tsx`
  - `<component>.nastyBugs.spec.tsx`
  - `<component>.crazyEdgeCases.spec.tsx`

  ✏️ Example: [button.spec.tsx](./src/components/button/button.spec.ts)

  ```ts
  import { describe, it } from 'mocha'
  import { expect } from 'chai'
  import { startBrowser, baseUrl } from 'testing'

  describe("Button", () => {
      describe('click action', () => {
          const clickTests: TestCase[] = [
              {
                  desc: 'has effect',
                  expectedText: 'clicked'
              },

          ]

          clickTests.forEach(testClick)

          function testClick(tc: TestCase) {
              it(tc.desc, async () => {
                  const buttonSelector = 'button[access-id="button"]'
                  const textSelector = '[access-id="text-target"]'

                  const b = await startBrowser(0)
                  await b.open(`${baseUrl}/iframe.html?id=components-button--test-on-click`)
                  await b.click(buttonSelector)

                  const text = await b.fetchText(textSelector)
                  expect(text).to.be.equal(tc.expectedText)
              })
          }

          interface TestCase {
              desc: string,
              expectedText: string,
          }

      })
  })

  ```
