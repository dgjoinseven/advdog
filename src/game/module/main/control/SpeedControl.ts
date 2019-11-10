namespace game 
{
    /**
     * 游戏主界面
     */
    export class SpeedControl
    {
        /**
         * 是否正在加速中
         */
        isSpeed:boolean;
        private mainView:MainView;
        private speedVo:SpeedGoldCoinVo;
        private maxTime:number;
        private time:number = 0;
        private loopKey:number = 0;
        constructor(mainView:MainView)
        {
            this.mainView = mainView;
        }

        startSpeed(speedVo:SpeedGoldCoinVo):void
        {
            DB.ins.speedVo = speedVo;
            this.isSpeed = true;
            this.loopKey = asf.App.timeMgr.doLoop(1000,this.onLoop,this,this.loopKey);
            this.mainView.container.speedTimeLabel.visible = true;
            this.maxTime = Number(speedVo.speedTime);
            this.time = 0;
            //更新倍率
            this.mainView.updateTimeDogGold();
            this.mainView.container.speedTimeLabel.text = speedVo.speedTime;
        }
        private onLoop():void
        {
            this.time++;
            if(this.time > this.maxTime)
            {
                //关闭
                asf.App.timeMgr.clearTimer(this.loopKey);
                this.mainView.container.speedTimeLabel.visible = false;
                return ;
            }
            this.mainView.container.speedTimeLabel.text = (this.maxTime - this.time) + "";
        }
    }
}