let Checkly = require("./index.js");

let c = new Checkly();
c
  .t(true)
  .f(false)
  .pass(() => {
    console.log("pass");
  })
  .fail(() => {
    console.log("fail");
  })
  .check();

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
