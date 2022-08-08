const R = require('ramda');

R.divide(2, 4) // -> 0.5

console.log('divide: ', R.divide(2, 4));

const half = R.divide(R.__, 2);
half(3) // -> 1.5
half(4) // -> 2
half(5) // -> 2.5

console.log('half: ', half(4));
