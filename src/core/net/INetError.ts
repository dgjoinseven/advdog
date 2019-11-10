// TypeScript file
namespace game
{
    export interface INetError
    {
        init():void;
        onSocketClose():void;
        onSocketError():void;
        /**
         * 服务器返回的错误回调
         * @param cmd 服务器返回指令
         * @param code 这个指令对应的错误码
         */
        errorBack(cmd:number,code:number):void;
    }
}