namespace game 
{
    /**
     * 会飞的金币
     */
    export class FlyGold
    {
        private gold:morn.Image;
        /**
         * 最终落下的目标点
         */
        private objectPoint:egret.Point;
        private objectWH:number;
        private highX:number;
        private highY:number;
        private stageH:number = 1500;
        private startX:number;
        private startY:number;
        private targetX:number;
        private targetY:number;
        private container:egret.Sprite;

        private tween:egret.Tween;

        constructor(container:egret.Sprite)
        {
            this.container = container;
            this.gold = new morn.Image();
            this.gold.skin = "main_json.gold";
            // this.gold = gold;
            // this.objectPoint = new egret.Point(180,450);
            // this.startX = gold.x;
            // this.startY = gold.y;
            // this.targetX = 180;
            // this.targetY = 440;
            // this.highX = 443;
            // this.highY = 720;
            // //开始抛物线 
            // // egret.Tween.get(this).to({factor: 1}, 2000);
            
            //1秒钟循环33次
            // asf.App.timeMgr.doLoop(33,this.onLoop,this,0);

        }

        // private onLoop():void
        // {

        // }

        fly(startX:number,startY:number,time:number):void
        {
            let gold = this.gold;
            gold.x = startX;
            gold.y = startY;
            // gold.visible = true;
            this.container.addChild(gold);
            //默认500毫秒
            this.tween = egret.Tween.get(gold).to( {x:65,y:470}, time).call(this.tweenComplete,this); 
        }

        private tweenComplete():void
        {
            //console.info("运动结束了");
            if(this.tween)
                egret.Tween.removeTweens(this.tween);
            // this.gold.visible = false;
            if(this.gold.parent)
                this.container.removeChild(this.gold);
        }

        //添加factor的set,get方法,注意用public  
        get factor():number 
        {  
            return 0;  
        }  
        //计算方法参考 二次贝塞尔公式  
        set factor(value:number) 
        {  
            this.gold.x = (1 - value) * (1 - value) * this.startX + 2 * value * (1 - value) * this.highX + value * value * this.targetX;
            this.gold.y = (1 - value) * (1 - value) * this.startY + 2 * value * (1 - value) * this.highY + value * value * this.targetY;
        }  
    }

    
}