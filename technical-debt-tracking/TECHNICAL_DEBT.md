# Technical Debt

> _This file describes the categories of technical debt that can be found in this codebase._

## Documenting and Solving Technical Debts

1. Group similar technical debts into categories, see: [Categories](#categories)
2. Describe categories, see: [Category Descriptions](#category-descriptions)
3. Tag technical debts, see: [Tagging Code](#tagging-code)
4. Apply strategies, see: [Strategies](#strategies)

## Category Descriptions

Categories describe similar problems in the codebase.  
Each one must describe:

- the problem
- why is it a problem
- a recommended solution

Each one must have the following metadata:

- **Tag**: In the form of `// TODO: <tag-name>`. The tag is used to mark places in the code base, see: [Tagging Code](#tagging-code).
- **Impact**: It can be `low` or `high`. It defines how much the problem impacts the maintainability of the codebase.
- **Effort**: It can be `low` or `high`. It describes how hard it is to solve the given problem.

## Strategies

The following strategies can be applied for the different classifications of technical-debt categories.

| Effort/Impact | Low                                        | High                                        |
| ------------- | ------------------------------------------ | ------------------------------------------- |
| **High**      | **High** Effort <br/> **Low** Impact <br/> | **High** Effort <br/> **High** Impact <br/> |
| **Low**       | **Low** Effort <br/> **Low** Impact <br/>  | **Low** Effort <br/> **High** Impact <br/>  |

- **Low** Effort, **High** Impact: It should be **solved as soon as possible**. No planning should be required.
- **Low** Effort, **Low** Impact: "The Boy Scout Rule" should be used: leave it cleaner as you found it
- **High** Effort,  **High** Impact: A ticket should be created, discussed and **planned as soon as possible**.
- **High** Effort, **Low** Impact: It should be solved last.

<!-- TODO: Examples -->

> **Note**: Sometimes, it makes sense to solve multiple or all the technical debts in a category at once.  
> In this case, a ticket should be created and planned.

## Finding and Counting Technical-Debt

There are two scripts that makes finding and counting technical-debt easy:

- `yarn find-td [tag-name1] [tag-name2] [...]`  
  It prints the all file names and line numbers where the tag `// TODO:` is found.  
  Multiple optional tags can be provided to search for only those categories of technical-debt  
  **Example**: `yarn find-td no-test jsx` finds all tags with `// TODO: no-test` or `// TODO: jsx`
- `yarn count-td [tag-name1] [tag-name2] [...]`  
  It counts all tags `// TODO:`  
  Multiple optional tags can be provided to count only those categories of technical-debt  
  **Example**: `yarn count-td no-test jsx`: counts all tags with `// TODO: no-test` or `// TODO: jsx`

## Categories

> ⚠ **Warning:** The following category is an example

- **High Cyclomatic Complexity**  
  Functions with higher than 10 cyclomatic complexits are too complex.  
  They are hard to read, reason about and to understand, therefore error-prone.

  These functions should be split up into multiple ones.
  
  > **Info**: [↗ Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)

  ```text
  Tag:      TODO: class-comp
  Impact:   low
  Effort:   low
  ```

## Tagging Code

Use the [Categories'](#categories) `Tag`s to tag code lines, function, classes or whole files.

**Tagging code line**: place the comment before the code line to mark it

```js
// TODO: logging
console.log("Hello, World!")
```

**Tagging function**: place the comment before the function to mark the whole function

```js
// TODO: naming
function foo(){}
```

**Tagging Classes**: place the comment before the class to mark the whole class

```js
// TODO: naming
class Foo(){}
```

**Tagging File**: place the comment at the beginning of the file to mark the whole file

```js
// TODO: jsx

import { X } from "./x"
...
```
