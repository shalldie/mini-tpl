# mini-tpl
[![NPM version](https://img.shields.io/npm/v/mini-tpl.svg)](https://www.npmjs.com/package/mini-tpl)

A simple template engine,just several rows.

超简单的模板引擎，只有几十行。

[https://github.com/shalldie/mini-tpl](https://github.com/shalldie/mini-tpl)

## About

* Small size, **0.74KB** of mini-tpl.min.js
* Support from **IE6**.
* The syntax same as **ejs***,you will get it easy if you've written jsp or asp/asp.net .
***
* 超小的体积，压缩后的min版本只有 **0.74KB**
* **IE6** 就能用 0_o
* **ejs** 语法，如果你写过jsp、asp、webform之类的，可以直接上手

## How to get it
If you use npm or yarn.

    npm install mini-tpl
    or
    yarn add mini-tpl

Another way,include the script in browser.(build/mini-tpl.min.js)

## How to use
The syntax same as [ejs](https://github.com/tj/ejs). 

跟[ejs](https://github.com/tj/ejs)一样的语法。

## Example
In node:
```js
// es6 module , typescript
import tpl from 'mini-tpl';
// nodejs
// const tpl = require('mini-tpl'); 

const content = `
<ul>
<% for(var i=0; i < data.length; i++){
    var item = data[i];
    if(item.age < 30){%>
        <li>我的名字是<%=item.name%>，我的年龄是<%=item.age%></li>
    <%}else{%>
        <li>my name is <%=item.name%>,my age is a sercet.</li>
    <%}%>
<% } %>
</ul>`;

const data = [{ name: 'tom', age: 12 }, { name: 'lily', age: 24 }, { name: 'lucy', age: 55 }];

console.log(tpl(content, data));
```
result:

    <ul>

            <li>我的名字是tom，我的年龄是12</li>


            <li>我的名字是lily，我的年龄是24</li>


            <li>my name is lucy,my age is a sercet.</li>


    </ul>

In browser:

```html
<body>
    <div id="root"></div>
    <script id="tplContent" type="text/html">
    <ul>
        <% for(var i=0; i < data.length; i++){
            var item = data[i];
            if(item.age < 30){%>
                <li>我的名字是<%=item.name%>，我的年龄是<%=item.age%></li>
            <%}else{%>
                <li>my name is <%=item.name%>,my age is a sercet.</li>
            <%}%>
        <% } %>
    </ul>
    </script>
    <script src="../build/mini-tpl.min.js"></script>
    <script>
        var data = [{ name: 'tom', age: 12 }, { name: 'lily', age: 24 }, { name: 'lucy', age: 55 }];
        var content = document.getElementById('tplContent').innerHTML;
        var result = miniTpl(content, data);
        document.getElementById('root').innerHTML = result;
    </script>
</body>
```

## Who use it
东方头条、携程