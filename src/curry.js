const R = require('ramda');

// approach 1
R.multiply(2, 3); // -> 6
R.multiply(2, 4); // -> 8
R.multiply(2, 5); // -> 10

console.log('#1:', R.multiply(2, 5));

// approach 2
R.multiply(2)(3); // -> 6
R.multiply(2)(4); // -> 8
R.multiply(2)(5); // -> 10

console.log('#2:', R.multiply(2)(5));

// approach 3
const double = R.multiply(2); // partially applied function

double(3); // -> 6
double(4); // -> 8
double(5); // -> 10

console.log('multiply: ', R.multiply);
console.log('double: ', R.multiply(2));
console.log('double: ', double(5));
