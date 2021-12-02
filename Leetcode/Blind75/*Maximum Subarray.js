// https://leetcode.com/problems/maximum-subarray/
// 53. Maximum Subarray
// Easy
//
// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
//
//     A subarray is a contiguous part of an array.
//
//
//
//     Example 1:
//
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
//
// Example 2:
//
// Input: nums = [1]
// Output: 1
//
// Example 3:
//
// Input: nums = [5,4,-1,7,8]
// Output: 23
//
//
//
// Constraints:
//
//     1 <= nums.length <= 105
//     -104 <= nums[i] <= 104
//
//
//
// Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const sums = new Array(nums.length);
    sums[0] = nums[0];
    let MAX = nums[0];
    for (let i = 1; i < nums.length; i++) {
        sums[i] = Math.max(sums[i - 1] + nums[i], nums[i]);
        MAX = Math.max(MAX, sums[i]);
    }
    return MAX;
};

//TestCases
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));// 6 : [4,-1,2,1]
console.log(maxSubArray([1]));// 1
console.log(maxSubArray([5, 4, -1, 7, 8]));// 23