/**
 * Does a jump search on a SORTED array for a particular element by jumping to interval and then doing a LINEAR Search
 * @param arr
 * @param el
 * @returns {number}
 */
function jumpSearchArrayElement(arr, el) {
    if (Array.isArray(arr) && arr.length) {
        let stepSize = Math.floor(Math.sqrt(arr.length));
        for (let i = 0; i < arr.length + stepSize; i = i + stepSize) {
            if (el === arr[i]) {
                return i;
            } else if (i < arr.length && el < arr[i]) {
                for (let j = i - stepSize; j < i; j++) {
                    if (arr[j] === el) {
                        return j;
                    }
                }
                return -1;
            } else if (i >= arr.length) {
                for (let j = i - stepSize; j < arr.length; j++) {
                    if (arr[j] === el) {
                        return j;
                    }
                }
                return -1;
            }
        }
    }
    return -1;
}

/**
 * Does a jump search on a SORTED array for a particular element by jumping to interval recursively
 * @param arr
 * @param el
 * @returns {number}
 */
function recursiveJumpSearchArrayElement(arr, el) {
    if (Array.isArray(arr) && arr.length) {
        let stepSize = Math.floor(Math.sqrt(arr.length));
        // console.log(stepSize);
        for (let i = 0; i < arr.length + stepSize; i = i + stepSize) {
            // console.log(i, arr[i], arr);
            if (el === arr[i]) {
                return i;
            } else if (i < arr.length && el < arr[i]) {
                // console.log(arr, i, i - 1, i - stepSize, arr.slice(i - stepSize, i - 1));
                const searchIndex = recursiveJumpSearchArrayElement(arr.slice(i - stepSize, i), el);
                return searchIndex > -1 ? i - stepSize + searchIndex : -1;
            } else if (i >= arr.length && stepSize > 1) {
                // console.log(arr.length - 1, i - stepSize, arr.slice(i - stepSize, arr.length));
                const searchIndex = recursiveJumpSearchArrayElement(arr.slice(i - stepSize, arr.length), el);
                return searchIndex > -1 ? i - stepSize + searchIndex : -1;
            } else if (i >= arr.length && stepSize === 1) {
                return -1;
            }
        }
    }
    return -1;
}

const lastNumInArr = 10000000;
const testArr1     = new Array(lastNumInArr).fill(1).map((n, i) => n + i);

testNumbers = [
    0,
    Math.floor(lastNumInArr / 5),
    Math.floor(2 * lastNumInArr / 5),
    Math.floor(3 * lastNumInArr / 5),
    Math.floor(4 * lastNumInArr / 5),
    lastNumInArr,
    lastNumInArr + 1
];


console.log('------------JUMP and LINEAR SEARCH------------');
const start1 = Date.now();
console.log(start1);
testNumbers.forEach(t => console.log(t, jumpSearchArrayElement(testArr1, t)));
console.log(Date.now(), Date.now() - start1, ' ms');

console.log('------------Recursive JUMP SEARCH------------');
const start2 = Date.now();
console.log(start2);
testNumbers.forEach(t => console.log(t, recursiveJumpSearchArrayElement(testArr1, t)));
console.log(Date.now(), Date.now() - start2, ' ms');