# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)
## Pattern matching in JS

```javascript
import { match } from 'egna'
```

**In promises**
```javascript
fetch('/taco')
    .then(
        match(
            { sauce: 'mild' }, askForSpicierTaco,

            { sauce: 'extra hot' }, ({ id }) => addSourCream(id),

            (taco) => catchEveryTaco(taco)
    ))
```

**Can match with any data type**
```javascript
match(
    'pattern', handlerFunc,

    {another: 'pattern'}, anotherHandlerFunc,

    _ => 'Single function at the end is the catch-all case'
)
// match() returns a function that you call with the value you want to be matched.
```

## Matchlet functions

A function anywhere in a pattern will be evaluated in place of the usual comparison, returning true/false.

Some useful matchlet-generators included in egna:

| Name       | Matches                                                 |
|------------|---------------------------------------------------------|
| `gt`       | Greater than `arg`                                        |
| `lt`       | Less than `arg`                                           |
| `op`       | Optional, value exists in the argument     array.  |

```javascript
match(
    {car: { year: lt(1970) }}, () => 'Thats vintage!',

    {car: { year: lt(1999) }}, () => 'Thats a classic',

    _ => 'Too modern'
)
```

**Use egna's matchlets**
```javascript
import { match, gt, lt, op } from 'egna'

match(
    gt(10), () => 'greater than 10',

    lt(5), () => 'less than 5',

    op([6, 7]), () => 'either 6 or 7',

    _ => 'something else'
)
```

**or make your own**

```javascript
const even = n => n % 2 == 0;

match(
    even, () => 'even number',
    _ => 'odd number'
)(34)

// returns 'even number'
```

## More examples

**Map with deep object matching**
```javascript
let weather = [
    { city: 'London', weather: { code: '123', name: 'Cloudy' } },
    { city: 'Bergen', weather: { code: '234', name: 'Rainy' } }
];

weather.map(match(
    { weather: { name: 'Rainy' } }, ({ city }) => 'Bring an umbrella to ' + city,
    { weather: { name: 'Sunny' } }, ({ city }) => 'Bring sunglasses to ' + city,
    ({ city }) => 'Nothing to bring in ' + city
));

// Outputs:
// [ 'Nothing to bring in London', 'Bring an umbrella to Bergen' ]
```