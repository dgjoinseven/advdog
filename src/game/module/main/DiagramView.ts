namespace game 
{
    /**
     * 游戏主界面
     */
    export class DiagramView extends View<ui.DiagramUI, any,any>
    {
        static NAME         :string = "DiagramView";

        private itemList:ui.DiagramItemUI[];
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_1;
            this.layer = mvc.MvcConst.VIEW_LAYER;
            //预加载了就不需要设置
            // this.setUIRes("main");
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.DiagramUI(), completeCallback);
        }

        init() 
        {
            console.info(DiagramView.NAME + "初始化完成");
            this.showGrayBg();
            this.centerView();
            //获取网络数据
            // HttpManager.postHttp("game/plate/list",this.onPostHttp,this);
            HttpManager.postHttp("api/platelist",this.onPostHttp,this);
        }

        private onPostHttp(datas:DiagramVo[]):void
        {
            // datas = datas.concat(datas);
            this.itemList = [];
            for(let i:number = 0; i < datas.length; i++)
            {
                let item = new ui.DiagramItemUI();
                let data = datas[i];
                // item.y = 70 + i * 300;
                // item.y = 70 + i * 230;
                item.y = 40 + i * 255;
                item.nameLabel.text = data.plateName;
                // item.dogImg.width = 120;
                // item.dogImg.height = 120;
                // if(data.plateImage && data.plateImage != "")
                // {
                //     let img = new morn.Image();
                //     img.url = data.plateImage;
                //     // img.width = 120;
                //     // img.height = 180;
                //     img.x = -120;
                //     img.y = -200;
                //     item.dogImg.addChild(img);
                // }
                item.dogImg.skin = "main_json." + this.db.dogsRes.get("shop" + data.plateImage);
                    

                // item.dongImg.url = "https://tcshipin-1257933730.cos.ap-guangzhou.myqcloud.com/other/dpg.png";

                item.skillLabel.text = data.skill;
                //替换换行符
                item.desLabel.text = asf.StringUtils.replace(data.description,"&","\n");;
                
                this.container.panel.addChild(item);
            }
        }
    }
}