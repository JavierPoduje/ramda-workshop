# Ramda presentation

## Intro

## Programación funcional

### Qué es?

"""
Paradigma donde los programas son contruidas a través de `aplicar` y `componer` funciones.
"""

"""
Estilo que enfatiza la evaluación de expresiones en lugar de la ejecución de comandos.
"""

Evité mencionar el concepto de "programación funcional" mientras hacía esta presentación, pero no pude dejar de introducirlo porque esta disyuntiva de `declarativo - imperativo` apareció con frecuencia mientras buscaba información que comparara las dos librerías de las que hablaremos hoy: (pasar a la siguiente diapo)

## Comparación entre ramda y lodash

### Intro

Ambas son librerías funcionales, sin embargo tienen enfoques distintos. Buscan satisfacer diferentes necesidades:

### Lodash

Se enfoca en _flexibilidad y performance_, como dijo su creador:

"""
proveer métodos utilitarios de calidad para la mayor cantidad de devs posibles con un enfoque en consistencia, compatibilidad, customización y performance.
"""

### Ramda

- Menos enfoque en la performance, más en APIs simples y limpias.
- Las funciones hacen solo una cosa.
- Simplifica la **composición de funciones**, mantiene la inmutabilidad de los datos y evita side-effects.

### Diferencias clave

- `data` en los argumentos de las funciones:
    - lodash: toma la `data` 1ro.
    - ramda: toma la `data` al final, simplificando el uso de `pipe` o `compose`.
- `curry` (esto va a ser algo que vamos a ver qué significa más adelante):
    - lodash: tiene una función curry que debe ser utilizada de manera explítica.
    - ramda: todas las funciones son curried por defecto.
- `equality`:
    - lodash: se enfoca en `reference-equality`.
    - ramda: se enfoce en `value-equality`.
    - Ejemplo:
        - Mientras estas dos funciones se comportan igual:
        ```javascript
        // lodash
        _.union ([1, 2, 3, 4, 5], [2, 3, 5, 7, 11]) //=> [1, 2, 3, 4, 5, 7, 11]
        _.intersection ([1, 2, 3, 4, 5], [2, 3, 5, 7, 11]) //=> [2, 3, 5]

        // Ramda
        R.union ([1, 2, 3, 4, 5], [2, 3, 5, 7, 11]) //=> [1, 2, 3, 4, 5, 7, 11]
        R.intersection ([1, 2, 3, 4, 5], [2, 3, 5, 7, 11]) //=> [2, 3, 5]
        ```

        - Estas dos retornan resultados distintos:
        ```javascript
        // lodash
        _.union (
          [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}],
          [{x: 2}, {x: 3}, {x: 5}, {x: 7}, {x: 11}]
        )
        //=> [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}, {x: 2}, {x: 3}, {x: 5}, {x: 7}, {x: 11}]
        _.intersection (
          [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}],
          [{x: 2}, {x: 3}, {x: 5}, {x: 7}, {x: 11}]
        ) //=> []

        // Ramda
        R.union (
          [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}],
          [{x: 2}, {x: 3}, {x: 5}, {x: 7}, {x: 11}]
        )
        //=> [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}, {x: 7}, {x: 11}]
        R.intersection (
          [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}],
          [{x: 2}, {x: 3}, {x: 5}, {x: 7}, {x: 11}]
        ) //=> [x: 2}, {x: 3}, {x: 5}]
        ```

        El diseño de ramda está más alineado con sistemas funcionales pero tiene un costo en performance cuando se trata de realizar comparaciones. Lodash es 2 veces más rápido que ramda en este tipo de operaciones (en lodash, el comportamiento "by value" se obtiene con `unionBy` e `intersectionBy`).
