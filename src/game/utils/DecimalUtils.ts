namespace game
{
    /**
     * 
     */
    export class DecimalUtils
    {
        static createDecimal(num:string):any
        {
            let win = window;
            let Decimal:any = win["Decimal"];
            return new Decimal(num);
        }
        /**
         * 金币转换
         */
        static goldChange(goldCoin):string
        {
            let win = window;
            let Decimal:any = win["Decimal"];
            // let goldCoin:any = new Decimal(value); 
            if(asf.TypeofUtils.isString(goldCoin))
            {
                goldCoin = new Decimal(goldCoin);;
            }
            var result = goldCoin;
            var unitStr = "";
            if(goldCoin.comparedTo(new Decimal("999999999999999999999999")) == 1){
                result = result.div(Decimal(1000000000000000000000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "ac";
            }else if(goldCoin.comparedTo(new Decimal("999999999999999999999")) == 1){
                result = result.div(new Decimal(1000000000000000000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "ab";
            }else if(goldCoin.comparedTo(new Decimal("999999999999999999")) == 1){
                result = result.div(Decimal(1000000000000000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "aa";
            }else if(goldCoin.comparedTo(new Decimal("999999999999999")) == 1){
                result = result.div(new Decimal(1000000000000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "t";
            }else if(goldCoin.comparedTo(new Decimal("999999999999")) == 1){
                result = result.div(new Decimal(1000000000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "b";
            }else if(goldCoin.comparedTo(new Decimal(999999999)) == 1){
                result = result.div(Decimal(1000000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "m";
            }else if(goldCoin.comparedTo(new Decimal(999999)) == 1){
                result = result.div(Decimal(1000)).toFixed(2, Decimal.ROUND_DOWN);
                unitStr = "k";
            }
            return result + unitStr;
        }
        /**
         * 相加返回结果
         */
        static add(num1:string,num2:string):string
        {
            let win = window;
            return win["Decimal"].add(num1, num2);
        }
        static sub(num1:string,num2:string):string
        {
            let win = window;
            return win["Decimal"].sub(num1, num2);
        }
        static mul(num1:string,num2:string):string
        {
            let win = window;
            return win["Decimal"].mul(num1, num2);
        }
        static div(num1:string,num2:string):string
        {
            let win = window;
            // return win["Decimal"].div(num1,num2);
            let Decimal:any = win["Decimal"];
            let result = new Decimal(num1);
            return result.div(Decimal(num2)).toFixed(0, Decimal.ROUND_DOWN) + "";
        }
    }
}