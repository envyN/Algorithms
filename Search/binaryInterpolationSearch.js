/**
 * Finds index of a given element in the given UNIFORMLY DISTRIBUTED SORTED array
 * @param arr
 * @param el
 */
function binaryInterpolationSearchArrayElement(arr, el) {
    if (Array.isArray(arr) && arr.length) {
        let start = 0;
        let end   = arr.length - 1;
        if (el < arr[start] || el > arr[end]) {
            return -1;
        }
        while (start <= end) {
            let pos = Math.floor(( (el - arr[start]) * (end - start)) / (arr[end] - arr[start]));
            if (el === arr[pos]) {
                return pos;
            } else if (el > arr[pos]) {
                start = pos + 1;
            } else {
                end = pos - 1;
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

console.log('------------BINARY INTERPOLATION SEARCH------------');
const start1 = Date.now();
console.log(start1);
testNumbers.forEach(t => console.log(t, binaryInterpolationSearchArrayElement(testArr1, t)));
console.log(Date.now(), Date.now() - start1, ' ms');