(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        var mo = factory();
        mo.__esModule = true;
        mo["default"] = mo;
        module.exports = mo;
    } else {
        root.miniTpl = factory();
    }
})(this, function() {
    function render(content, data) {
        data = data || {};
        var list = [ 'var tpl = "";' ];
        var codeArr = transform(content);
        for (var i = 0, len = codeArr.length; i < len; i++) {
            var item = codeArr[i];
            if (item.type == 1) {
                list.push(item.txt);
            } else if (item.type == 2) {
                var txt = "tpl+=" + item.txt + ";";
                list.push(txt);
            } else {
                var txt = 'tpl+="' + item.txt.replace(/"/g, '\\"') + '";';
                list.push(txt);
            }
        }
        list.push("return tpl;");
        return new Function("data", list.join("\n"))(data);
    }
    function transform(content) {
        var arr = [];
        var reg = /<%([\s\S]*?)%>/g;
        var match;
        var nowIndex = 0;
        while (match = reg.exec(content)) {
            appendTxt(arr, content.substring(nowIndex, match.index));
            var item = {
                type: 1,
                txt: match[1]
            };
            if (match[1].substr(0, 1) == "=") {
                item.type = 2;
                item.txt = item.txt.substr(1);
            }
            arr.push(item);
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
    return render;
});