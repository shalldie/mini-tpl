(function(root, factory) {
    var name = "mini-tpl";
    if (typeof define === "function" && define.amd) {
        define([ name ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require(name));
    } else {
        root[name] = factory(root[name]);
    }
})(this, function() {
    function template(data, content) {
        var arr = [ "var r=[];" ], codeArr = setToArr(content), item;
        for (var i = 0, len = codeArr.length; i < len; i++) {
            item = codeArr[i];
            if (item.code == 1) {
                arr.push("r.push('" + item.txt.replace(/[\r\n\s]+/g, " ").replace(/<%=(.*?)%>/g, function(g0, g1) {
                    return "'+" + g1 + "+'";
                }) + "');");
            } else {
                arr.push(item.txt);
            }
        }
        arr.push("return r.join(' ');");
        var func = new Function(arr.join("\n"));
        return func.call(data, content);
    }
    function setToArr(content) {
        var arr = [], reg = /<%(?!=)([\s\S]*?)%>/g, match, nowIndex = 0;
        while (match = reg.exec(content)) {
            arr.push({
                code: 1,
                txt: content.substring(nowIndex, match.index)
            });
            arr.push({
                code: 2,
                txt: match[1]
            });
            nowIndex = match.index + match[0].length;
        }
        arr.push({
            code: 1,
            txt: content.substr(nowIndex)
        });
        return arr;
    }
    return template;
});