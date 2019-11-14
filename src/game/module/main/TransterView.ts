namespace game 
{
    /**
     * 游戏主界面
     */
    export class TransterView extends View<ui.TransferUI, any,any>
    {
        static NAME         :string = "TransterView";

        private orders:string[];

        private timeKey:number = 0;
        private transferStartVo:TransferStartVo;
        /**
         * 服务器拉去的转盘数据
         */
        private transferVo:TransferVo;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_1;
            this.layer = mvc.MvcConst.VIEW_LAYER;
            //物品排列顺序
            this.orders = ["1","4","8","2","5","3","7","6"];
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.TransferUI(), completeCallback);
        }

        init() 
        {
            console.info("TransferView初始化完成");
            this.container.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            // this.container.pointerImg.anchorX = 0.5;
            // this.container.pointerImg.anchorY = 0.5;
            HttpManager.postHttp(NC.Transter_Info_Url,this.onPostHttp,this);
            this.showGrayBg();

            //请求是否还有查看转盘次数
            // HttpManager.postHttpByParam(NC.LookVideoCount_Url,{lookType:"1"},this.LookVideoCount_Url,this);
            this.addButtonEvent(this.container.videoBtn,this.onClick,this);
            //默认服务器给的数据
            // let data:TransferStartVo = asf.Global.createAny();
            // data.prizeCount = "100";
            // data.prizeType = "3";
            // this.onStartHttp(data);
        }

        // private LookVideoCount_Url(data:LookVideoCountVo):void
        // {
        //     if(data.lookType == 1 && Number(data.remainingTimes) > 0)
        //     {
        //         //看视频的按钮打开来
        //         this.container.videoBtn.visible = true;
        //     }
        // }

        private onPostHttp(data:TransferVo):void
        {
            this.transferVo = data;
            //这个每个物品都有固定的位置
            this.updateCount(data.prizeCount);
            if(data.prizeCount == "0")
            {
                this.container.startBtn.gray = true;
            }
            // if(data.advideoCount == 0)
            // {
            //     this.container.videoBtn.gray = 
            // }
        }

        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.startBtn)
            {
                //发送抽奖的消息给服务器
                HttpManager.postHttp(NC.Transter_start_Url,this.onStartHttp,this);
                //随机一个
                // let data:TransferStartVo = asf.Global.createAny();
                // data.prizeCount = "100";
                // data.prizeType = String(asf.RandomUtils.randomInt(1,8));
                // data.prizeCount = "100";
                // this.onStartHttp(data);
            }
            else if(evt.currentTarget == this.container.videoBtn)
            {
                //调用app看视频的方法
                if(this.transferVo.advideoCount == 0)
                {
                    TipView.showTip("看视频增加抽奖次数已用完");
                }
                else
                {
                    JSBrigd.getInstance().openShowAd(NC.Transter_Video);
                }
                
                this.close();
            }
        }
        private onStartHttp(data:TransferStartVo):void
        {
            console.log("抽奖结果:",data);
            this.transferStartVo = data;
            for(let i:number = 0; i <= this.orders.length; i++)
            {
                if(this.orders[i] == data.prizeType)
                {
                    this.speed = this.speedList[i];
                    break;
                }
            }
            this.currentAngle = 0;
            this.speedCount = 0;
            //测试轮盘转
            this.timeKey = asf.App.timeMgr.doLoop(33,this.onLoop,this,this.timeKey);
            //查找一下物品在第几个位置，然后进行转动
            // this.showResult();
            //进行转动指针
            // this.timeKey = asf.App.timeMgr.doLoop(33,this.onLoop,this,this.timeKey);
            //更新一下抽奖次数，以及弹出恭喜获得界面
            // this.timeKey = asf.App.timeMgr.doLoop(33,this.onLoop,this,this.timeKey);
        }

        private showResult():void
        {
            //更新抽奖次数
            this.updateCount(this.transferStartVo.prizeCount);
            //根据获得的奖品来弹出对应的弹出框
            if(this.transferStartVo.prizeType == "1" || this.transferStartVo.prizeType == "2")
            {
                AlertView.showGainGold(this.transferStartVo.prize);
            }
            else if(this.transferStartVo.prizeType == "3" || this.transferStartVo.prizeType == "4")
            {
                AlertView.showMoreGainGold(this.transferStartVo.prize);
            }
            else
            {
                console.log("转盘的其他结果");
                CommonAlertView.showGem(this.transferStartVo.prizeCount);
            }
            JSBrigd.getInstance().openShowAd(NC.Transter_AD_Video);
        }

        private updateCount(count:string):void
        {
            this.container.pecksLabel.text = "转盘卷 x " + count;
        }

        private currentAngle:number = 0;
        private speedList:number[] = [27,28,21.5,22.5,23.5,24.5,25.5,26];
        private speed:number = 24.5;//[21.5,22.5,23.5,24.5,25.5,26,27,28]
        private speedCount:number =0;
        private onLoop():void
        {
            this.currentAngle += this.speed;
            this.speed-=0.5;
            if(this.currentAngle >= 360)
            {
                 console.log(  "转一圈了");
            }
            if(this.currentAngle > 360)
                this.currentAngle = this.currentAngle - 360;
            if(this.container)
            {
                this.container.pointerImg.rotation = this.currentAngle;
                //  console.log( "speed:"+this.speed);
                // this.speedCount += this.currentAngle;
            }
            else
            {
                asf.App.timeMgr.clearTimer(this.timeKey);
            }
            if(this.speed <= 0)
            {
                asf.App.timeMgr.clearTimer(this.timeKey);
                this.showResult();
            }
            
        }
    }
}