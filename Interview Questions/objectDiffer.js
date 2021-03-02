// Given object 1 and object 2 as params, return a diff object giving preference to values of obj1 in case of conflict.
var obj1 = {
    a: "a1",
    b: "b2",
    c: {
        c1: "c1",
        c2: "c2",
        c3: "c3"
    },
    d: "d1"
};

var obj2 = {
    a: "a1",
    c: {
        c1: "c1",
        c2: "c2"
    },
    d: "d2",
    e: 'e1'
};

var obj3 = {
    b: "b2",
    c: {
        c3: "c3"
    },
    d: "d1",
    e: 'e1'
};
const getObjDiff = (obj1, obj2) => {
    const o1Keys = Object.keys(obj1);
    const o2Keys = Object.keys(obj2);
    const diffObj = {};
    o1Keys.forEach(k => {
        if (obj2[k] && typeof obj2[k] === 'string' && obj2[k] === obj1[k]) {

        } else if (typeof obj2[k] === 'object' && typeof obj1[k] === 'object') {
            const dif = getObjDiff(obj1[k], obj2[k]);
            if (Object.keys(dif).length) {
                diffObj[k] = dif;
            }
        } else {
            diffObj[k] = obj1[k];
        }
    });
    o2Keys.forEach(k => {
        if (obj1[k] === undefined) {
            diffObj[k] = obj2[k];
        }
    });
    return diffObj;
};
getObjDiff(obj1, obj2);
