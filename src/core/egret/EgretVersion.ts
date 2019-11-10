/**
 * Created by sodaChen on 2017/3/15.
 */
namespace game {
    export class EgretVersion implements RES.VersionController {
        /** 是否调试状态 ***/
        static isDebug: boolean;
        // private placard:string;
        public cfgVersion: string;
        public version: string;
        /**资源根目录 */
        //public netRoot: string;
        public hotMap: Object;
        constructor() {

        }


        init(): Promise<void> {

            return Promise.resolve();
        }


        public setVersion(hotMap: Object, cfgVersion: string, version: string): void {
            this.cfgVersion = cfgVersion;
            this.version = version;
            this.hotMap = hotMap;
            // if (window.wxplatform)
            //     window.wxplatform.updateVersion(version, cfgVersion);
        }

        public getVirtualUrl(url: string): string {
            //策划数据，走策划数据配置的版本号
            // if (url.indexOf("cfg.json") != -1 || url.indexOf("cfg.cfg") != -1) {
            //     return url + "?v=" + this.cfgVersion;
            // }

            //直接
            var vstr: string;
            //有热更集合，则需要判断是否有热更的版本号（本地资源和热更资源是冲突，只有网络资源才有单文件热更）
            if (this.hotMap) {
                let hotVersion: number = this.hotMap[url];
                if (hotVersion)
                    vstr = "" + hotVersion;
            }
            //版本号为空，则走统一的大版本号
            if (!vstr)
                vstr = this.version;
            //是否本身就带了参数的url
            if (url.indexOf("?") == -1)
                return url + "?v=" + vstr;
            return url + "&v=" + vstr;
        }
    }
}