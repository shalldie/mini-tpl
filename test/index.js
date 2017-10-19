const tpl = require('../build/mini-tpl.min');

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