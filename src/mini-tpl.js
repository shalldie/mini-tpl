(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        // es6 module , typescript
        var mo = factory();
        mo.__esModule = true;
        mo['default'] = mo;
        module.exports = mo;
    } else {
        // browser
        root.miniTpl = factory();
    }
}(this, function () {
    /**
     * 模板 + 数据 =》 渲染后的字符串
     * 
     * @param {string} content 模板
     * @param {any} data 数据
     * @returns 渲染后的字符串
     */
    function render(content, data) {
        data = data || {};
        var list = ['var tpl = "";'];
        var codeArr = transform(content);  // 代码分割项数组

        for (var i = 0, len = codeArr.length; i < len; i++) {
            var item = codeArr[i]; // 当前分割项

            if (item.type == 1) {  // js逻辑
                list.push(item.txt);
            }
            else if (item.type == 2) {  // js占位
                var txt = 'tpl+=' + item.txt + ';';
                list.push(txt);
            }
            else {  //文本
                var txt = 'tpl+="' +
                    item.txt.replace(/"/g, '\\"') +
                    '";';
                list.push(txt);
            }
        }
        list.push('return tpl;');

        return new Function('data', list.join('\n'))(data);
    }

    /**
     * 从原始模板中提取 文本/js 部分
     * 
     * @param {string} content 
     * @returns {Array<{type:number,txt:string}>} 
     */
    function transform(content) {
        var arr = [];                 //返回的数组，用于保存匹配结果
        var reg = /<%([\s\S]*?)%>/g;  //用于匹配js代码的正则
        var match;   				  //当前匹配到的match
        var nowIndex = 0;			  //当前匹配到的索引     

        while (match = reg.exec(content)) {
            // 保存当前匹配项之前的普通文本/占位
            appendTxt(arr, content.substring(nowIndex, match.index));
            //保存当前匹配项
            var item = {
                type: 1,      // 类型  1- js逻辑 2- js 占位 null- 文本
                txt: match[1] // 内容
            };
            if (match[1].substr(0,1) == '=') {  // 如果是js占位
                item.type = 2;
                item.txt = item.txt.substr(1);
            }
            arr.push(item);
            //更新当前匹配索引
            nowIndex = match.index + match[0].length;
        }
        //保存文本尾部
        appendTxt(arr, content.substr(nowIndex));
        return arr;
    }

    /**
     * 普通文本添加到数组，对换行部分进行转义
     * 
     * @param {Array<{type:number,txt:string}>} list 
     * @param {string} content 
     */
    function appendTxt(list, content) {
        content = content.replace(/\r?\n/g, "\\n");
        list.push({ txt: content });
    }
    return render;
}));