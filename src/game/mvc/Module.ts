/**
 * @LayaModule.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace game
{
    export class Module<D> extends mvc.BasicModule<D>
    {
        /** 本地数据服务对象 **/
        db: DB;
        /** 本地共享对象 **/
        session: Session;

        constructor(name?: string)
        {
            super(name);
            this.session = Session.instance;
            this.db = DB.ins;
        }
    }
}