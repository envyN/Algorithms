// https://leetcode.com/problems/merge-intervals/
// 56. Merge Intervals
// Medium
//
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
//
//
//
//     Example 1:
//
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
//
//     Example 2:
//
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
//
//
//
//     Constraints:
//
// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104
//
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    const sortedIntervals = intervals.sort((a, b) => {
        return a[0] - b[0];
    });
    const mergedIntervals = [sortedIntervals[0]];
    let current = sortedIntervals[0];
    for (let i = 1; i < sortedIntervals.length; i++) {
        const [is, ie] = sortedIntervals[i];
        if (current[1] >= is) {
            if (current[1] < ie) {
                current[1] = ie;
            }
        } else {
            current = sortedIntervals[i];
            mergedIntervals.push(current);
        }
    }
    return mergedIntervals;
};

// Testcases
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));//[[1,6],[8,10],[15,18]] Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
console.log(merge([[1, 4], [4, 5]]));//[[1,5]] Since Intervals [1,4] and [4,5] are considered overlapping.
console.log(merge([[1, 3], [3, 4], [5, 8], [6, 7], [7, 10]]));
console.log(merge([[1, 4], [2, 3]])); // [[1,4]]
console.log(merge([[1,4],[0,4]])); // [[0,4]]
