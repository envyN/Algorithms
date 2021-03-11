/** https://leetcode.com/problems/generate-parentheses/
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const processed = {};
    if (n === 1) {
        return ['()'];
    } else {
        const r   = generateParenthesis(--n);
        const ret = [];
        for (let s of r) {
            s = '(' + s;
            if (processed[s]) continue;
            for (let i = 0; i < s.length; i++) {
                if (s[i] === '(') {
                    const sf = `${s.substring(0, i + 1)})${s.substring(i + 1)}`;
                    if (ret.indexOf(sf) === -1) {
                        ret.push(sf);
                    }
                }
            }
            processed[s] = true;
        }
        return ret;
    }
};
