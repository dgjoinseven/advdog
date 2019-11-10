/**
 * 进度条控制器
 * wangning
 */
namespace game {
	export class ProgressBar {

		public bar: egret.DisplayObject;

		private _isPlaying: boolean;

		private _percent: number;
		/**
		 * 进度条
		 * @back 进度条底图
		 * @bar 进度条
		 */
		public constructor(bar: egret.DisplayObject) {
			this.bar = bar;
			let rect = new egret.Rectangle(0, 0, bar.width, bar.height);
			this.bar.scrollRect = rect;

			this.percent = 0;
		}

		public setRect(w: number, h: number): void {
			let rect = this.bar.scrollRect;

			rect.width = w;
			rect.height = h;
			this.bar.scrollRect = rect;
			this.percent = this._percent;

		}

		public destroy(): void {
			egret.Tween.removeTweens(this);


			this.bar = null;
		}
		/**设置百分比
		 * value 0~1
		 */
		public setProgress(value: number): void {
			this.percent = value;
		}
		/**设置百分比
		 * value 0~1
		 */
		public set percent(value: number) {
			if (value < 0) {
				value = 0
			}
			else if (value > 1) {
				value = 1;
			}
			
			this._percent = value;
			let rect = this.bar.scrollRect;
			rect.right = this.bar.width * this._percent;
			this.bar.scrollRect = rect;
			this.bar.visible = value>0;
		}
		public get percent(): number {
			return this._percent;
		}
		public get isPlaying(): boolean {
			return this._isPlaying;
		}
		/**播放动画
		 * targetPercent 最终目标位置百分比 0~1
		 * oneRoundTime 滚动一整条所需时间(毫秒)
		 * rounds 进度条满后,需要重新滚动的条数(0:满了就完了,1-N:从头开始滚1-N次)
		 * isForward true 向前滚 false 向后滚
		 * onChangeCallback 每次缓动都调用的回调
		 * onFullCallback 每次进度条满了都调用一次,仅当参数rounds>0时有效
		 */
		public run(targetPercent: number, oneRoundTime: number = 1000, rounds: number = 0, isForward: boolean = true, completeFunc: asf.CallBack = null,
			onChangeCallback: asf.CallBack = null, onFullCallback: asf.CallBack = null): void {

			this._isPlaying = true;

			egret.Tween.removeTweens(this);

			if (targetPercent < 0) {
				targetPercent = 0
			}
			else if (targetPercent > 1) {
				targetPercent = 1;
			}


			var tweenTime: number;

			// console.log("缓动函数@@@@@@@@@@>>" + targetPercent + "-" + oneRoundTime + "-" + rounds + "-" + isForward);
			if (rounds > 0) {
				tweenTime = (isForward ? 1 - this.percent : this.percent - 0) * oneRoundTime;
				egret.Tween.get(this, { onChange: onChangeCallback ? onChangeCallback.fun : null, onChangeObj: onChangeCallback ? onChangeCallback.thisObj : null }).to(
					{ percent: isForward ? 1 : 0 }, tweenTime).call(this.callBack, this, [targetPercent, oneRoundTime, rounds - 1, isForward, completeFunc, onChangeCallback, onFullCallback]
					);
			}
			else {
				tweenTime = Math.abs(targetPercent - this.percent) * oneRoundTime;
				egret.Tween.get(this, { onChange: onChangeCallback ? onChangeCallback.fun : null, onChangeObj: onChangeCallback ? onChangeCallback.thisObj : null }).to({ percent: targetPercent }, tweenTime).call(this.complete, this, [completeFunc]);
			}

		}
		private complete(completeFunc: asf.CallBack): void {
			this._isPlaying = false;
			if (completeFunc) {
				completeFunc.execute();
			}
		}
		/**停止缓动 */
		public stop(): void {
			egret.Tween.removeTweens(this);
		}
		private callBack(...para: any[]): void {
			// private callBack(targetPercent: number, oneRoundTime: number, rounds: number, isForward: boolean): void {
			// console.log("callBack@@@@@@@@@@>>" + targetPercent + "-" + oneRoundTime + "-" + rounds + "-" + isForward);
			// console.log(para);
			// if (isForward == true) {
			if (para[3] == true) {
				this.percent = 0;
			}
			else {
				this.percent = 1;
			}

			var onFullCallback: asf.CallBack = para[6];
			if (onFullCallback) {
				onFullCallback.execute();
			}

			// this.run(targetPercent, oneRoundTime, rounds, isForward);
			this.run.apply(this, para);
		}
		// private funcChange(): void {
		// 	console.log("缓动函数@@@@@@@@@@>>" + this.percent);
		// }
	}
}