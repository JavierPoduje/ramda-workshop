const R = require("ramda");

const magnus = { name: "Magnus Carlsen", age: 31, elo: 2864 };
const chessPlayersByCountry = [
  {
    name: "Noruega",
    continent: "Europe",
    players: [
      { name: "Magnus Carlsen", age: 31, elo: 2864 },
      { name: "Aryan Tari", age: 23, elo: 2672 },
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

const name = R.lensProp("name");
const age = R.lensProp("age");

console.log("name: ", R.view(name, magnus));
console.log("set age: ", R.set(age, 32, magnus));
console.log("over age: ", R.over(age, R.add(1), magnus));

const first = R.lensIndex(0);
const firstCountry = R.compose(first, name);

console.log(
  "first country through compose: ",
  R.view(firstCountry, chessPlayersByCountry)
);
console.log(
  "first country though lensPath: ",
  R.view(R.lensPath([0, "name"]), chessPlayersByCountry)
);
console.log(
  "set second chilean player elo: ",
  R.set(R.lensPath([1, "players", 1, "elo"]), 2577, chessPlayersByCountry)[1]
    .players
);
console.log("original chess players by country: ", chessPlayersByCountry[1].players);
