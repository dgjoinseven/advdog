namespace asf
{
    export class JSUtils
    {
        /**
         * 添加一个js脚本
         * @param {String} js
         * @param {HTMLElement} ele
         */
        static addJS(js:string,ele?:HTMLElement):void
        {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.text = js;
            if(!ele)
            ele = document.body;
            ele.appendChild(script);
            ele.removeChild(script);
        }
    }
}