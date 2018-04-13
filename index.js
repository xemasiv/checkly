var window = Boolean(window) ? window : undefined;
var module = Boolean(module) ? module : undefined;
class Checkly {
  constructor() {
    this._passed = true;
  }
  static str(arg) {
    return typeof arg === "string";
  }
  static num(arg) {
    return typeof arg === "number";
  }
  static obj(arg) {
    return typeof arg === "object" && Array.isArray(arg) === false;
  }
  static arr(arg) {
    return Array.isArray(arg) === true;
  }
  static und(arg) {
    return typeof arg === "undefined";
  }
  static nul(arg) {
    return arg === null;
  }
  static emp(arg) {
    let instance = this;
    if (typeof arg === "string") {
      return arg === "";
    }
    if (typeof arg === "object") {
      return Object.keys(arg).length === 0;
    }
    if (Array.isArray(arg) === true) {
      return arg.length === 0;
    }
  }
  static ti(...args) {
	return parseInt.apply(null, args);
  }
  static tf(...args) {
	return parseFloat.apply(null, args);
  }
  static ts(arg) {
	if (Checkly.nul(arg) === false && Checkly.und(arg) === false) {
		return arg.toString();
	}
  }
  static pairwise(list) {
    // https://codereview.stackexchange.com/a/75667
    let pairs = new Array(list.length * (list.length - 1) / 2);
    let pos = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        pairs[pos++] = [list[i], list[j]];
      }
    }
    return pairs;
  }
  static equal(a, b) {
    // https://github.com/epoberezkin/fast-deep-equal
    let isArray = Array.isArray;
    let keyList = Object.keys;
    let hasProp = Object.prototype.hasOwnProperty;
    if (a === b) return true;
    let arrA = isArray(a),
      arrB = isArray(b),
      i,
      length,
      key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = 0; i < length; i++) if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (arrA != arrB) return false;
    let dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    let regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (a instanceof Object && b instanceof Object) {
      let keys = keyList(a);
      length = keys.length;
      if (length !== keyList(b).length) return false;
      for (i = 0; i < length; i++) if (!hasProp.call(b, keys[i])) return false;
      for (i = 0; i < length; i++) {
        key = keys[i];
        if (!equal(a[key], b[key])) return false;
      }
      return true;
    }
    return false;
  }
  t(...args) {
    let instance = this;
    args.map(arg => {
      if (Boolean(arg) === false) {
        instance._passed = false;
      }
    });
    return this;
  }
  f(...args) {
    let instance = this;
    args.map(arg => {
      if (Boolean(arg) === true) {
        instance._passed = false;
      }
    });
    return this;
  }
  eq(...args) {
    let instance = this;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.equal.apply(null, pair) === false) {
        instance._passed = false;
      }
    });
    return this;
  }
  ineq(...args) {
    let instance = this;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.equal.apply(null, pair) === true) {
        instance._passed = false;
      }
    });
    return this;
  }
  e(...args) {
    let instance = this;
    args.map(arg => {
      if (typeof arg === "object") {
        if (Object.keys(arg).length === 0) {
          instance._passed = false;
        }
      }
      if (Array.isArray(arg) === true) {
        if (arg.length === 0) {
          instance._passed = false;
        }
      }
    });
    return this;
  }
  pass(fn) {
    this._passFn = fn;
    return this;
  }
  fail(fn) {
    this._failFn = fn;
    return this;
  }
  check() {
    if (this._passed === true) {
      if (Boolean(this._passFn)) {
        return this._passFn();
      }
    } else {
      if (Boolean(this._failFn)) {
        return this._failFn();
      }
    }
  }
}

new Checkly()
  .f(Checkly.und(window))
  .pass(() => {
    window.Checkly = Checkly;
  })
  .check();

new Checkly()
  .f(Checkly.und(module))
  .pass(() => {
    module.exports = Checkly;
  })
  .check();