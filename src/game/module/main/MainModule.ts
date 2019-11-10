namespace game 
{
    /**
     * 游戏主界面模块
     */
	export class MainModule extends Module<any>
    {
        static NAME: string = "mainModule";

        /**
         * 主界对应的显示对象
         */
        mainView:MainView = null;
        /**
         * 初始化主界面
         */
        init():void 
        {
            mvc.on(NC.Update_Gold,this.onRequestCurrentGold,this);
        }
        /**
         * 添加一只狗
         */
        addDog(dogLv:number,position:number):void
        {
            if(position < 1 || position > 12)
            {
                console.error(position + "位置不对，超出边界")
                return;
            }
                
            this.db.mainInfoVo["position" + position] = dogLv;
            //显示狗出来
            if(this.mainView)
            {
                this.mainView.addDog(dogLv,position);
            }
        }
        /**
         * 请求更新当前的金币总量
         */
        requestCurrentGold():void
        {
            HttpManager.postHttp(NC.Select_Gold_Url,this.onRequestCurrentGold,this);
        }
        private onRequestCurrentGold(gold:string)
        {
            if(this.mainView && gold)
                this.mainView.updateGold(gold);
        }
    }
}