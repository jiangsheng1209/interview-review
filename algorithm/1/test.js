
// 解题一
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
        return (a.charAt(0)).localeCompare(b.charAt(0))
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
    const result = arrToStr(arrList)
    console.log(result)
    return result
}

init(string)

// 解题二

function sortStrNext(str){

    if(!str)return false
    const strArr = getMatchStr(str)
    const resultObj = {}

    for(let i = 0, item; item = strArr[i++];){

        const firstStr = item.charAt(0)
        const resultItem = resultObj[firstStr]
        const length = item.length

        if(resultItem){
            resultObj[firstStr].push(`${firstStr}${length}`)
        }else{
            resultObj[firstStr] = [`${firstStr}${length}`]
        }

    }

    let resultkeys = Object.keys(resultObj)

    resultkeys.sort((a,b)=>(a + '').localeCompare(b + ''))

    let resultStr = resultkeys.reduce((pre,cur)=>{
        
        return pre += resultObj[cur].toString()

    },'')

    resultStr = resultStr.replace(',','')

    console.log(resultStr)

}

sortStrNext(string)