- `composición`:
    - lodash: diseñado para trabajar con código imperativo
    - ramda: diseñado para trabajar con código declarativo.
    - Ejemplo:
        - Composición en lodash:
        ```javascript
        const myFn = (x, y) => {
          const var1 = _.fn1 (x, y)
          const var2 = _.fn2 (var1, 'arg1', 'arg2')
          const var3 = _.fn3 (var2, 'arg3')
          return _.fn4 (var3)
        }
        ```
        - Composición en ramda (luego hablaremos de la composición de funciones):
        ```javascript
        const myFn = R.pipe (
          R.fn1,
          R.fn2 ('arg1', 'arg2'),
          R.fn3 ('arg3'),
          R.fn4
        )
        ```
- enfoque en general:
    - lodash: Se concentra en proveer muuuchas funciones bien optimizadas para tareas específicas.
    - ramda: Se concentra en proveer pocas funciones extensibles a través de la composición con otras funciones.
    - Ejemplo:
        - lodash provee todas estas funciones:
        ```txt
        isArguments, isArray, isArrayBuffer, isArrayLike, isArrayLikeObject, isBoolean, isBuffer, isDate, isElement, isEqual, isEqualWith, isError, isFinite, isFunction, isInteger, isLength, isMap, isMatch, isMatchWith, isNaN, isNative, isNull, isNumber, isObject, isObjectLike, isPlainObject, isRegExp, isSafeInteger, isSet, isString, isSymbol, isTypedArray, isUndefined, isWeakMap, isWeakSet
        ```
        - ramda permite obtener esas funciones a través de la composición de las siguientes funciones:
        ```txt
        is, isEmpty, isNil
        ```
        ejemplo:
        ```javascript
        R.is (Array, [1, 2, 3]);
        ```

### fuentes

- https://stackoverflow.com/questions/71401443/differences-between-lodash-and-ramda

## Conceptos básicos

### Curry

Como mencioné antes, todas las funciones en ramda tienen la propiedad `curry` pero, qué es esto? Curry es la transformación de una función con múltiples argumentos en una secuencia de funciones en donde cada una recive un argumento.

Qué implica esto? pensemos en la función `multiply`, que recive 2 argumentos que usará para realizar una multiplicación. por ejemplo:

```javascript
R.multiply(2, 3); // -> 6
R.multiply(2, 4); // -> 8
R.multiply(2, 5); // -> 10
```

Ahora, podemos obtener los mismos resultados de la siguiente manera:

```javascript
R.multiply(2)(3); // -> 6
R.multiply(2)(4); // -> 8
R.multiply(2)(5); // -> 10
```

Esto significa que `multiply` puede recibir 1 o 2 argumentos:
  - si recibe 2 argumentos, la función `multiply` se ejecuta y retorna el resultado de la multiplicación.
  - si recibe un argumento, la función `multiply` es **parcialmente aplicada** y retorna una función que retorna un argumento, cuyo input se multiplica por 2.

Entonces, otra manera de obtener el mismo resultado es este:

```javascript
const double = R.multiply(2); // partially applied function

double(3); // -> 6
double(4); // -> 8
double(5); // -> 10
```

La función double entonces, es una función que recibe un argumento y multiplica por 2 ese valor.

### Placeholder

Ahora, en el caso de la función `multiply` el orden de los factores no altera el producto. Un caso distinto es la función `divide`, donde el primer valor es dividido por el 2do. La función `divide(a, b)` es equivalente a `a / b`. Cómo podríamos entonces crear una función `half`, que divida nuestro argumento por dos? Si hacemos algo como lo que hicimos antes:

```javascript
R.divide(2, 4) // -> 0.5
```

El resultado no sería 2, sino 0.5, porque no estamos haciendo `4 / 2` sino `2 / 4`. Lo que queremos entregar el 1er parámetro posteriormente. Eso lo podemos lograr usando la función `placeholder` de ramda, que nos permite decir `este parámetro` te lo entregaré después:

```javascript
const half = R.divide(R.__, 2);

half(3) // -> 1.5
half(4) // -> 2
half(5) // -> 2.5
```

### Compose, Pipe

