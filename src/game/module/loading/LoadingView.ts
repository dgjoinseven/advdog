class LoadingView extends egret.Sprite implements RES.PromiseTaskReporter
{
    private loadingUI:ui.LoadingUI;
    private timeKey:number;
    public constructor() 
    {
        super();
        this.createView();
    }

    private textField: egret.TextField;
    private loadingMax:number = 1000;
    private current:number = 0;
    private peizhiIndex:number = 1;
    private createView(): void {
        
        this.loadingUI = new ui.LoadingUI();
        this.addChild(this.loadingUI);

        //实现遮罩的逻辑
        var sen_mask:egret.Shape = new egret.Shape();
        sen_mask.graphics.beginFill(0x000000);
        sen_mask.graphics.drawRect(0, 0, 310, 410);
        sen_mask.graphics.endFill();
        this.loadingUI.blackDogImg.addChild(sen_mask);
        sen_mask.x =  0;
        sen_mask.y = 0;
        this.loadingUI.blackDogImg.mask = sen_mask;
        this.timeKey = asf.App.timer.doLoop(33,this.onLoop,this);
    }

    public closeLoading():void
    {
        asf.App.timer.clearTimer(this.timeKey);
    }

    private onLoop():void
    {
        
        if(this.loadingUI.blackDogImg.mask.y < -420)
        {
            // asf.App.timer.clearTimer(this.timeKey);
        }
        else
        {
            this.loadingUI.blackDogImg.mask.y -= game.NC.LoadingSpeed;
        }
        this.current += 5;
        if(this.current < this.loadingMax)
            this.loadingUI.loadingLabel.text = "" + Math.floor(this.current / this.loadingMax * 100) + "%";
        else
        {
            if(this.peizhiIndex == 10)
                this.loadingUI.configLabel.text = "正在解析配置...";
            else if(this.peizhiIndex == 20)
                this.loadingUI.configLabel.text = "正在解析配置....";
            else if(this.peizhiIndex == 30)
                this.loadingUI.configLabel.text = "正在解析配置.....";
            else if(this.peizhiIndex == 40)
                this.loadingUI.configLabel.text = "正在解析配置......";
            this.peizhiIndex++;
            if(this.peizhiIndex >= 40)
                this.peizhiIndex = 1;
            this.loadingUI.loadingLabel.text = "";
        }
    }

    public onProgress(current: number, total: number): void 
    {
        console.info("进度显示");
        // if(current > total)
        //     current = total;
        // this.loadingUI.loadingLabel.text = Math.floor(current / total * 100) + "%";
        // this.textField.text = `Loading...${current}/${total}`;
    }
}