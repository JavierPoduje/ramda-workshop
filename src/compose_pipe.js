const R = require("ramda");

const instructorSessions = [
  { id: 1, hours: 2, isOnline: true, classroom: "Online" },
  { id: 2, hours: 1, isOnline: false, classroom: "A-112" },
  { id: 3, hours: 1, isOnline: true, classroom: "Online" },
  { id: 4, hours: 4, isOnline: true, classroom: "Online" },
  { id: 5, hours: 2, isOnline: false, classroom: "A-113" },
  { id: 6, hours: 6, isOnline: true, classroom: "Online" },
];

// Tenemos una lista sesiones de un profesor:
// queremos sumar la cantidad de horas que imparte sumando las horas de todas
// sus sesiones online

// approach 1
const myFunc = (instructorSessions) => {
  // declaramos la variable donde almacenaremos nuestra suma de horas
  let hours = 0;
  // iteramos por las sesiones de los profes
  for (let i = 0; i < instructorSessions.length; i++) {
    // filtramos las sesiones online
    if (instructorSessions[i].isOnline) {
      // sumamos la hora de la sesión a la suma de todas las sesiones
      hours += instructorSessions[i].hours;
    }
  }
  return hours;
}

// approach 2
const myFunc2 = (instructorSessions) => {
  // filtramos las sesiones online
  const onlineSessions = instructorSessions.filter(session => session.isOnline);
  // obtenemos las horas
  const hoursOfOnlineSessions = onlineSessions.map(session => session.hours);
  // sumamos las horas
  const sumOfHours = hoursOfOnlineSessions.reduce((sum, hour) => {
    return sum + hour;
  }, 0);

  return sumOfHours;
}

// approach 3
const myFunc3 = (instructorSessions) => {
  const sumOfHours = R.pipe(
    // filtramos las sesiones online
    R.filter(session => session.isOnline),
    // obtenemos las horas
    R.map(session => session.hours),
    // sumamos las horas
    R.reduce((sum, hour) => sum + hour, 0),
  )(instructorSessions);

  return sumOfHours;
}

console.log('prop function:', R.prop('id', { id: 5, hola: 'chao' }));
console.log('filter function:', R.filter(n => n >= 2, [1, 2, 3, 4]));
console.log('reduce function:', R.reduce((acc, num) => acc * num, 1, [1, 2, 3, 4]));

// approach 4
const myFunc4 = (instructorSessions) => {
  const sumOfHours = R.pipe(
    R.filter(R.prop('isOnline')),
    R.map(R.prop('hours')),
    R.reduce(R.add, 0),
  )(instructorSessions);

  return sumOfHours;
}

// approach 5
const myFunc5 = R.pipe(
  R.filter(R.prop('isOnline')),
  R.map(R.prop('hours')),
  R.reduce(R.add, 0),
);

// compose funciona igual que pipe, excepto que la lectura de las funciones es inversa
const withCompose = R.compose(
  R.reduce(R.add, 0),
  R.map(R.prop('hours')),
  R.filter(R.prop('isOnline')),
);

console.log('approach declarativo: ', myFunc(instructorSessions));
console.log('approach imperativo #1: ', myFunc2(instructorSessions));
console.log('approach imperativo #2: ', myFunc3(instructorSessions));
console.log('approach imperativo #3: ', myFunc4(instructorSessions));
console.log('approach imperativo #4: ', myFunc5(instructorSessions));
console.log('approach with compose: ', withCompose(instructorSessions));
