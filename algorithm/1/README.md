# example

```
    input: 'AAAllsrrrbbcccceeeeYYYYYlZZZZZyyMMMM......' 无序排列的字符串

    step1: 'A3l2s1r3b3....'
    step2: 'A3A2B1B2c4d1e4E1.....'

    output: 'A3A2B1B2c4d1e4E1.....'

```

# 解题

```javascript
const string = 'AAAllsrrrbbcccceeeeYYYYYlZZZZZyyMMMM';

function arrToStr(arr){
    return arr.reduce((pre,current)=>{
        if(current.length > 1){
            pre += current.charAt(0) + `${current.length}`
        }else{
            pre += current + '1'
        }
        return pre
    },'')
}

function sortStr(arr){
    return arr.sort((a,b)=>{
        return (a + '').localeCompare(b + '')
    })
}

// 获取匹配的字符串   
function getMatchStr(str){
    //?: 非捕获 提升正则性能
    return str.match(/(.)\1+|(.)(?:(?!\2))/g)
}

function init(str){
    if(!str){return undefined}
    let arrList = [];
    arrList = getMatchStr(str)
    arrList = sortStr(arrList)
    return arrToStr(arrList)
} 


init(string)
```