Las funciones `compose` y `pipe` nos permite anidar funciones, pasándole el resultado de la función que se ejecutó anteriormente a la siguiente función. Entonces, en el siguiente ejemplo tenemos una lista sesiones de un profesor que queremos sumar la cantidad de horas que imparte sumando las horas de todas sus sesiones online:

```javascript
const instructorSessions = [
  { id: 1, hours: 2, isOnline: true,  classroom: 'Online', ... },
  { id: 2, hours: 1, isOnline: false, classroom: 'A-112', ... },
  { id: 3, hours: 1, isOnline: true,  classroom: 'Online', ... },
  { id: 4, hours: 4, isOnline: true,  classroom: 'Online', ... },
  { id: 5, hours: 2, isOnline: false, classroom: 'A-113', ... },
  { id: 6, hours: 6, isOnline: true,  classroom: 'Online', ... },
];
```

La 1ra opción que tenemos es hacerlo de la manera clásica, la manera imperativa.

```javascript
const myFunc = (instructorSessions) => {
  // declaramos la variable donde almacenaremos nuestra suma de horas
  const hours = 0;
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
```

En el 1er caso está todo un poco mezclado, las consideraciones 1) obtener las horas, 2) filtrar las sesiones online y 3) sumar las horas se encuentran entrelazadas. Podemos mejorar un poco la legibilidad separando estas lógicas:

```javascript
const myFunc = (instructorSessions) => {
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
```

Ahora, notemos que en cada paso estamos obteniendo un resultado y pasándoselo a la siguiente función para realizar el siguiente cálculo. Este ejemplo entonces es una buena oportunidad para usar la función `pipe`, que comple justamente ese objetivo. Podemos aprovecharnos del hecho de que cada función recibe la data como el último parámetro y que todas las funciones son aplicadas parcialmente, es decir, tienen la propiedad `curry`:

```javascript
const myFunc = (instructorSessions) => {
  const sumOfHours = R.pipe(
    // filtramos las sesiones online
    R.filter(session => session.isOnline),
    // obtenemos las horas
    R.map(session => session.hour),
    // sumamos las horas
    R.reduce((sum, hour) => sum + hour, 0),
  )(instructorSessions);

  return sumOfHours;
}
```

Podemos hacer lo mismo de manera aun más idiomática usando más funciones de ramda. Usaremos 3 adicionales:

- `filter`: Filterable f => (a → Boolean) → f a → f a
  1) recibe una función que recibe un objeto `a` y retorna un booleano y 2) un lista de objetos `a`. 3) Retorna una lista de objetos `a`.
- `prop`:   Idx → {s: a} → a | Undefined
  1) recibe una key y 2) un objeto y 3) retorna el `value` de la `key` en el objeto o `Undefined`, si la key no existiera.
- `reduce`: ((a, b) → a) → a → [b] → a
  1) recibe una función que recibe un `a` y un `b`, 2) un valor inicial de `a`, que será nuestra accumulator como le suelen decir y 3) retorna un objeto `a`.

```javascript
const myFunc = (instructorSessions) => {
  const sumOfHours = R.pipe(
    R.filter(R.prop('isOnline')),
    R.map(R.prop('hour')),
    R.reduce(R.add),
  )(instructorSessions);

  return sumOfHours;
}
```

Y lo podemos hacer aún más idiomático haciendo que esta función sea `point free`, que significa básicamente que no mencionamos el input explícitamente:

```javascript
const myFunc = R.pipe(
  R.filter(R.prop('isOnline')),
  R.map(R.prop('hour')),
  R.reduce(R.add),
);
```

Notese que ambas funciones, la 1ra y la última, tienen la misma complejidad Big O(n). En ese sentido no estamos perdiendo performance a cambio de hacer nuestra función más legible.

## Concepto avanzado

Hagamos una demo de un concepto un poco más avanzado, los `geters` y `seters` funcionales llamados `Lenses`.

### Lenses

## Conclusión

