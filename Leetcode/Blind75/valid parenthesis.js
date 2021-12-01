/** https://leetcode.com/problems/valid-parentheses/
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const openBrackets  = ['(', '{', '['];
    const closeBrackets = [')', '}', ']'];
    const stack = [];
    for(let bracket of s){
        if(openBrackets.indexOf(bracket) !==-1){
            stack.push(bracket);
        }else {
            if(closeBrackets.indexOf(bracket) ===-1){
                return false;
            }
            const pop = stack.pop();
            if(!pop){
                return false;
            }
            if(openBrackets.indexOf(pop)!==closeBrackets.indexOf(bracket)){
                return false;
            }
        }
    }
    return !stack.length;
};
