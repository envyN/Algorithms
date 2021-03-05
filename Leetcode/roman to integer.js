/** Solution to https://leetcode.com/problems/roman-to-integer/
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const book = {
        M: {val: 1000, diff: 'C'},
        D: {val: 500, diff: 'C'},
        C: {val: 100, diff: 'X'},
        L: {val: 50, diff: 'X'},
        X: {val: 10, diff: 'I'},
        V: {val: 5, diff: 'I'},
        I: {val: 1, diff: undefined}
    };
    let num    = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const c  = s[i];
        const p  = s[i - 1];
        const cv = book[c].val;
        if (p && p === book[c].diff) {
            num += cv - book[p].val;
            i--;
        } else {
            num += cv;
        }
    }
    return num;
};
