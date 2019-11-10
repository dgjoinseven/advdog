// 时间戳工具类 liujianhao createBy 2017/5/24
namespace asf
{
    export class TimeUtils
    {
        public static ServerTime = 0;       //通过服务器协议返回的时间
        public static ServerTimeStamp = 0;  //时间标尺

        private static BeiJingDate: Date = new Date();

        /**
         * 获取服务器时间
         */
        public static getServerTime(nowTime: number): number
        {
            return Math.floor(this.getServerTimeMill(nowTime) / 1000);
        }

        public static getServerTimeMill(nowTime: number): number
        {
            //DB.getInstance().serverTimeDB.getNowBeiJingTime().getTime()
            return this.ServerTime + (nowTime - this.ServerTimeStamp);
        }

        /**
         * 获取服务器时间的Ymd格式
         */
        public static getServerTimeYmd(nowTime: number): number
        {
            return Number(TimeUtils.dateFormat("yyyyMMdd", this.getServerTime(nowTime)));
        }

        /**
         * 获取服务器时间的Ymd格式
         */
        public static getServerTimeYmd2(nowTime: number)
        {
            return this.dateFormat("yyyyMMdd-hh:mm:ss", this.getServerTime(nowTime));
        }

        //格式化日期
        public static dateFormat(fmt: string, time: number)
        {
            var date = new Date(time * 1000);
            var o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        /**
    * 将时间长度格式化
    *
    */
        public static diffTimeFormat(fmt: string, time: number, type: number = 1)
        {
            var day = TimeUtils.number2int(time / 86400);
            var hour = TimeUtils.number2int(time % 86400 / 3600);
            var minutent = TimeUtils.number2int(time % 3600 / 60);
            var seconds = TimeUtils.number2int(time % 60);
            if (!new RegExp("(d+)").test(fmt))
            {
                hour += day * 24;
            }
            if (!new RegExp("(h+)").test(fmt))
            {
                minutent += hour * 60;
            }

            var o = {
                "d+": day, //日 
                "h+": hour, //小时 
                "m+": minutent, //分 
                "s+": seconds, //秒 
            };
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                {
                    //                    debug((("00" + o[k]).substr(("" + o[k]).length)));
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ("" + o[k]).length == 1 ? "0" + o[k] : o[k]);
                }

            return fmt;
        }


        /**
         * 返回 12:00:00这种格式
         * @param time
         * @returns {string}
         */
        public static format1(time)
        {
            return TimeUtils.diffTimeFormat('hh:mm:ss', time);
        }

        public static format2(time)
        {
            return TimeUtils.diffTimeFormat('hh时mm分ss秒', time);
        }


        public static number2int(num: number): any
        {
            return parseInt(TimeUtils.number2str(num));
        }

        public static number2str(num: number): string
        {
            return <string><any>num;
        }

        public static secondsPerDay: number = 60 * 60 * 24;
        private static secondsPerHour: number = 60 * 60;
        /**
         * 用剩余时间显示 0:00:00格式
         * @param totalsec
         * @param showHour 是否显示小时
         * @param showAsChinese 是否显示成中文时分秒
         * @return 
         */
        public static getRemainTimeBySeconds(totalsec: number, showHour: boolean = true, showAsChinese: boolean = false): string
        {
            var str: string = "";
            var hour: number = 0;//小时数
            var min: number = 0;//分钟数
            var sec: number = 0;//秒数
            var minR: number;//去小时数后剩余的秒数

            hour = Math.floor(totalsec / this.secondsPerHour);
            hour = hour < 0 ? 0 : hour;
            minR = Math.floor(totalsec % this.secondsPerHour);
            min = Math.floor(minR / 60);
            min = min < 0 ? 0 : min;
            sec = minR % 60;
            sec = sec < 0 ? 0 : sec;

            if (!showAsChinese && showHour)
            {
                str = this.formatString(hour) + ":" + this.formatString(min) + ":" + this.formatString(sec);
            }
            else if (!showAsChinese)
            {
                str = this.formatString(min) + ":" + this.formatString(sec);
            }
            else if (showAsChinese)
            {
                if (hour > 0)
                {
                    str += hour + "时"
                }
                if (min > 0)
                {
                    str += min + "分"
                }
                str += sec + "秒"
            }

            return str;
        }

        private static formatString(value: number): string
        {
            if (value < 0)
            {
                return "00";
            }

            var str: string;
            if (value <= 9)
            {
                str = "0" + value;
            }
            else
            {
                str = value.toString();
            }

            return str;
        }

        /** 获取当前月份的天数 */
        public static getMonthLength(nowTime: number): number
        {
            //nowTime = DB.getInstance().serverTimeDB.nowServerTime
            //构造当前日期对象
            var date = new Date();
            //把服务器的时间戳传进去
            date.setTime(nowTime);
            //获取年份
            var year = date.getFullYear();
            //获取当前月份
            var mouth = date.getMonth() + 1;
            //定义当月的天数；
            var days;
            //当月份为二月时，根据闰年还是非闰年判断天数
            if (mouth == 2)
            {
                days = year % 4 == 0 ? 29 : 28;
            }
            else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12)
            {
                //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
                days = 31;
            }
            else
            {
                //其他月份，天数为：30.
                days = 30;
            }
            return days;
        }

        /**获取传入的时间戳的北京时间
         * time 时间戳(毫秒)
         * return Date
         */
        public static getBeiJingTime(time: number): Date
        {
            var BeiJingTime: number = time + TimeUtils.BeiJingDate.getTimezoneOffset() * 60000 + 28800000;//修正为北京时间:time + TimeUtils.BeiJingDate.getTimezoneOffset() * 60 * 1000 + 8 * 3600 * 1000

            return new Date(BeiJingTime);
        }

        /**
         * 根据星期获取中文字符
         * sunDayIs0 是否周日是0
         */
        public static getWeekName(day: number, sunDayIs0: boolean = true): string
        {
            if (sunDayIs0)
            {
                switch (day)
                {
                    case 0:
                        return "星期日"
                    case 1:
                        return "星期一"
                    case 2:
                        return "星期二"
                    case 3:
                        return "星期三"
                    case 4:
                        return "星期四"
                    case 5:
                        return "星期五"
                    case 6:
                        return "星期六"
                }
            }
            else
            {
                switch (day)
                {
                    case 0:
                        return "星期一"
                    case 1:
                        return "星期二"
                    case 2:
                        return "星期三"
                    case 3:
                        return "星期四"
                    case 4:
                        return "星期五"
                    case 5:
                        return "星期六"
                    case 6:
                        return "星期日"
                }
            }

            return "";
        }
    }
}