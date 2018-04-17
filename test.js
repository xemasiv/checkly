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