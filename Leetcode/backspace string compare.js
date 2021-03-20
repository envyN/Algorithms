/** https://leetcode.com/problems/backspace-string-compare/
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
    function processString(s) {
        const result = [];
        s.split('').forEach(c => {
            if (c === '#') {
                result.length && result.pop();
            } else {
                result.push(c);
            }
        });
        return result.join('');
    }

    return processString(S) === processString(T);
};
//alt
var backspaceCompare = function (S, T) {
    let c1 = 0;
    let c2 = 0;
    let l1 = S.length - 1;
    let l2 = T.length - 1;
    while (l1 >= 0 || l2 >= 0) {
        while (S[l1] === '#' || c1) {
            if (S[l1] === '#') {
                c1++;
                l1--;
            }
            if (S[l1] !== '#' && c1) {
                l1--;
                c1--;
            }
            if (l1 === -1) {
                c1 = 0;
            }
        }
        while (T[l2] === '#' || c2) {
            if (T[l2] === '#') {
                c2++;
                l2--;
            }
            if (T[l2] !== '#' && c2) {
                l2--;
                c2--;
            }
            if (l2 === -1) {
                c2 = 0;
            }
        }
        if (S[l1] !== T[l2]) {
            return false;
        } else {
            l1--;
            l2--;
        }

    }
    return true;
};
