def solve(wordList, target):
    mem = {}
    for word in wordList:
        try:
            _ = mem[word]
            mem[word] += 1
        except:
            mem[word] = 1
    result = []
    for i in range(0, 4, 2):
        w = target[i:i+2]
        try:
            mem_word = mem[w]
            if mem_word != 0:
                result.append(w)
                mem[w] -= 1
            else:
                return None
        except:
            return None
    return result
    
