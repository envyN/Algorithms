/** https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits) return [];
    const digitLetterMap = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    };
    const digitsArr      = digits.split('');

    const prepend = (arr1, arr2) => {
        const ret = [];
        arr1.forEach(a1 => {
            arr2.forEach(a2 => {
                ret.push(`${a1}${a2}`);
            });
        });
        return ret;
    };
    return digitsArr.reduce((acc, digit) => {
        return prepend(acc, digitLetterMap[digit]);
    }, ['']);
};
