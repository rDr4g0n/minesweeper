# Minesweeper

## Installation

It assumes you have the latest node and yarn installed.

```
yarn install
yarn dev
open http://localhost:3000
```

## Rules

The rules are pretty simple (try to play with the [demo](https://sweeper.now.sh/)):

* Player can left click to reveal square.
* Player can right click to flag square as mine.
* The number tells how many mines are in the immediate neighborhood.
* The goal is to reveal or flag all squares without revealing a mine.

## TODO

* tile hover transition
* tile reveal transition
* bomb asplode transition
* bigger number = brighter color?
* use fela to properly share style/theme vars
* figure out the react way to do hover, css transitions, etc
