const R = require("ramda");

const chessPlayersByCountry = [
  {
    name: "Noruega",
    continent: "Europe",
    players: [
      { name: "Magnus Carlsen", age: 31, elo: 2864 },
      { name: "Jon Ludvig", age: 32, elo: 2639 },
    ],
  },
  {
    name: "Chile",
    continent: "America",
    players: [
      { name: "Cristóbal Henriquez", age: 26, elo: 2620 },
      { name: "Pablo Salinas", age: 28, elo: 2526 },
    ],
  },
  {
    name: "USA",
    continent: "America",
    players: [
      { name: "Hikaru Nakamura", age: 34, elo: 2768 },
      { name: "Fabiano Caruana", age: 30, elo: 2776 },
    ],
  },
];

// view -> get
// obtiene un valor y lo muestra

// set -> setter
// setea un valor y retorna el objeto completo

// over -> setter
// setea un valor a través de una función y retorna el objeto completo

// LENSES
// 1. lensIndex
// 2. lensProp
// 2. lensPath
