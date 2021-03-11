/** https://leetcode.com/problems/merge-two-sorted-lists/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    let result;
    let current;
    let l = l1;
    let r = l2;
    if (!l || !r) {
        return l || r || null;
    }
    if (l.val <= r.val) {
        result  = l;
        current = l;
        l       = l.next;
    } else {
        result  = r;
        current = r;
        r       = r.next;
    }
    while (l && r) {
        if (l.val <= r.val) {
            current.next = l;
            l            = l.next;
        } else {
            current.next = r;
            r            = r.next;
        }
        current = current.next;
    }
    current.next = l || r || null;
    return result;
};
