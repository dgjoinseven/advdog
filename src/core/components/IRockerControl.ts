namespace game {
	export interface IRockerControl {
		/*移动到目标位置后回调 rotation与原位所成的弧度值 distancePercent摇杆当前位置与最大位置的比值0~1*/
		move(radian:number,distancePercent:number): void;
		/*摇杆复位后回调*/
		reset(): void;
	}
}