// https://leetcode.com/problems/maximum-product-subarray/
// 152. Maximum Product Subarray
// Medium
//
// Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
//
//     It is guaranteed that the answer will fit in a 32-bit integer.
//
//     A subarray is a contiguous subsequence of the array.
//
//
//
//     Example 1:
//
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
//
// Example 2:
//
// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
//
//
//
//     Constraints:
//
// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    const min = new Array(nums.length);
    const max = new Array(nums.length);
    let MAX = nums[0];
    max[0] = nums[0];
    min[0] = nums[0] < 0 ? nums[0] : 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] >= 0) {
            min[i] = min[i - 1] < 0 ? min[i - 1] * nums[i] : 1;
            max[i] = Math.max(max[i - 1] * nums[i], nums[i]);
        } else {
            min[i] = max[i - 1] * nums[i] < 0 ? max[i - 1] * nums[i] : nums[i];
            max[i] = Math.max(min[i - 1] * nums[i], nums[i]);
        }
        MAX = Math.max(max[i], MAX);
    }
    // console.log(max);
    // console.log(min);
    return MAX;
};

// Test Cases
console.log(maxProduct([2, 3, -2, 4]));//6 [2,3] has the largest product 6.
console.log(maxProduct([-2, 0, -1]));//0 The result cannot be 2, because [-2,-1] is not a subarray.
console.log(maxProduct([3, -2, 4, -2]));//48
console.log(maxProduct([3, -2, 1, 2]));//3
