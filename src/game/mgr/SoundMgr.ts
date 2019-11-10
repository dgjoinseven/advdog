/**
 * @SoundMgr.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace game
{
    /**
     * 音乐管理器
     * 
     * @author sodaChen
     * @date  2018年8月14日
     */
    export class SoundMgr
    {
        /** 音量 */
        static volume: number = 1;
        /** 背景音量 */
        static volumeBg: number = 1;
        private static root: string;
        /** 所有的音乐对象缓存池 */
        private static soundMap: asf.HashMap<string | number, SoundBean>;
        /** 当前正在播放的背景音乐 */
        private static currentBg: SoundBean;
        private static timeKey: number = 0;
        static init(root: string): void
        {
            this.root = root;
            this.soundMap = new asf.HashMap<string | number, SoundBean>();
        }
        static setVolume(volume: number, isBg: boolean = false): void
        {
            if (volume < 0 || volume > 1)
                throw new Error("音乐的音量必须在0~1这个范围之间，目前是:" + volume);
            if (isBg && this.currentBg && this.currentBg.channel)
            {
                this.currentBg.channel.volume = volume;
                return;
            }
            //var container:any = this.soundMap.getContainer();
            //统一设置所有的音乐对象
            this.soundMap.forEach(function (bean: SoundBean)
            {
                if (!bean.isBg && bean.channel)
                {
                    bean.channel.volume = volume;
                }
            }, this);
        }
        /**
         * 停止背景音乐（切换场景的时候就停止掉）
         */
        static stopBg(): void
        {
            if (this.currentBg)
            {
                this.currentBg.isPlay = false;
                if (this.currentBg.channel)
                    this.currentBg.channel.stop();
                this.currentBg = null;
            }
        }
        static stopAll(): void
        {
            if (this.currentBg && this.currentBg.channel)
            {
                this.currentBg.channel.volume = 0;
            }
            this.soundMap.forEach(function (bean: SoundBean)
            {
                if (!bean.isBg && bean.channel)
                {
                    bean.channel.volume = 0;
                }
            }, this);
        }
        static playAll(): void
        {
            if (this.currentBg && this.currentBg.channel)
            {
                this.currentBg.channel.volume = this.volumeBg;
            }
            this.soundMap.forEach(function (bean: SoundBean)
            {
                if (!bean.isBg && bean.channel)
                {
                    bean.channel.volume = this.volume;
                }
            }, this);
        }
        /**
         * 播放音效，音效只会播放一次就结束
         */
        static play(url: string, isBg: boolean = false, isPlay: boolean = true): void
        {
            if (isPlay == DB.ins.isSound)
            {
                url = this.root + url + ".mp3";
                let soundMap = this.soundMap;
                let bean: SoundBean = soundMap.get(url);
                //有bean数据，并且没有加载中，就表示是一个完整的缓存音乐数据，可以直接用
                if (bean)
                {
                    //正在加载或者播放中，不进行重复播放
                    if (bean.loading || bean.isPlay)
                        return;

                    //立刻改变状态，防止异步出现问题
                    bean.isPlay = true;
                    if (bean.isBg)
                    {
                        if (this.currentBg)
                        {
                            //还原状态
                            this.currentBg.isPlay = false;
                            if (this.currentBg.channel)
                                this.currentBg.channel.stop();
                            this.currentBg.channel = null;
                        }
                        this.currentBg = bean;
                        this.onBgSound();
                        return;
                    }

                    let channel = bean.channel;
                    //停止掉原来的
                    if (channel)
                        channel.stop();
                    channel = bean.channel = bean.sound.play(0, bean.count);

                    //播放一次的音效需要监听事件
                    channel.volume = this.volume;
                    //监听完成事件
                    channel.once(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                    soundMap.put(channel.hashCode, bean);

                    return;
                }
                bean = new SoundBean();
                //加载
                let sound: egret.Sound = bean.sound = new egret.Sound();
                bean.sound = sound;
                bean.isBg = isBg;
                bean.loading = true;
                bean.url = url;
                if (isBg)
                {
                    sound.type = egret.Sound.MUSIC;
                    bean.count = 0;
                }
                else
                {
                    sound.type = egret.Sound.EFFECT;
                    bean.count = 1;
                }

                soundMap.put(url, bean);
                //唯一的hashCode
                soundMap.put(sound.hashCode, bean);
                //附带个数据
                //添加加载完成侦听
                sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                //开始加载
                sound.load(url);

            }
        }
        private static onBgSound(): void
        {
            if (this.currentBg.channel)
                this.currentBg.channel.stop();

            //播放音乐（这段代码可以提取）
            let channel: egret.SoundChannel = this.currentBg.channel = this.currentBg.sound.play(0);
            channel.volume = this.volumeBg;
        }
        private static onSoundComplete(event: egret.Event): void 
        {
            let channel = <egret.SoundChannel>event.target;
            //channel.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            channel.stop();
            //清除掉状态
            let bean: SoundBean = this.soundMap.remove(channel.hashCode);
            if (bean)
            {
                bean.channel = null;
                bean.isPlay = false;
            }

        }
        // static loadSound(url:string):void
        // {

        // }
        // static playBean(bean:SoundBean):void
        // {

        // }
        private static onLoadError(event: egret.IOErrorEvent): void 
        {
            //获取加载到的 Sound 对象
            var sound: egret.Sound = <egret.Sound>event.target;
            sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            var bean: SoundBean = this.soundMap.remove(sound.hashCode);
            if (bean)
            {
                bean.loading = false;
                console.error("音乐加载失败:" + bean.url);
            }
        }
        private static onLoadComplete(event: egret.Event): void 
        {
            //获取加载到的 Sound 对象
            var sound: egret.Sound = <egret.Sound>event.target;
            sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            var bean: SoundBean = this.soundMap.remove(sound.hashCode);
            //没有根的不进行处理
            if (!bean)
                return;
            bean.loading = false;
            //只有背景音乐才需要加载完成之后播放
            if (bean.isBg)
            {
                if(this.currentBg)
                {
                    if (this.currentBg.channel)
                        this.currentBg.channel.stop();
                    this.currentBg.channel = null;
                }
                bean.isPlay = true;
                //播放音乐（这段代码可以提取）
                let channel: egret.SoundChannel = bean.channel = sound.play(0);
                channel.volume = this.volumeBg;
                this.currentBg = bean;
            }
        }
        // /**
        //  * 播放背景音乐，无限循环，而且同时只能存放一个正在播放的背景音乐
        //  * 播放背景音乐，无限循环，而且同时只能存放一个正在播放的背景音乐
        //  */
        // static playBg(name:string,url:string):void
        // {

        // }
    }
    export class SoundBean
    {
        url: string;
        /** 是否为背景音乐 */
        isBg: boolean;
        /** 正在加载中 */
        loading: boolean;
        /** 音乐实力 */
        sound: egret.Sound;
        /** 当前播放的音乐通道，用来控制音量这些的 */
        channel: egret.SoundChannel;
        /** 音效播放一次1，背景音乐无限循环0 */
        count: number = 1;
        /** 当前音乐是否正在播放中 */
        isPlay: boolean;
    }
}