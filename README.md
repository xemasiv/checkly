# checkly
Truthy, falsey &amp; equality checks simplified.

### Checker.js

* Waterfall checks for:
  * truthiness
  * falseyness
  * equality
* Perks
  * built-in argument iteration support for `.t()` and `.f()`
  * built-in pairwise iteration support for `.eq()` and `ineq`
  * uses fast-deep equal for `.eq()` and `ineq()`
  * `.can().be().chained()`
  * just call `.check()` at the end
  * Returns the result of function / promise once you call `check()`
* Comes with static checkers
  * (Check the test section below)

#### Sample 1:

Executes given functions
```
new Checker()
  .t(1, true)
  .f(0, false)
  .eq(1,1,1,1)
  .ineq(1,2)
  .pass(() => {
    console.log('pass');
  })
  .fail(() => {
  	console.log('fail');
  })
  .check();

// pass
```

#### Sample 2:

Returns a promise, makes it chainable with then.
```
new Checker()
  .t(1, true)
  .f(0, false)
  .eq(1,1,1)
  .ineq(1,2)
  .pass(() => Promise.resolve('pass'))
  .fail(() => Promise.reject('fail'))
  .check()
  .then(() => {
  	console.log('passed!');
  })
  .catch(() => {
  	console.error('failed!');
  });

// passed!
```

#### Static checkers 

* Checkers return `true` or `false`.
* Static because they can be accessed from Checkly itself.
  * i.e. `Checkly.str()`
  * or destructure it, `var { str } = Checkly;`
* Checkers list
  * `str(a)` - if it's a string
  * `num(a)` - if it's a number
  * `obj(a)` - if it's an object
  * `arr(a)` - if it's an array
  * `und(a)` - if it's undefined
  * `nul(a)` - if it's null
  * `equal(a, b)` - if both vars are equal, uses deep-equal
  
#### Test
  
```
let Checkly = require("./index.js");

const { obj, str, und, num, nul, arr, emp } = Checkly;

console.log("num on number", num(123));
console.log("num on string", num("1"));
console.log("num on array", num([]));
console.log("num on object", num({}));
console.log("num on undefined", num(undefined));
console.log("num on null", num(null));
console.log(" ");
console.log("str on string", str("asd"));
console.log("str on number", str(1));
console.log("str on array", str([]));
console.log("str on object", str({}));
console.log("str on undefined", str(undefined));
console.log("str on null", str(null));
console.log(" ");
console.log("und on undefined", und(undefined));
console.log("und on string", und("1"));
console.log("und on number", und(1));
console.log("und on array", und([]));
console.log("und on object", und({}));
console.log("und on null", und(null));
console.log(" ");
console.log("nul on null", nul(null));
console.log("nul on string", nul("1"));
console.log("nul on number", nul(1));
console.log("nul on array", nul([]));
console.log("nul on object", nul({}));
console.log("nul on undefined", nul(undefined));
console.log(" ");
console.log("obj on object", obj({}));
console.log("obj on string", obj("1"));
console.log("obj on number", obj(1));
console.log("obj on array", obj([]));
console.log("obj on undefined", obj(undefined));
console.log("obj on null", obj(null));
console.log(" ");
console.log("arr on array", arr([]));
console.log("arr on string", arr("1"));
console.log("arr on number", arr(1));
console.log("arr on object", arr({}));
console.log("arr on undefined", arr(undefined));
console.log("arr on null", arr(null));
console.log(" ");
console.log("emp on empty array", emp([]));
console.log("emp on empty object", emp({}));
console.log("emp on empty string", emp(""));
console.log("emp on non-empty array", emp([1]));
console.log("emp on non-empty object", emp({ a: 1 }));
console.log("emp on non-empty string", emp("1"));
console.log("emp on non-object/non-array/non-string", emp(0));
console.log(" ");

const { ts, ti, tf } = Checkly;

console.log("ts on number:", ts(123));
console.log("ts on object:", ts({ a: 1 }));
console.log("ts on array:", ts([1]));
console.log("tf on string:", tf("213213.3234"));
console.log("ti on string:", ti("213213.3234"));
```

#### Result

```
pass
num on number true
num on string false
num on array false
num on object false
num on undefined false
num on null false

str on string true
str on number false
str on array false
str on object false
str on undefined false
str on null false

und on undefined true
und on string false
und on number false
und on array false
und on object false
und on null false

nul on null true
nul on string false
nul on number false
nul on array false
nul on object false
nul on undefined false

obj on object true
obj on string false
obj on number false
obj on array false
obj on undefined false
obj on null true

arr on array true
arr on string false
arr on number false
arr on object false
arr on undefined false
arr on null false

emp on empty array true
emp on empty object true
emp on empty string true
emp on non-empty array false
emp on non-empty object false
emp on non-empty string false
emp on non-object/non-array/non-string undefined

ts on number: 123
ts on object: [object Object]
ts on array: 1
tf on string: 213213.3234
ti on string: 213213
```