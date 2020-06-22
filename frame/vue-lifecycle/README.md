# Question

```
    Vue每个生命周期都做了什么
```

# 解题

+ new Vue()
  + init Lifecycle 
    + 1.当前实例对象上属性初始化 _watcher 等
    + 2.寻找父级实例对象,将当前组件实例注入到父组件实例的children(方便父组件有跟新或者销毁时候能找到子组件实例进行相关操作)
  + init Events 
    + 初始化父级附加事件(定义在组件上的监听事件)
  + init Render
    + 组件实例上挂载createElement
    + 监听组件实例属性 $attr,$listeners变化
  + beforeCreate -- 实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
  + init Injections 
  + init State
    + initProps 初始化props,属性新增get/set
    + initMethods 初始化方法
    + initData 初始化Data,属性新增get/set
    + initComputed 初始化计算属性，当前组件实例vm新增_computedWatchers,为每个计算属性创建观察者,存入_computedWatchers。
      + defineComputed 为计算属性设置get,从_computedWatchers中找到对应的计算属性的watcher读取value以便做到计算属性值缓存。
    + initWatch 最终调用vm.$watch(expOrFn, handler, options)
      + expOrFn 需要观察的key,当expOrFn改变时候执行cb
      + 在Watcher实例化过程中会对expOrFn进行解析，并为expOrFn涉及到的data,props,$router,computed下的dep添加watcher
  + init Provide
  + created
  + Has 'el' option
    + No when vm.$mount(el) is called 当前组件实例调用$mount(el)
  + Has 'template' option 
    + Yes compile template into render function，将模板编译成渲染函数*
    + No compile el's outerHTML as template *，编译el对应的外层html
  + beforeMount -- DOM渲染之前
    + 判断实例vm.$options.render是否存在(组件上的render实际是template编译后的渲染函数)
  + 通过执行vm.render()生成VNode(虚拟DOM)
  + 执行patch对比新旧节点找到需要更新的虚拟节点,sameVnode从新旧节点key,tag等开始对比，对比顺序1、假设新旧节点开始位置节点相同，2、假设新旧节点结尾位置节点相同，3、假设新节点开始与旧节点结尾相同，4、假设新节点结尾与旧节点结尾相同,如果以上都不满足的情况全量更新或者全量删除新旧VNode中差异的节点
  + 创建真实DOM
  + mounted -- DOM渲染完成后
  + beforeUpdate -- 组件更新之前
  + updated -- 组件更新完成后
  + beforeDestroy -- 销毁实例之前
  + destroy -- 销毁实例
  
