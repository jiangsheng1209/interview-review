
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