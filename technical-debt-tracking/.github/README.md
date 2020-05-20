# Technical Debt Tracking Kit

![Wrok In Progress](https://img.shields.io/badge/-Work%20In%20Progress-yellow)
![](https://img.shields.io/badge/TRACK-🧪%20EXPERIMENT-blueviolet)

The Technical-Debt Tracking Kit is a language- and technology agnostic way
of tracking and manage technical-debt in our codebases.

Every project has intentional and unintentional technical debts. These debts must be payed back at some point or the project cannot move forward anymore.

To pay back debt, first, one needs to identify it, than track it and lastly, it has to be solved.

This starter kit has been designed to be as simple as possible. This is important because it must be usable in different projects with different tech stacks.

## Structure

- Technical Debt Tracking kit has only one required file: [TECHNICAL_DEBT.md](./../TECHNICAL_DEBT.md). It containes the description and the how-to.

- There are helpers bash scripts but they are optional as the functionality they provide may not be necessary for every project:
  - [scripts/count-td.sh](./../scripts/count-td.sh)
  - [scripts/find-td.sh](./../scripts/find-td.sh)

## Customization

The tag for tracking can be anything, but by default we use `TODO:` as most of the code editors already provide featuers for tracking them.
