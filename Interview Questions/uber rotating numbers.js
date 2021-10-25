/**
 * Check if the number has this property: the number rotated 180 degrees equals its original value.
 * Examples:
 the number 88 rotated 180 degrees equals 88.
 181 rotated 180 degrees equals 181
 182 rotated 180 degrees does not hold the property

 */
const invertedIsNumber = {
    1: 1,
    6: 9,
    8: 8,
    9: 6,
    0: 0
};
const invertibleNumbers = [1, 6, 9, 8];
const invertibleNumbersWithZero = [...invertibleNumbers, 0];

const isMagicNumber = (input) => {
    const digits = `${input}`.split('');
    for (let i = 0; i < digits.length; i++) {
        if (invertedIsNumber[+digits[i]] === undefined) {
            return false;
        }
    }
    const reversedDigits = digits.map(d => `${invertedIsNumber[+d]}`);
    return reversedDigits.reverse().join('') === `${input}`;
}

// console.log(isMagicNumber(88)); // true
// console.log(isMagicNumber(181)); // true
// console.log(isMagicNumber(182)); // false
// console.log(isMagicNumber(1691)); // true
// console.log(isMagicNumber(1698)); // false


/**Generate all numbers of length N with the property mentioned in the previous problem For n=2 [11,69,96,88]
 */
const fillIndex = (indexToFill, endIndex, results, currentResult, isEvenDigits) => {
    // console.log(indexToFill, endIndex)
    if (indexToFill === endIndex) {
        // fill with second half of inverted numbers and exit
        let tailEnd = currentResult.map(d => `${invertedIsNumber[+d]}`).reverse();
        if (isEvenDigits) {
            results.push([...currentResult, ...tailEnd]);
        }
        return;
    }
    let looper;
    if (indexToFill === 0) {
        looper = invertibleNumbers;
    } else {
        looper = invertibleNumbersWithZero;
    }
    for (let i = 0; i < looper.length; i++) {
        let clonedResult = [...currentResult];
        clonedResult.push(looper[i]);
        fillIndex(indexToFill + 1, endIndex, results, clonedResult, isEvenDigits);
    }
};
const generateMagicNumbers = (lengthOfDigits) => {
    const toBeFilled = lengthOfDigits % 2 === 0 ? lengthOfDigits / 2 : (lengthOfDigits - 1) / 2;
    const results = [];
    fillIndex(0, toBeFilled, results, [], lengthOfDigits % 2 === 0);
    const resultMap = {};
    results.map(r => r.join('')).forEach(rn => resultMap[rn] = true);
    console.log(Object.keys(resultMap));
}

// console.log(generateMagicNumbers(1));
console.log(generateMagicNumbers(4));
// console.log(generateMagicNumbers(3));

// 3 digits
// fillIndex(0, 2)
// [[1,0], [1,1], [1,6],[1,8], [1,9], .....]
// [[1,0, 1], [1,1,1], [1,6,1],[1,8,1], [1,9,1], [6,0], [6,1]]
// 1,8,0


// 4
// [[1,0]]