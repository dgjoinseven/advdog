/**
 * @Game
 * Define.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:GameEngine
 * <br>Date:2013-6-30
 */
namespace game
{
	/**
	 * 场景相关的常量定义
	 * @author sodaChen
	 * Date:2013-6-30
	 */
	export class CoreDefine
	{
		static Original_Width: number = 480;
		static Original_Height: number = 800;

		// static verson: string = "default";
		// static verson: string = "legDemo";
		static ReleaseUrl: string;// = "";
		static Res_Main_Url: string;// = "svnres/legDemo/"

		static Res_Map_Url: string;
		static Res_Weapon_Url: string;
		static Res_Role_Url: string; 
		static Res_Effect_Url: string;
		static Res_Icon_Url: string;

		// static Server_Ip: string = "ws://192.168.0.10:19060/ws";
		// static Server_Ip: string = "ws://192.168.0.152:19060/ws";//文武
		static Server_Ip: string;// = "ws://192.168.0.180:19060/ws";//林树宏
		//static Server_Ip: string = "ws://192.168.0.136:19060/ws";//冠霖
		// /** 用户名或者session，用来登录的 **/
		// static userOrSession:string;

		//信息变动常量
		/*** 钻石*/
		public static Value_CCY: number = 1; //钻石
		/*** 金币*/
		public static Value_GCY: number = 2; //金币
		/*** 战队等级*/
		public static Value_TEAM_LV: number = 3; //战队等级
		/*** 格斗家经验*/
		public static Value_FIGHTER_EXP: number = 4; //格斗家经验
		public static Value_TiLi: number = 5; //体力
		public static Value_LingQi: number = 6; //灵气
		/*** 玩家等级*/
		public static Value_WanJia_DengJi: number = 100; //玩家等级
		/*** 功能开启*/
		public static Value_GongNeng_POINT: number = 102; //功能开启
		/*** 玩家经验*/
		public static Value_WanJia_JingYan: number = 103; //玩家经验
		/*** 每日重置*/
		public static Value_Chong_Zhi: number = 104; //每日重置

		///////////////////场景中的层，根据该值对场景的元素进行归类////////////////////
		/** 地图层 **/
		static MAP_LAYER: string = "mapContainer";
		/** 地图特效层 **/
		static MAP_EFFECT_LAYER: string = "mapEffectContainer";
		/** 角色层 **/
		static ROLE_LAYER: string = "roleContainer";
		/** 角色遮罩层 **/
		static ROLE_MASK_LAYER: string = "roleMaskContainer";
		/** 特效层 **/
		static EFFECT_LAYER: string = "effectContainer";
		/** 中间层 **/
		static CENTER_LAYER: string = "centerContainer";
		/** 最顶层 **/
		static TOP_LAYER: string = "topContainer";

		////////////////战斗场景状态/////////////////
		/** 战斗前的准备 **/
		static BATTLE_READY: string = "battleReady";
		/** 战斗中 **/
		static BATTLING: string = "battling";
		/** 战斗结束 **/
		static BATTLE_OVER: string = "battleOver";

		///////////////战斗指令////////////////////
		/** 物理攻击 **/
		static ATK: number = 0;
		/** 物品 **/
		static GOODS: number = 1;
		/** 逃跑 **/
		static FLEE: number = 2;
		/** 捕捉 **/
		static CATCH: number = 3;
		/** 技能 **/
		static SKILL: number = 4;
		/** 物理防御 **/
		static DC: number = 5;

		///////////////角色的动作定义////////////////
		/**待机*/
		public static Idle: number = 0;
		/**跑步 */
		public static Run: number = 1;
		/**攻击 */
		public static Atk: number = 2;
		/**技能 */
		public static Skill: number = 3;
		/**受伤 */
		public static Hit: number = 4;
		/**骑乘状态跑步 */
		public static RideRun: number = 5;
		/**骑乘状态待机 */
		public static RideIdle: number = 6;

		///////////////角色的方向定义////////////////
		/** 上 */
		static UP: number = 0;

		/** 右上 */
		static RIGHT_UP: number = 1;

		/** 右 */
		static RIGHT: number = 2;

		/** 右下  */
		static RIGHT_DOWN: number = 3;

		/** 下 */
		static DOWN: number = 4;

		/** 左下 */
		static LEFT_DOWN: number = 5;

		/** 左 */
		static LEFT: number = 6;

		/** 左上 */
		static LEFT_UP: number = 7;


		//////////////////大地图方向(顺时针)////////////////
		/** 北 上 **/
		static N: number = 0;
		/** **/
		static NE: number = 1;
		/** 东 右 **/
		static E: number = 2;
		/** **/
		static ES: number = 3;
		/** 南  下**/
		static S: number = 4;
		/****/
		static SW: number = 5;
		/** 西 左 **/
		static W: number = 6;
		/** **/
		static WN: number = 7;

		/** 包裹 */
		static BAG: number = 15;
		/** 传送点 */
		static EXIT: number = 14;

		/** 玩家(英雄) */
		static PLAYER: number = 1;
		/** 宠物 */
		static PET: number = 2;
		/** NPC */
		static NPC: number = 3;
		/** 怪物 */
		static MONSTER: number = 4;

		/** 场景特效 */
		static EFFECT: number = 999;

		/** 陷阱类 */
		static TRAP: number = 17;

	}
}