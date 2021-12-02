// https://leetcode.com/problems/product-of-array-except-self/
// 238. Product of Array Except Self
// Medium
//
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
//
//     The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//
//     You must write an algorithm that runs in O(n) time and without using the division operation.
//
//
//
//     Example 1:
//
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
//
// Example 2:
//
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]
//
//
//
// Constraints:
//
//     2 <= nums.length <= 105
//     -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//
//
//
//     Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    // const ret = new Array(nums.length).fill(1)
    // // The following exceeds time limit:
    // // for (let i = 0; i < nums.length; i++) {
    // //     for (let j = 0; j < nums.length; j++) {
    // //         if (i !== j) {
    // //             ret[i] = ret[i] * nums[j];
    // //         }
    // //     }
    // // }
    //
    // const result = nums.reduce((r, num, i) => {
    //     return r.map((p, j) => {
    //         if (i !== j) {
    //             return p * num;
    //         } else {
    //             return p;
    //         }
    //     });
    // }, ret);
    // return result.map(a => a === -0 ? 0 : a);


    // Accepted Solution:

    // const ret = new Array(nums.length).fill(1).map(_ => ({}));
    // const processNextIndex = (left, current) => {
    //     ret[current].l = left;
    //     if (current === nums.length - 1) {
    //         ret[current].r = 1;
    //         return nums[current];
    //     } else {
    //         ret[current].r = processNextIndex(left * nums[current], current + 1);
    //         return nums[current] * ret[current].r;
    //     }
    // }
    // processNextIndex(1, 0);
    // return ret.map(v => +v.l * +v.r).map(a => a === -0 ? 0 : a);

//    taking a hint from best answers, :: using index accessors of arrays:
    const ret = new Array(nums.length).fill(1);
    let l = 1;
    let r = 1;
    for (let i = 0; i < nums.length; i++) {
        ret[i] *= l;
        ret[nums.length - 1 - i] *= r;
        l *= nums[i];
        r *= nums[nums.length - i - 1];
    }
    return ret.map(a => a === -0 ? 0 : a);
};
// Test Cases
console.log(productExceptSelf([1, 2, 3, 4]));//[24,12,8,6]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));//[0,0,9,0,0]