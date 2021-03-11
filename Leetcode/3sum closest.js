/** Solution to https://leetcode.com/problems/3sum-closest/
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    let closest = Number.MAX_SAFE_INTEGER;
    let closestDiff = Number.MAX_SAFE_INTEGER;
    nums.sort((a,b)=>a-b);
    for(let i=0;i<nums.length-2;i++){
        let l=i+1;
        let r=nums.length-1;
        while(l<r){
            let sum = nums[i]+nums[l]+nums[r];
            if(sum===target){
                return target;
            }
            let diff = target - sum;
            let diffAbs = Math.abs(diff);
            if(diffAbs<closestDiff){
                closestDiff = diffAbs;
                closest = sum;
            }
            if((target-nums[i])>(nums[l]+nums[r])){
                l++;
            }else{
                r--;
            }
        }
    }
    return closest;
};
