/**
 * @DebugBean.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/3/31
 */

/**
 * 调试信息数据结构
 * @author sodaChen
 * Date:2017/3/31
 */
class DebugBean
{
    /** 是否打开调试面板 **/
    openDebugWin: boolean;
    /** 是否打欢迎面板 **/
    openWelcome: boolean;
    /** 是否开启新手引导 **/
    openGuide: boolean;
    /** 是否开启自动战斗 **/
    openAuto: boolean;
    /** 默认用户名，如果没填，则会自动从最下面的内置用户名获取一个作为默认用户名(userIndex) **/
    userName: string;
    /** 选择ip的索引 **/
    ipIndex: number;
    /** 所有的ip列表 **/
    ips: DebugIpBean[];
    /** 内置用户的索引，用于自动登录时获取 **/
    userIndex: number;
    /** 内置用户名 **/
    userNames: string[];
    /** 选择ip的索引 **/
    gameIndex: number;
    /** 选择ip的索引 **/
    games: DebugGameBean[];

    constructor()
    {

    }
}
class DebugIpBean
{
    index:number;
    name: string;
    ip: string;
    ishot: boolean;
    isnew: boolean;
}
class DebugGameBean
{
    name: string;
    value: string;
}
