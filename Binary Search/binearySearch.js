/**
 * Finds index of a given element in the given SORTED array
 * @param arr
 * @param el
 */
function BinarySearchArrayElement(arr, el) {
    if (Array.isArray(arr) && arr.length) {
        let start = 0;
        let end   = arr.length - 1;
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (el === arr[mid]) {
                return mid;
            } else if (el > arr[mid]) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
    }
    return -1;
}

const testArr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(1, BinarySearchArrayElement(testArr1, 1));
console.log(4, BinarySearchArrayElement(testArr1, 4));
console.log(10, BinarySearchArrayElement(testArr1, 10));
console.log(6, BinarySearchArrayElement(testArr1, 6));
console.log(9, BinarySearchArrayElement(testArr1, 9));