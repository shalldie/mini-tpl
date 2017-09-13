; (function (root, factory) {
    var name = 'mini-tpl';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([name], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        // module.exports = factory(require(name));
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root[name] = factory(root[name]);
    }
}(this, function () {
    /**
     * 将数据放入模板得到渲染后的结果
     * 
     * @param {string} content 模板 
     * @param {any} data 数据
     * @returns {string} 数据在模板中执行后的结果
     */
    function template(content, data) {
        var arr = ["var r=[];"];   //生成function字符串的数组
        var codeArr = setToArr(content); //代码数组
        var item;
        for (var i = 0, len = codeArr.length; i < len; i++) {
            item = codeArr[i];
            if (!item.code) {  //如果是文本类型
                arr.push("r.push('" + item.txt.replace(/<%=(.*?)%>/g, function (g0, g1) {
                    return "'+" + g1 + "+'"
                }) + "');");
            } else {               //如果是js代码
                arr.push(item.txt);
            }
        }
        arr.push("return r.join(' ');");
        var func = new Function(arr.join("\n"));
        return func.call(data, content);
    }

    /**
     * 从字符串中获取html和代码的项
     * 
     * @param {string} content 
     * @returns {Array<any>}
     */
    function setToArr(content) {
        var arr = [];                 //返回的数组，用于保存匹配结果
        var reg = /<%(?!=)([\s\S]*?)%>/g;  //用于匹配js代码的正则
        var match;   				  //当前匹配到的match
        var nowIndex = 0;			  //当前匹配到的索引        

        while (match = reg.exec(content)) {
            // 保存当前匹配项之前的普通文本/占位
            appendTxt(arr, content.substring(nowIndex, match.index));
            //保存当前匹配项
            arr.push({
                code: 1,  //js代码
                txt: match[1]  //匹配到的内容
            });
            //更新当前匹配索引
            nowIndex = match.index + match[0].length;
        }
        //保存文本尾部
        appendTxt(arr, content.substr(nowIndex));
        return arr;
    }

    function appendTxt(list, content) {
        content = content.replace(/\r?\n/g, "\\n");
        list.push({ txt: content });
    }
    return template;
}));