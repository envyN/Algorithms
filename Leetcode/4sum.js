/** https://leetcode.com/problems/4sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    const results = [];
    let rd        = {};
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 3; i++) {
        const a = nums[i];
        for (let j = i + 1; j < nums.length - 2; j++) {
            const b = nums[j];
            for (let k = j + 1; k < nums.length - 1; k++) {
                const c = nums[k];
                const sum = a+b+c;
                const d= target -sum;
                if(d>=c && nums.lastIndexOf(d)>k){
                    const s = `${a},${b},${c},${d}`;
                    if (!rd[s]) {
                        results.push([a, b, c, d]);
                        rd[s] = true;
                    }
                }
            }
        }
    }
    return results;
};
fourSum([1, 0, -1, 0, -2, 2], 0);
