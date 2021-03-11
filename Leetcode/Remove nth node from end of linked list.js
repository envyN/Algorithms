/** https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let l = head;
    let r = head;
    while(r && n){
        r = r.next;
        n--;
    }
    if(n){
        return head;
    }
    if(!r){
        return head.next;
    }
    while(r && r.next){
        l = l.next;
        r = r.next;
    }
    if(l && l.next){
        let tmp = l.next;
        l.next = tmp.next;
        tmp.next = null;
    }
    return head;
};
