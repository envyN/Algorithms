// https://leetcode.com/problems/linked-list-cycle/
// 141. Linked List Cycle
// Easy
//
// Given head, the head of a linked list, determine if the linked list has a cycle in it.
//
//     There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
//
// Return true if there is a cycle in the linked list. Otherwise, return false.
//
//
//
//     Example 1:
//
// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
//
//     Example 2:
//
// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
//
//     Example 3:
//
// Input: head = [1], pos = -1
// Output: false
// Explanation: There is no cycle in the linked list.
//
//
//
//     Constraints:
//
// The number of the nodes in the list is in the range [0, 104].
// -105 <= Node.val <= 105
// pos is -1 or a valid index in the linked-list.
//
//
//
//     Follow up: Can you solve it using O(1) (i.e. constant) memory?
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    let slow = head && head.next;
    let fast = slow && slow.next;
    while (slow && fast) {
        if (slow === fast) {
            return true;
        }
        slow = slow.next;
        fast = fast.next && fast.next.next;
    }
    return false;
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
const createCircularLinkedList = (arr, index) => {
    const head = createLinkedList(arr);
    let tail = head;
    let cycleStart = null;
    let i = 0;
    while (tail.next !== null) {
        if (i === index) {
            cycleStart = tail;
        }
        tail = tail.next;
        i += 1;
    }
    tail.next = cycleStart;
    return head;
}
const logList = (head) => {
    const vals = [];
    while (head) {
        vals.push(head.val);
        head = head.next;
    }
    console.log(vals);
};
console.log(hasCycle(createCircularLinkedList([3, 2, 0, -4], 1))); // true
console.log(hasCycle(createLinkedList([3, 2, 0, -4]))); // false
console.log(hasCycle(createCircularLinkedList([1, 2], 0))); // true
console.log(hasCycle(createLinkedList([1], 0))); // false