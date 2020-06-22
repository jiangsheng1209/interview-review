# Question

```
    手写实现Promise
```

# 解题
```javascript

    class Promise{
        constructor(fn){
           this.status = 'pending'; //fulfilled,rejected
           this.resolveList = [];
           this.rejectList = [];
        }
        resolve(data){
            if(this.status !== 'pending'){return}
            this.status = 'fulfilled'

            // 将执行resolveList
            setTimeout(()=>{
                this.resolveList.forEach((s)=>{
                    data = s(data)
                })
            },0)
        }
        reject(data){
            if(this.status !== 'pending'){return}
            this.status = 'rejected'

            // 将执行rejectedList
            setTimeout(()=>{
               this.rejectList.forEach((s)=>{
                   data = s(data)
               })
            },0)
        }
        
        then(resolveCb,rejectCb){

            if(typeof resolveCb === 'function'){
                this.resolveList.push(resolveCb)
            }
            if(typeof rejectCb === 'function'){
                this.rejectList.push(rejectCb)
            }

            return this

        }

        static resolve(data){
            if(isPromise(data)){return data}
            
            return new Promise((res,rej)=>{resolve(data)})
        }

        static reject(){
            if(isPromise(data)){return data}
            
            return new Promise((res,rej)=>{rej(data)})
        }

        static all(promiseList){

            if(!Array.isArray(promiseList)){
                //报错
            }

            const result = [];

            return new Promise((resolve,reject)=>{
                for(let i = 0, item; item = promiseList[i++]){
                    let currentIndex = i - 1
                    if(isPromise(item)){
                        item().then((data)=>{
                            result[currentIndex] = data
                            if(result.length === promiseList.length){
                                resolve(result)
                            }
                        }).catch((err)=>{reject(err)})
                    }else{
                        result[currentIndex] = (item)
                    }
                }       
            })

        }

    }
    
```