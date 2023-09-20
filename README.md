# Conway's Game of Life
[![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://chrlee.github.io/Vanilla-JS-Life/)

[![pages-build-deployment](https://github.com/chrlee/Vanilla-JS-Life/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/chrlee/Vanilla-JS-Life/actions/workflows/pages/pages-build-deployment)

### Implemented with HTML5 Canvas and Vanilla JS

This is a simple implementation of Conway's Game of Life. This repository is mostly written as javascript practice and is deployed to github pages using the link above.

## How to Play

(Re)Load the page to create a new center-weighted randomly generated seed. 

Press any key to pause/play the game at any time and see the state of the game at the current frame. Green pixels represent newly reproduced cells while red pixels represent cells slated to die on the next frame.

Click anywhere on the site to add a new pixel and influence the state of the game.

## Implementation Rules
*From Wikipedia: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life*

> The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
> 
> 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
> 1. Any live cell with two or three live neighbours lives on to the next generation.
> 1. Any live cell with more than three live neighbours dies, as if by overpopulation.
> 1. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
> 
> These rules, which compare the behaviour of the automaton to real life, can be condensed into the following:
> 
> 1. Any live cell with two or three live neighbours survives.
> 1. Any dead cell with three live neighbours becomes a live cell.
> 1. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
> 
> The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.[nb 1] Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.