(function(root, factory) {
    var name = "mini-tpl";
    if (typeof define === "function" && define.amd) {
        define([ name ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root[name] = factory(root[name]);
    }
})(this, function() {
    function template(data, content) {
        var arr = [ "var r=[];" ];
        var codeArr = setToArr(content);
        var item;
        for (var i = 0, len = codeArr.length; i < len; i++) {
            item = codeArr[i];
            if (!item.code) {
                arr.push("r.push('" + item.txt.replace(/<%=(.*?)%>/g, function(g0, g1) {
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
        var arr = [];
        var reg = /<%(?!=)([\s\S]*?)%>/g;
        var match;
        var nowIndex = 0;
        while (match = reg.exec(content)) {
            appendTxt(arr, content.substring(nowIndex, match.index));
            arr.push({
                code: 1,
                txt: match[1]
            });
            nowIndex = match.index + match[0].length;
        }
        appendTxt(arr, content.substr(nowIndex));
        return arr;
    }
    function appendTxt(list, content) {
        content = content.replace(/\r?\n/g, "\\n");
        list.push({
            txt: content
        });
    }
    return template;
});