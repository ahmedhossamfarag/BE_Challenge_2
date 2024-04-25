function flattenArray()
{
    const arr = arguments.length == 1 ? arguments[0] : [...arguments]
    if(typeof arr != 'object')
        return [arr]
    const res = []
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if(typeof(item) == 'object')
            res.push(...flattenArray(item))
        else
            res.push(item)
    }
    return res
}

function flattenArray2()
{
    let arr = arguments.length == 1 ? arguments[0] : [...arguments]
    if(typeof arr != 'object')
        return [arr]
    while(arr.find(a => typeof a == 'object'))
        arr = arr.flat()
    return arr
}

//test
console.log(flattenArray([1, [2, 3], [], 4]))
console.log(flattenArray(1, [2, [3, [4], 5], 6], 7))


//test
console.log(flattenArray2([1, [2, 3], [], 4]))
console.log(flattenArray2(1, [2, [3, [4], 5], 6], 7))