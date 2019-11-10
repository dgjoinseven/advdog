namespace game
{
    /**
     * 游戏主类，这里开始和具体的项目有关了
     * 
     * // (1)  Math.ceil(等级/5) = 狗狗的形象（1-6）
     * // (2)  等级%5 = 狗狗的星星
     * // (3)  等级大于30级，为高级狗狗，等级%7 有7种颜色
     * // (4)  等级大于等于38级的时候，根据属性判断红包，分红，碎片犬
     */
    export class PetUtls
    {
        /**
         * 根据够的等级获取到对应的星星
         */
        static getDogStar(dogLv:number)
        {
            let star = dogLv % 5;
            if(star == 0)
                return 5;
            return star;
        }
    }
}