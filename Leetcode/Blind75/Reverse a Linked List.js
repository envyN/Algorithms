// https://leetcode.com/problems/reverse-linked-list/
// 206. Reverse Linked List
// Easy
//
// Given the head of a singly linked list, reverse the list, and return the reversed list.
//
//
//
//     Example 1:
//
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
//
// Example 2:
//
// Input: head = [1,2]
// Output: [2,1]
//
// Example 3:
//
// Input: head = []
// Output: []
//
//
//
// Constraints:
//
//     The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000
//
//
//
// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head, prev) {
    // let prev = null;
    // let current = head;
    // let next;
    // while (current !== null) {
    //     next = current.next;
    //     current.next = prev;
    //     prev = current;
    //     current = next;
    // }
    // return prev;
// recursive implementation:
    if (head === null) {
        return prev || null;
    }
    const next = head.next;
    head.next = prev || null;
    if (next) {
        return reverseList(next, head);
    } else {
        return head;
    }
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

const createLinkedList = (arr) => {
    return arr
        .map(v => new ListNode(v))
        .reverse()
        .reduce((tail, node) => {
                node.next = tail;
                return node;
            },
            null);
};
const logList = (head) => {
    const vals = [];
    while (head) {
        vals.push(head.val);
        head = head.next;
    }
    console.log(vals);
};
logList(createLinkedList([1, 2, 3, 4, 5]));
//TestCases
logList(reverseList(createLinkedList([1, 2, 3, 4, 5])));//[5,4,3,2,1]
logList(reverseList(createLinkedList([1, 2])));//[2,1]
logList(reverseList(createLinkedList([])));//[]