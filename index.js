class Checkly {
  static str(arg) {
    return typeof arg === "string";
  }
  static num(arg) {
    return typeof arg === "number" && isNaN(arg) === false;
  }
  static obj(arg) {
  	if (typeof arg === "object" && Array.isArray(arg) === false && arg !== null) {
  	  if (Boolean(arg.__proto__) === true) {
  		return arg.__proto__ !== Map.prototype && arg.__proto__ !== Set.prototype;
  	  }
  	}
  	return false;
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
  static nan(arg) {
    return isNaN(arg) === true && typeof arg !== "function" && typeof arg !== "object" && typeof arg !== "undefined";
  }
  static map(arg) {
  	if (typeof arg === "object" && arg !== null) {
  	  if (Boolean(arg.__proto__) === true) {
  		  return arg.__proto__ === Map.prototype;
  	  }
  	}
  	return false;
  }
  static set(arg) {
  	if (typeof arg === "object" && arg !== null) {
  	  if (Boolean(arg.__proto__) === true) {
  		  return arg.__proto__ === Set.prototype;
  	  }
  	}
  	return false;
  }
  static fnc(arg) {
	   return typeof arg === "function";
  }
  static emp(arg) {
    let instance = this;
    if (typeof arg === "string") {
      return arg === "";
    }
    if (typeof arg === "object" && arg !== null) {
	  if (arg.__proto__ === Map.prototype || arg.__proto__ === Set.prototype) {
		return arg.size === 0;
	  }
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
  static g(a, b) {
    if (Checkly.num(a) === true && Checkly.num(b) === true) {
      return a > b;
    }
    return false;
  }
  static l(a, b) {
    if (Checkly.num(a) === true && Checkly.num(b) === true) {
      return a < b;
    }
    return false;
  }
  static ge(a, b) {
    if (Checkly.num(a) === true && Checkly.num(b) === true) {
      return a >= b;
    }
    return false;
  }
  static le(a, b) {
    if (Checkly.num(a) === true && Checkly.num(b) === true) {
      return a <= b;
    }
    return false;
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
  constructor() {
    this._passed = true;
    this._lastCheckPassed = true;
    this._errors = [];
  }
  t(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    args.map(arg => {
      if (Boolean(arg) === false) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  f(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    args.map(arg => {
      if (Boolean(arg) === true) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  eq(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.equal.apply(null, pair) === false) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  ineq(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.equal.apply(null, pair) === true) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  g(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.g.apply(null, pair) === false) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  l(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.l.apply(null, pair) === false) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  ge(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.ge.apply(null, pair) === false) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  le(...args) {
    let instance = this;
    instance._lastCheckPassed = true;
    let pairs = Checkly.pairwise(args);
    pairs.map(pair => {
      if (Checkly.le.apply(null, pair) === false) {
        instance._passed = false;
        instance._lastCheckPassed = false;
      }
    });
    return this;
  }
  err (...args) {
    if (this._passed === false && this._lastCheckPassed === false) {
      args.map((arg) => this._errors.push(arg));
    }
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
      if (Boolean(this._passFn) === true) {
        return this._passFn.apply(null, []);
      }
    } else {
      if (Boolean(this._failFn) === true) {
        return this._failFn.apply(null, [this._errors]);
      }
    }
  }
  get errors () {
    return this._errors;
  }
  get lastError () {
    return this._errors[this._errors.length - 1];
  }
  get firstError () {
    return this._errors[0];
  }
}
if (typeof window !== 'undefined') {
  Window.Checkly = Checkly;
} else if (typeof module !== 'undefined') {
  module.exports = Checkly;
}
