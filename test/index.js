const tpl = require('../build/mini-tpl.min');

const content = `
<ul id="idid" name='namename'>
<% for(var i=0; i<data.length; i++){
    var word = "hello";
    word += ' world';
    var item = data[i];
    if(item.age < 30){%>
        <li data-world='<%=word%>' data-age="<%=item.age%>">我的名字是<%=item.name%>，我的年龄是<%=item.age%></li>
    <%}else{%>
        <li data-name="<%=item.name%>">my name is <%=item.name%>,my age is a sercet.</li>
    <%}%>
<% } %>
</ul>`;

const data = [{ name: 'tom', age: 12 }, { name: 'lily', age: 24 }, { name: 'lucy', age: 55 }];

console.log(tpl(content, data));