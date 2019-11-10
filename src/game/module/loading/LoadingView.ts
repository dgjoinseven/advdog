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
    private createView(): void {
        
        this.loadingUI = new ui.LoadingUI();
        this.addChild(this.loadingUI);

        //实现遮罩的逻辑
        var sen_mask:egret.Shape = new egret.Shape();
        sen_mask.graphics.beginFill(0x000000);
        sen_mask.graphics.drawRect(0, 0, 500, 630);
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
        this.loadingUI.blackDogImg.mask.y -= game.NC.LoadingSpeed;
        if(this.loadingUI.blackDogImg.mask.y < -650)
        {
            asf.App.timer.clearTimer(this.timeKey);
        }
        // this.current += 2
        // this.loadingUI.loadingLabel.text = "- " + Math.floor(this.current / this.loadingMax * 100) + "% -";
    }

    public onProgress(current: number, total: number): void 
    {
        if(current > total)
            current = total;
        this.loadingUI.loadingLabel.text = Math.floor(current / total * 100) + "%";
        // this.textField.text = `Loading...${current}/${total}`;
    }
}