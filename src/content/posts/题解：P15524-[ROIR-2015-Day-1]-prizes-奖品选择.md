---
title:  题解：P15524 [ROIR 2015 Day 1] prizes 奖品选择
published: 2026-03-21
updated: 2026-03-21
tags: [算法：枚举, 算法：前缀和, 洛谷]
category: 题解
licenseName: CC BY-NC-SA 4.0
licenseUrl: https://creativecommons.org/licenses/by-nc-sa/4.0/
---

题面传送门：[P15524 [ROIR 2015 Day 1] prizes 奖品选择](https://www.luogu.com.cn/problem/P15524)

#### 题目大意
> 给定奖品价值和区间长度，寻找一个区间和一个数，使不与此区间重合的所有同长度区间各项之和小于找到的数。找到的数要尽可能小。

#### 思路讲解
直接枚举两人所选区间的复杂度接近 $O(n^2)$，本题 $3 ≤ n ≤ 10^5$ 会超时。

题目与总价值有关，且给定了区间的长度，可利用前缀和数组求区间和。

不妨将阿丽莎选择后的剩余部分分出左右，在这两部分中分别求鲍勃的最优选择方案。最优方案求出后，枚举阿丽莎选择的区间寻找最小数字即可。

#### 代码实现
:::info[定义部分]
```cpp
int n,k,a[100005];
long long s[100005],l[100005],r[100005],ans=1e14;
```
:::warning[注意]{open}
此处 $s,l,r$ 三个数组分别求前缀和，左段最优解，右段最优解，$ans$ 是寻找到的答案。由于数据范围限制，开 `long long` 才可保证不越界。 
:::
:::info[输入 + 求前缀和]
```cpp
for(int i=1;i<=n;i++){
    cin>>a[i];
    s[i]=s[i-1]+a[i];
}
```
:::
:::info[左右子段分别找最优解]
```cpp
for(int i=k;i<=n;i++){
    l[i]=max(l[i-1],s[i]-s[i-k]);
}//左段
for(int i=n-k+1;i>=1;i--){
    r[i]=max(r[i+1],s[i+k-1]-s[i-1]);
}//右段
```
:::
:::info[寻找区间 + 输出]
```cpp
for(int i=1;i<=n-k+1;i++){
    ans=min(ans,max(l[i-1],r[i+k]));
}
cout<<ans;
```
在上一步中，使用了类似状态转移的思想，使得答案存于找到区间的左右两侧。互相比对后再与原答案打擂台即为结果。
:::
:::success[完整代码]
```cpp
#include<bits/stdc++.h>
using namespace std;
int n,k,a[100005];
long long s[100005],l[100005],r[100005],ans=1e14;
int main(){
	cin>>n>>k;
	for(int i=1;i<=n;i++){
		cin>>a[i];
		s[i]=s[i-1]+a[i];
	}
	for(int i=k;i<=n;i++){
		l[i]=max(l[i-1],s[i]-s[i-k]);
	}
	for(int i=n-k+1;i>=1;i--){
		r[i]=max(r[i+1],s[i+k-1]-s[i-1]);
	}
	for(int i=1;i<=n-k+1;i++){
		ans=min(ans,max(l[i-1],r[i+k]));
	}
	cout<<ans; 
	return 0;
}
```
:::