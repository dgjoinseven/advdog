/**
 * @CoreNotice.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/17
 */
namespace game {
    /**
     *
     * @author sodaChen
     * Date:2017/4/17
     */
    export class CoreNotice {
        static SOCEKT_OPEN: string = "socketOpen";
        /** socket关闭 **/
        static SOCEKT_CLOSE: string = "socketClose";
        /** socket链接失败，服务器没开 **/
        static SOCEKT_ERROR: string = "socketError";
        // /** 取消断线重连 **/
        // static Cancel_Socket_Link: string = "Cancel_Socket_Link";
        // /** 断线重连 **/
        // static Socket_Break_Link: string = "Socket_Break_Link";

        /**寻路去战斗 */
        static Scene_To_Fight: string = "Scene_To_Fight";
        /**战斗切换技能 */
        static Fight_CastSkill: string = "Fight_CastSkill";
        /**自动去打某只怪，不传就是打附近的 */
        static Scene_Auto_Fight: string = "Scene_Auto_Fight";
        /**场景角色死亡 参数1 死亡的实体gameEntitiy 参数2 致实体死亡的实体 gameEntiy*/
        static Scene_On_Entity_Die: string = "Scene_On_Entity_Die";
        /**使场景角色移除 */
        static Scene_Entity_Remove: string = "Scene_Entity_Remove";
        /**场景角色添加成功 */
        static Scene_Entity_Add: string = "Scene_Entity_Add";
        /**使场景角色成功 */
        static Scene_Entity_Remove_Complete: string = "Scene_Entity_Remove_Complete";
        /**场景进入确认成功 */
        static Scene_Confirm: string = "Scene_Confirm";
        /**场景NPC添加成功 */
        static Scene_Npc_Add: string = "Scene_Npc_Add";

        /**动画血量变化 */
        static Scene_Hp_Change: string = "Scene_Hp_Change";
        /**主角血量变化 */
        static Scene_Hero_Hp_Change: string = "Scene_Hero_Hp_Change";
        /**主角武器变化 */
        static Hero_weapon_Change: string = "Hero_weapon_Change";
        /**设置任务怪,怪死了原地等刷新 */
        static Scene_TASK_MONSTER: string = "Scene_TASK_MONSTER";

        /**主角双修变化 */
        static Scene_Hero_Spring_Change: string = "Scene_Hero_Spring_Change";

        /**寻路到达结束 */
        static Scene_Hero_Move_End: string = "Scene_Hero_Move_End";
        /**寻路开始,这里发送的是原路径坐标数组 */
        static Scene_Hero_Move_Begin: string = "Scene_Hero_Move_Begin";
        /**寻路开始，这里发送的是拐点坐标数组 */
        static Scene_Hero_Move_Begin_Optimize: string = "Scene_Hero_Move_Begin_Optimize";
        /**主角移动了1个格子 */
        static Scene_On_Hero_Move_Tile: string = "Scene_On_Hero_Move_Tile";

        /**主角1次战斗动作完成 */
        static Hero_Fight_Action_End: string = "Hero_Fight_Action_End";
        /**主角1次连击动作完成 */
        static Hero_Fight_Double_Hit_End: string = "Hero_Fight_Double_Hit_End";
        /**主角开始尝试攻击 */
        static Hero_Try_Fight: string = "Hero_Try_Fight";

        /**主角死亡 */
        static Scene_Hero_Die: string = "Scene_Hero_Die";
        /**主角复活成功 */
        static Scene_Hero_Revive: string = "Scene_Hero_Revive";

        /**请求采集 */
        static Scene_To_Collection: string = "Scene_To_Collection";
        /**开始采集 */
        static Scene_Begin_Collection: string = "Scene_Begin_Collection";
        /**打断采集*/
        static Scene_Break_Collection: string = "Scene_Break_Collection";
        /**采集结束 */
        static Scene_End_Collection: string = "Scene_End_Collection";

        /**主角的宠物1次战斗动作完成，参数是当前宠物实体 */
        static Hero_Pet_Fight_Action_End: string = "Hero_Pet_Fight_Action_End";
        /**进入或离开安全区域 */
        static Hero_inSaveArea: string = "Hero_inSaveArea";
    }
}