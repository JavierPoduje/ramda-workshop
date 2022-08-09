const R = require("ramda");

const instructorSessions = [
  { id: 1, hours: 2, isOnline: true, classroom: "Online" },
  { id: 2, hours: 1, isOnline: false, classroom: "A-112" },
  { id: 3, hours: 1, isOnline: true, classroom: "Online" },
  { id: 4, hours: 4, isOnline: true, classroom: "Online" },
  { id: 5, hours: 2, isOnline: false, classroom: "A-113" },
  { id: 6, hours: 6, isOnline: true, classroom: "Online" },
];

// Objetivo: sumar la cantidad de horas que imparte un profe en sus sesiones online

// approach 1: imperativa
const imperative = (instructorSessions) => {
  let hours = 0;
  for (let i = 0; i < instructorSessions.length; i++) {
    const session = instructorSessions[i];
    if (session.isOnline) {
      hours += session.hours;
    }
  }
  return hours;
}

// approach 2: imperativa 2
const imperative2 = (instructorSessions) => {
  const onlineSessions = instructorSessions.filter(session => session.isOnline);
  const hoursOfOnlineSessions = onlineSessions.map(session => session.hours);
  const sumOfHours = hoursOfOnlineSessions.reduce((sum, hour) => sum + hour, 0)
  return sumOfHours;
}

// approach 3: imperative 2 con funciones ramda
const imperativeWithRamda = (instructorSessions) => {
  const onlineSessions = R.filter(session => session.isOnline, instructorSessions);
  const hoursOfOnlineSessions = R.map(session => session.hours, onlineSessions);
  const sumOfHours = R.reduce((sum, hour) => sum + hour, 0, hoursOfOnlineSessions);
  return sumOfHours;
};

// approach 4: functional
const functional1 = (instructorSessions) => {
  const sumOfHours = R.pipe(
    R.filter(session => session.isOnline),
    R.map(session => session.hours),
    R.reduce((sum, hour) => sum + hour, 0),
  )(instructorSessions);

  return sumOfHours;
}

// approach 5: functional 2
const functional2 = (instructorSessions) => {
  const sumOfHours = R.pipe(
    R.filter(R.prop('isOnline')),
    R.map(R.prop('hours')),
    R.reduce(R.add, 0),
  )(instructorSessions);

  return sumOfHours;
}

// approach 6: functional 3 -> point free
const functional3 = R.pipe(
  R.filter(R.prop('isOnline')),
  R.map(R.prop('hours')),
  R.reduce(R.add, 0),
);

console.log('imperative result: ', imperative(instructorSessions));
console.log('imperative 2 result: ', imperative2(instructorSessions));
console.log('imperative with ramda: ', imperativeWithRamda(instructorSessions));
console.log('funtional 1: ', functional1(instructorSessions));
console.log('funtional 2: ', functional2(instructorSessions));
console.log('funtional 3: ', functional3(instructorSessions));

