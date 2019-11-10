/**
 * @IGameMain.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/10
 */

/**
 * 游戏主入口
 * @author sodaChen
 * Date:2017/4/10
 */
interface IGameMain
{
    /**
     * 开始游戏
     * @param user 用户名或者session，用于登录游戏的
     * @param ip 游戏服务端地址
     */
    start(user:string,ip:string):void
}
