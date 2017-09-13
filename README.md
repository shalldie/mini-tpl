# mini-tpl
A simple template engine,only 50 rows.

超简单的模板引擎，只有50行!

[https://github.com/shalldie/mini-tpl](https://github.com/shalldie/mini-tpl)

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
import tpl from 'mini-tpl';
// also: var tpl = require('mini-tpl');

const content = `
<% for(var i=0;i<this.length;i++){
    var item=this[i];
    if(item.age<30){%>
        <p>我的名字是<%=item.name%>，我的年龄是<%=item.age%></p>
    <%}else{%>
        <p>my name is <%=item.name%>,my age is a sercet.</p>
    <%}%>
<%}%>
`;

const data = [
    {
        name: 'tom',
        age: 12
    }, {
        name: 'lily',
        age: 24
    }, {
        name: 'lucy',
        age: 55
    }
];

console.log(tpl(content, data));
```
result:

    <p>我的名字是tom，我的年龄是12</p>     

    <p>我的名字是lily，我的年龄是24</p>     

    <p>my name is lucy,my age is a sercet.</p>

In browser is the same.U know it.
在浏览器中也一样，我就不举例了。

## Who use it.
**东方头条**、**携程**