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

* do more things the react way
* design/layout
    * new game control
    * board size control
    * game timer, mine count
    * win scenario
    * lose scenario
* tests
* minecraft theme (ha!)
    * creepers for mines?
    * board is made of dirt blocks/grass
    * underneath is stone blocks
* focus the mine which asplode the game
* transitions when square state changes

