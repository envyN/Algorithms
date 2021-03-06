/** Solution to https://leetcode.com/problems/3sum/
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum    = function (nums) {
    if (nums.length < 3) {
        return [];
    }
    const sortedNums = nums.sort((a, b) => a - b);
    if (sortedNums[0] > 0 || sortedNums[sortedNums.length - 1] < 0) {
        return [];
    }
    const dictionary = {};
    sortedNums.forEach((n, i) => dictionary[n] = dictionary[n] ? [i, ...dictionary[n]] : [i]);
    const answers = {};
    for (let i = 0; i < sortedNums.length - 2; i++) {
        const num1 = sortedNums[i];
        for (let j = i + 1; j < sortedNums.length - 1; j++) {
            const num2 = sortedNums[j];
            const num3 = -(num1 + num2);
            if (num3 > num2) {
                if (dictionary[num3] && dictionary[num3][0] > j) {
                    answers[`${num1},${num2},${num3}`] = true;
                }
            } else {
                break;
            }
        }
    }
    return Object.keys(answers).map(k => k.split(',').map(n => +n));
};
var threeSumAlt = function (nums) {
    if (nums.length < 3) {
        return [];
    }
    const sortedNums = nums.sort((a, b) => a - b);
    if (sortedNums[0] > 0 || sortedNums[sortedNums.length - 1] < 0) {
        return [];
    }
    const dictionary = {};
    for (let i = 0; i < sortedNums.length - 2; i++) {
        let lp = i + 1;
        let rp = sortedNums.length - 1;
        while (lp < rp) {
            let sum = sortedNums[i] + sortedNums[lp] + sortedNums[rp];
            if (sum === 0) {
                dictionary[`${sortedNums[i]},${sortedNums[lp]},${sortedNums[rp]}`] = true;
                lp++;
            } else if (sum < 0) {
                lp++;
            } else if (sum > 0) {
                rp--;
            }
        }
    }
    return Object.keys(dictionary).map(k => k.split(',').map(n => +n));
};
