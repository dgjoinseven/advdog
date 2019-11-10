/**
 * @PlatformBean.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/6/15
 */
namespace game
{
    /**
     * 平台模拟数据
     * @author sodaChen
     * Date:2017/6/15
     */
    export class PlatformBean
    {
        /** 游戏id **/
        gameUID:string;
        /** 频道id **/
        channelUID:string;
        /** 平台的玩家id **/
        playerId:string;
        /** 登录时间 **/
        loginTime:number;
        /** 自己游戏的用户id **/
        userId:number;
        /** md5的验证码 **/
        sign:string;
    }
}