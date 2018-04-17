# Checkly

![checkly](https://i.imgur.com/29tOS0o.png)

Truthy, falsey &amp; equality checks simplified.

* Checks for:
  * truthiness
  * falseyness
  * equality
* Perks
  * built-in argument iteration support for `.t()` and `.f()`
  * built-in pairwise iteration support for `.eq()` and `ineq`
  * uses fast-deep equal for `.eq()` and `ineq()`
  * `.can().be().chained()`
  * just call `.check()` at the end
  * Returns the `.pass()` or `.fail()` function / promise once you call `check()`
* Methods
  * `new Checkly()` - new checker instance
  * `.t(...a)` - argument(s) must be truthy
  * `.f(...a)` - argument(s) must be falsey
  * `.eq(...a)` - argument(s) must be equal
  * `.ineq(...a)` - argument(s) must be inequal
  * `.pass(fn, thisArg, ...args)` - sets the function / promise to call and return if all checks passed
  * `.fail(fn, thisArg, ...args)` - sets the function / promise to call and return if all checks failed
  * `.check()` - runs the checks, returns the function / promise called.

#### Changelog

* v2.1
  * `/dist/checkly.min.js` for browser
* v2
  * Stricter checks
  * Added `map`, `set`, `nan` and `fnc` checks
  * pass(fn) now pass(fn, thisArg, ...args)
  * fail(fn) now fail(fn, thisArg, ...args)
  
#### Static checkers  & transforms
* Static checkers return `true` or `false`.
* Static because they can be accessed from Checkly itself.
  * i.e. `Checkly.str()`
  * or destructure it, `var { str } = Checkly;`
* Checkers list
  * `str(a)`
    * typeof a === "string"
  * `num(a)` - if it's a number
    * typeof a === "number"
    * isNan(a) === false
  * `obj(a)` - if it's an object
    * typeof a === "object"
    * Array.isArray(a) === false
    * a !== null
    * if a.__proto__, __proto__ !== Map.prototype;
    * if a.__proto__, __proto__ !== Set.prototype;
  * `arr(a)` - if it's an array
    * Array.isArray(a) === true
  * `und(a)` - if it's undefined
    * typeof a === "undefined"
  * `nul(a)` - if it's null
    * a === null;
  * `nan(a)` - if it's NaN
    * isNaN(a) === true
	* typeof a !== "function"
	* typeof a !== "object"
  * `map(a)` - if it's instance of Map
    * a.__proto__ === Map.prototype;
  * `set(a)` - if it's instance of Set
    * a.__proto__ === Set.prototype;
  * `fnc(a)` - if it's a function
	* typeof a === "function"
  * `emp(a)`
    * if Array.isArray(a), a.length === 0;
	* if typeof a === "object", a.__proto__ === Map.prototype, a !== null, a.size === 0;
	* if typeof a === "object", a.__proto__ === Set.prototype, a !== null, a.size === 0;
	* if typeof a === "object" && a !== null, Object.keys(a).length === 0;
  * `equal(a, b)`
    * complicated, see source.
* Transforms list
  * `ti(a)` - shortened parseInt, works with args
  * `tf(a)` - shortened parseFloat, works with args
  * `ts(a)` - shortened .toString()
	* returns undefined if arg is null / undefined
  * Notes:
	* Doesn't mutate args, instead we return the transformed args.
	* Looking to transform circular json's? check out `circular-json`@npm
  
#### Tests
  
```
let Checkly = require("./index.js");

const { ts, ti, tf } = Checkly;

console.log("ts on number:", ts(123));
console.log("ts on object:", ts({ a: 1 }));
console.log("ts on array:", ts([1]));
console.log("tf on string:", tf("213213.3234"));
console.log("ti on string:", ti("213213.3234"));

const { obj, str, und, num, nul, arr, emp, nan, map, set, fnc } = Checkly;

const testFunctions = [
	{label: 'obj', func: obj},
	{label: 'str', func: str},
	{label: 'und', func: und},
	{label: 'num', func: num},
	{label: 'nul', func: nul},
	{label: 'arr', func: arr},
	{label: 'emp', func: emp},
	{label: 'nan', func: nan},
	{label: 'map', func: map},
	{label: 'set', func: set},
	{label: 'fnc', func: fnc}
];

const testObjects = [
	{label: 'string, empty', value: ''},
	{label: 'string, non-empty', value: '1'},
	{label: 'number, negative', value: -1},
	{label: 'number, zero', value: 0},
	{label: 'number, positive', value: 1},
	{label: 'array, empty', value: []},
	{label: 'array, non-empty', value: [1]},
	{label: 'object, empty', value: {}},
	{label: 'object, non-empty', value: {a:1}},
	{label: 'undefined', value: undefined},
	{label: 'null', value: null},
	{label: 'NaN', value: NaN},
	{label: 'function', value: () => {}},
	{label: 'map, empty', value: new Map()},
	{label: 'map, non-empty', value: new Map().set(1,2)},
	{label: 'set, empty', value: new Set()},
	{label: 'set, non-empty', value: new Set().add(1)},
];

testFunctions.map((tFunc, index) => {
	testObjects.map((tObj) => {
		console.log(tFunc.label, 'on', tObj.label, tFunc.func.apply(null, [tObj.value]));
	});
	console.log(' ');
});

console.log('should pass:');
new Checkly()
	.t(true)
	.f(false)
	.eq(1,1)
	.ineq(1,2)
	.pass(() => {
		console.log("pass");
	})
	.fail(() => {
		console.log("fail");
	})
	.check();
	
console.log('should pass with multiple args on checks:');
new Checkly()
	.t(true, 1)
	.f(false, 0)
	.eq(1, 1, 2-1)
	.ineq(1, 2, 3)
	.pass(() => {
		console.log("pass");
	})
	.fail(() => {
		console.log("fail");
	})
	.check();
	
console.log('should fail:');
new Checkly()
	.t(true)
	.f(false)
	.eq(1,2) // failure, args not equal 
	.ineq(1,2)
	.pass(() => {
		console.log("pass");
	})
	.fail(() => {
		console.log("fail");
	})
	.check();

console.log('pass func with args:');
new Checkly()
	.t(true)
	.f(false)
	.eq(1,1)
	.ineq(1,2)
	.pass((...args) => {
		console.log.apply(null, args);
	}, null, 1,2,3)
	.fail(() => {
		console.log("fail");
	})
	.check();

console.log('fail func with args:');
new Checkly()
	.t(true)
	.f(false)
	.eq(1,2) // failure, args not equal 
	.ineq(1,2)
	.pass((...args) => {
		console.log.apply(null, args);
	}, null, 1,2,3)
	.fail((...args) => {
		console.log.apply(null, args);
	}, null, 1,2,3)
	.check();

setTimeout(() => {
	console.log('should pass, and resolve promise:');
	new Checkly()
		.t(true)
		.f(false)
		.eq(1,1)
		.ineq(1,2)
		.pass(() => {
			return Promise.resolve('pass');
		})
		.fail(() => {
			return Promise.reject('fail');
		})
		.check()
		.then((result) => {
			console.log('resolve result:', result);
		})
		.catch((result) => {
			console.log('reject result:', result);
		});
}, 200);

setTimeout(() => {
	console.log('should fail, and reject promise:');
	new Checkly()
		.t(true)
		.f(false)
		.eq(1,2) // failure, args not equal 
		.ineq(1,2)
		.pass(() => {
			return Promise.resolve('pass');
		})
		.fail(() => {
			return Promise.reject('fail');
		})
		.check()
		.then((result) => {
			console.log('resolve result:', result);
		})
		.catch((result) => {
			console.log('reject result:', result);
		});
}, 400);
```

#### Result

```
ts on number: 123
ts on object: [object Object]
ts on array: 1
tf on string: 213213.3234
ti on string: 213213
obj on string, empty false
obj on string, non-empty false
obj on number, negative false
obj on number, zero false
obj on number, positive false
obj on array, empty false
obj on array, non-empty false
obj on object, empty true
obj on object, non-empty true
obj on undefined false
obj on null false
obj on NaN false
obj on function false
obj on map, empty false
obj on map, non-empty false
obj on set, empty false
obj on set, non-empty false

str on string, empty true
str on string, non-empty true
str on number, negative false
str on number, zero false
str on number, positive false
str on array, empty false
str on array, non-empty false
str on object, empty false
str on object, non-empty false
str on undefined false
str on null false
str on NaN false
str on function false
str on map, empty false
str on map, non-empty false
str on set, empty false
str on set, non-empty false

und on string, empty false
und on string, non-empty false
und on number, negative false
und on number, zero false
und on number, positive false
und on array, empty false
und on array, non-empty false
und on object, empty false
und on object, non-empty false
und on undefined true
und on null false
und on NaN false
und on function false
und on map, empty false
und on map, non-empty false
und on set, empty false
und on set, non-empty false

num on string, empty false
num on string, non-empty false
num on number, negative true
num on number, zero true
num on number, positive true
num on array, empty false
num on array, non-empty false
num on object, empty false
num on object, non-empty false
num on undefined false
num on null false
num on NaN false
num on function false
num on map, empty false
num on map, non-empty false
num on set, empty false
num on set, non-empty false

nul on string, empty false
nul on string, non-empty false
nul on number, negative false
nul on number, zero false
nul on number, positive false
nul on array, empty false
nul on array, non-empty false
nul on object, empty false
nul on object, non-empty false
nul on undefined false
nul on null true
nul on NaN false
nul on function false
nul on map, empty false
nul on map, non-empty false
nul on set, empty false
nul on set, non-empty false

arr on string, empty false
arr on string, non-empty false
arr on number, negative false
arr on number, zero false
arr on number, positive false
arr on array, empty true
arr on array, non-empty true
arr on object, empty false
arr on object, non-empty false
arr on undefined false
arr on null false
arr on NaN false
arr on function false
arr on map, empty false
arr on map, non-empty false
arr on set, empty false
arr on set, non-empty false

emp on string, empty true
emp on string, non-empty false
emp on number, negative undefined
emp on number, zero undefined
emp on number, positive undefined
emp on array, empty true
emp on array, non-empty false
emp on object, empty true
emp on object, non-empty false
emp on undefined undefined
emp on null undefined
emp on NaN undefined
emp on function undefined
emp on map, empty true
emp on map, non-empty false
emp on set, empty true
emp on set, non-empty false

nan on string, empty false
nan on string, non-empty false
nan on number, negative false
nan on number, zero false
nan on number, positive false
nan on array, empty false
nan on array, non-empty false
nan on object, empty false
nan on object, non-empty false
nan on undefined true
nan on null false
nan on NaN true
nan on function false
nan on map, empty false
nan on map, non-empty false
nan on set, empty false
nan on set, non-empty false

map on string, empty false
map on string, non-empty false
map on number, negative false
map on number, zero false
map on number, positive false
map on array, empty false
map on array, non-empty false
map on object, empty false
map on object, non-empty false
map on undefined false
map on null false
map on NaN false
map on function false
map on map, empty true
map on map, non-empty true
map on set, empty false
map on set, non-empty false

set on string, empty false
set on string, non-empty false
set on number, negative false
set on number, zero false
set on number, positive false
set on array, empty false
set on array, non-empty false
set on object, empty false
set on object, non-empty false
set on undefined false
set on null false
set on NaN false
set on function false
set on map, empty false
set on map, non-empty false
set on set, empty true
set on set, non-empty true

fnc on string, empty false
fnc on string, non-empty false
fnc on number, negative false
fnc on number, zero false
fnc on number, positive false
fnc on array, empty false
fnc on array, non-empty false
fnc on object, empty false
fnc on object, non-empty false
fnc on undefined false
fnc on null false
fnc on NaN false
fnc on function true
fnc on map, empty false
fnc on map, non-empty false
fnc on set, empty false
fnc on set, non-empty false

should pass:
pass
should pass with multiple args on checks:
pass
should fail:
fail
pass func with args:
1 2 3
fail func with args:
1 2 3
should pass, and resolve promise:
resolve result: pass
should fail, and reject promise:
reject result: fail
```