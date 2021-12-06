// https://leetcode.com/problems/search-in-rotated-sorted-array/
// 33. Search in Rotated Sorted Array
// Medium
//
// There is an integer array nums sorted in ascending order (with distinct values).
//
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
//
//     Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
//
//     You must write an algorithm with O(log n) runtime complexity.
//
//
//
//     Example 1:
//
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
//
// Example 2:
//
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
//
// Example 3:
//
// Input: nums = [1], target = 0
// Output: -1
//
//
//
// Constraints:
//
//     1 <= nums.length <= 5000
//     -104 <= nums[i] <= 104
// All values of nums are unique.
//     nums is an ascending array that is possibly rotated.
// -104 <= target <= 104
//
var searchSortedArray = (nums, target, start, end) => {
    if (start > end || target < nums[start] || target > nums[end]) {
        return -1;
    } else if (nums[start] === target) {
        return start;
    } else if (nums[end] === target) {
        return end;
    } else {
        let mid = Math.ceil((start + end) / 2);
        if (target === nums[mid]) {
            return mid;
        } else if (target > nums[mid]) {
            return searchSortedArray(nums, target, mid + 1, end);
        } else {
            return searchSortedArray(nums, target, start, mid - 1);
        }
    }
}
const searchRotatedSortedArray = (nums, target, start, end) => {
    if (start > end) {
        return -1;
    }
    if (start === end) {
        return target === nums[start] ? start : -1;
    }
    let mid = Math.ceil((start + end) / 2);
    let ls;
    let rs;
    if (nums[mid] > nums[start]) {
        //     [s-mid] is sorted array [mid-e] is rsa
        // ls = searchSortedArray(nums, target, start, mid);
        // rs = searchRotatedSortedArray(nums, target, mid + 1, end);
        // return ls === -1 && rs === -1 ? -1 : (ls === -1 ? rs : ls);
        if (target >= nums[start] && target <= nums[mid]) {
            return searchSortedArray(nums, target, start, mid);
        } else {
            return searchRotatedSortedArray(nums, target, mid + 1, end);
        }
    } else {
        // pivot in left half
        if (target >= nums[mid] && target <= nums[end]) {
            return searchSortedArray(nums, target, mid, end);
        } else {
            return searchRotatedSortedArray(nums, target, start, mid - 1);
        }
        // ls = searchSortedArray(nums, target, mid, end);
        // rs = searchRotatedSortedArray(nums, target, start, mid - 1);
        // return ls === -1 && rs === -1 ? -1 : (ls === -1 ? rs : ls);
    }
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    return searchRotatedSortedArray(nums, target, 0, nums.length - 1);
};

//Test Cases
console.log(search([4, 5, 6, 7, 0, 1, 2], 0));//4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3));//-1
console.log(search([1], 0));//-1
console.log(search([8, 10, 12, 14, 16, 0, 2, 4], 5));//-1
console.log(search([8, 10, 12, 14, 16, 0, 2, 4], 4));//7
console.log(search([8, 10, 12, 14, 16, 0, 2, 4], 8));//0
console.log(search([8, 10, 12, 14, 16, 0, 2, 4], 16));//4
console.log(search([8, 10, 12, 14, 16, 0, 2, 4], 0));//5
console.log(search([1, 3], 0));//-1
console.log(search([1, 3], 1));//0
console.log(search([1, 3], 3));//1