## How to run the program.
1. open your terminal.
2. go into mega-fs-assignments directory (cmd: cd /path/to/mega-fd-assignments)
3. go into algo directory (cmd: cd ./algo)
4. if you don't have python3 in your computer, please install it for running the program.
5. run command: python3
6. currently, you are in python3 console.
7. import function run command: from string_matching import solve
8. now you can run your test case here.

## example.

cd /path/to/mego-fs-assignments

cd ./algo

python3

...>>> from string_matching import solve

...>>> solve(["ab", "bc", "cd"], "abcd")

...>>> ["ab", "bc"]

## Time complexity analysis
1. assume we have wordList length n, target length k.
2. Loop over wordList for create Dictionary -> O(n)
3. Loop over target string for finding the word with even steps (2) -> O(k/2) 
4. For finding the word, we just find in the Dictionary that use time complexity O(1)
5. So, time complexity of this program is O(n + k/2)
6. if k (length of target) is always less than wordList, the time complexity is O(n).
