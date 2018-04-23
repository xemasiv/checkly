# Checkly

![checkly](https://i.imgur.com/29tOS0o.png)

Truthy, falsey &amp; equality checks simplified.

* Checks for:
  * truthiness
  * falseyness
  * equality
* Perks
  * built-in argument iteration support for `.t()` and `.f()`
  * built-in pairwise argument iteration support for `.eq()` and `ineq`
  * built-in pairwise argument iteration support for `.g()`, `.l()`, `.ge()` and `.le()`
  * uses fast-deep equal for `.eq()` and `ineq()`
  * `.can().be().chained()`
  * just call `.check()` at the end
  * Returns the `.pass()` or `.fail()` function / promise once you call `check()`
* Instance Methods
  * `new Checkly()` - new checker instance
  * `.t(...a)` - argument(s) must be truthy
  * `.f(...a)` - argument(s) must be falsey
  * `.eq(...a)` - argument(s) must be equal
  * `.ineq(...a)` - argument(s) must be inequal
  * `.g(...a)` - leading args must be greater than the following args
  * `.l(...a)` - leading args must be less than the following args
  * `.ge(...a)` - leading args must be greater than or equal to the following args
  * `.le(...a)` - leading args must be less than or equal to the following args
  * `.err(...a)` - add error helper text
    * Stored in `errors` array
  * `.pass(fn)` - sets the function / promise to call and return if all checks passed
  * `.fail(fn)` - sets the function / promise to call and return if all checks failed
    * receives `errors` array as argument
  * `.check()` - runs the checks, returns the function / promise called.

#### Changelog

* v3.1.1
  * Fix typo
* v3.1
  * Cleaned up redundant methods
  * Added new static checkers
  * Added new instance-based checkers
  * Updated LICENSE
* v2.1
  * `/dist/checkly.min.js` for browser
* v2
  * Stricter checks

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
	  * if typeof a === "string", a === '';
  * `equal(a, b)`
    * complicated, see source.
  * `.g(a, b)`
    * a > b
  * `.l(a, b)`
    * a < b
  * `.ge(a, b)`
    * a >= b
  * `.le(a, b)`
    * a <= b
* Transforms list
  * `ti(a)` - shortened parseInt, works with args
  * `tf(a)` - shortened parseFloat, works with args
  * `ts(a)` - shortened .toString()
	* returns undefined if arg is null / undefined
  * Notes:
	* Doesn't mutate args, instead we return the transformed args.
	* Looking to transform circular json's? check out `circular-json`@npm

#### Tests

* Run `test.js` to see all tests.
