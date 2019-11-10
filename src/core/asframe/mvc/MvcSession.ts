/**
 * Created by soda on 2017/1/25.
 */
namespace mvc
{
    export class MvcSession extends asf.Singleton
    {
        /** 实例对象 **/
        private static instance:MvcSession;

        /** mvc框架内通讯的全局主题对象 **/
        subjects:asf.Subjects;

        constructor()
        {
            super();
            this.subjects = new asf.Subjects();
        }

        static getInstance():MvcSession
        {
            if(!this.instance)
                this.instance = new MvcSession();
            return this.instance;
        }
    }
}