// Implement a function memoize(asyncFunction) which takes in any asynchronous function as an input
// and returns a memoized version of the function such that if the function is called with same arguments,
// it returns a memoized value
// Ex:
// function someAsyncFunction(arg1, arg2, arg3, callback) {
//     setTimeout(() => {
//         callback(arg1, arg2, arg3);
//     }, Math.random() * 5000);
// }
// const memoizedFn = memoize(someAsyncFunction);
// memoizedFn("hello", "world", {a:"good morning"}, (...args)=>{console.log(args)}); // returns after some time
// memoizedFn("hello", "world2", {b:"good morning"}, (...args)=>{console.log(args)}); // returns after some time
// memoizedFn("hello", "world", {a:"good morning"}, (...args)=>{console.log(args)});// returns after some time
// setTimeout(()=>memoizedFn("hello", "world", {a:"good morning"}, (...args)=>{console.log(args)}), 10000);// returns immediately from cache

function memoize(asynchronousFunction) {
    const cachedResponses = {};
    const me = this;
    return function (...args) {
        const key = JSON.stringify(args.filter((a) => typeof a !== 'function'));
        const start = Date.now();
        const expectedCb = args.pop();

        const addToCacheCB = (result, fromCache) => {
            console.log(`returning from ${fromCache?'cache':'call'}, `,  Date.now() - start);
            cachedResponses[key] = result;
        }
        const passedCB = typeof expectedCb === 'function' ?
            (data, fromCache) => {
                addToCacheCB(data, fromCache);
                expectedCb(data);
            }
            :
            addToCacheCB;
        if (cachedResponses[key]) {
            passedCB(cachedResponses[key], true);
            return;
        }
        asynchronousFunction.apply(me, [...args, passedCB]);
    };
}

function getSomeData(foo, bar, callback) {
    setTimeout(() => {
        callback(foo + " - " + bar);
    }, 500);
}


var newF = memoize(getSomeData);
const commonCB = (result) => {
    console.log(result);
};

newF("a", "blah", commonCB); // trigger and chahce
newF("a1", "blah", commonCB); // trigger and cache
setTimeout(() => {
    newF("a", "blah", commonCB);// trigger and cache
    newF("a2", "blah", commonCB);
}, 5000);



