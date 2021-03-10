/** Solution to Multiply Strings : https://leetcode.com/problems/multiply-strings/
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    const numReverser = ns => ns.split('').reverse();
    const n1r         = numReverser(num1);
    const n2r         = numReverser(num2);
    const multiples   = [];
    n2r.forEach((n2n, n2i) => {
        const multiple = new Array(n2i).fill('0');
        let carry      = 0;
        n1r.forEach(n1n => {
            const n1n2    = carry + (+n1n * +n2n);
            const n1n2Rem = n1n2 % 10;
            carry         = Math.floor(n1n2 / 10);
            multiple.push(`${n1n2Rem}`);
        });
        if (carry) {
            multiple.push(`${carry}`);
        }
        multiples.push(multiple);
    });
    let paddedReturn = multiples.reduce((acc, m) => {
        const ml     = Math.max(acc.length, m.length);
        const result = [];
        let carry    = 0;
        for (let i = 0; i < ml; i++) {
            const n1  = acc[i] ? +acc[i] : 0;
            const n2  = m[i] ? +m[i] : 0;
            const sum = carry + n1 + n2;
            const rem = sum % 10;
            carry     = Math.floor(sum / 10);
            result.push(rem);
        }
        if (carry) {
            result.push(carry);
        }
        return result;
    }, []).reverse();
    let rti          = -1;
    for (let i = 0; i < paddedReturn.length; i++) {
        if (+paddedReturn[i]) {
            rti = i;
            break;
        }
    }
    if (rti > -1) {
        paddedReturn = paddedReturn.slice(rti);
    }else {
        paddedReturn = ['0'];
    }
    return paddedReturn.join('');
};
