var content = document.getElementById("tt").innerHTML;

var info = [
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

var result = template(info, content);
document.getElementById("demo").innerHTML = result;