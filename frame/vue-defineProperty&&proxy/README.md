# 问题

```
   聊一聊 defineProperty 与 proxy
```

# 解题

```
    Object.defineProperty()方法直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回此对象的现有属性,并返回此对象。

    在Vue2.X初始化data数据监听过程中，使用defineProperty为每一个属性添加get/set

    其中 get() 不传入任何参数，set(newValue) set中传入新修改的值, get/set 与 value 不可以同时存在

    所以此属性只能给对象添加监听，而数组的监听处理在vue的源码中通过拦截Array.prototype实现监听代码如下：
    
```

```javascript
    const arrayProto = Array.prototype
    
    let arrayMethods = Object.created(arrayProto) //新生成一个对象,对象的__proto__指向Array.prototype

    let actions = ['push','shift','unshift','pop','splice','sort','reverse']

    actions.forEach(function(method){
        const original = arrayProto[method] //缓存原始方法
        Object.defineProperty(arrayMethods,method,{
            value: function mutator(...args){
                // do something

                return original.apply(this,args)
            },
            writable: true,
            configurable: true,
            enumerable: false
        })
    })
    
    // 判断是否支持__proto__
    const hasProto = '__proto__' in {}

    //使用拦截器覆盖 Array 原型, 直接修改会污染全局

    if(Array.isArray(value)){
        value.__proto__ = arrayMethods
    }

```


```
   Proxy 对象用于定义基本操作的自定义行为(如属性查找、赋值、枚举、函数调用等)

   const p = new Proxy(target,handler)

   target 要使用proxy包装的对象(可以是任何类型的对象，包括原生数组，函数，甚至另一个代理)

   handler 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理p的行为

```

```javascript

   let products = new Proxy([
  { name: 'Firefox'    , type: 'browser' },
  { name: 'SeaMonkey'  , type: 'browser' },
  { name: 'Thunderbird', type: 'mailer' }
],{
  get: function(obj, prop) {
    // 默认行为是返回属性值， prop ?通常是一个整数
    if (prop in obj) {
      return obj[prop];
    }

    // 获取 products 的 number; 它是 products.length 的别名
    if (prop === 'number') {
      return obj.length;
    }

    let result, types = {};

    for (let product of obj) {
      if (product.name === prop) {
        result = product;
      }
      if (types[product.type]) {
        types[product.type].push(product);
      } else {
        types[product.type] = [product];
      }
    }

    // 通过 name 获取 product
    if (result) {
      return result;
    }

    // 通过 type 获取 products
    if (prop in types) {
      return types[prop];
    }

    // 获取 product type
    if (prop === 'types') {
      return Object.keys(types);
    }

    return undefined;
  }
})

```
