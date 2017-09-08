(function (root, factory) {
    var name = 'mini-tpl';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([name], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require(name));
    } else {
        // Browser globals (root is window)
        root[name] = factory(root[name]);
    }
}(this, function () {
    /**
     * 将数据放入模板得到渲染后的结果
     * 
     * @param {any} data 数据
     * @param {string} content 模板 
     * @returns {string} 数据在模板中执行后的结果
     */
    function template(data, content) {
        var arr = ["var r=[];"],   //生成function字符串的数组
            codeArr = setToArr(content), //代码数组
            item;
        for (var i = 0, len = codeArr.length; i < len; i++) {
            item = codeArr[i];
            if (item.code == 1) {  //如果是文本类型
                arr.push("r.push('" + item.txt.replace(/[\r\n\s]+/g, " ").replace(/<%=(.*?)%>/g, function (g0, g1) {
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
        var arr = [],                 //返回的数组，用于保存匹配结果
            reg = /<%(?!=)([\s\S]*?)%>/g,  //用于匹配js代码的正则
            match,   				  //当前匹配到的match
            nowIndex = 0;			  //当前匹配到的索引

        while (match = reg.exec(content)) {
            //保存当前匹配项之前的普通文本
            arr.push({
                code: 1,   //普通文本类型
                txt: content.substring(nowIndex, match.index)  //当前匹配项与之前的匹配项(或文本头)之间的内容
            })
            //保存当前匹配项
            arr.push({
                code: 2,  //js代码内容
                txt: match[1]  //匹配到的内容
            });
            //更新当前匹配索引
            nowIndex = match.index + match[0].length;
        }
        //保存文本尾部
        arr.push({
            code: 1,
            txt: content.substr(nowIndex)
        });
        return arr;
    }
    return template;
}));