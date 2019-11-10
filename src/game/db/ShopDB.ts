namespace game
{
    /**
     * 商店的本地缓存数据
     */
    export class ShopDB implements mvc.IModel
    {
        static NAME:string = "shopDB";

        private shopDogMap:asf.HashMap<number,ShopPetVo>;

        
        init():void
        {
            console.info("商店的本地DB初始化了");
            this.shopDogMap = new asf.HashMap<number,ShopPetVo>();
        }
        /**
         * 更新商店的狗狗信息
         */
        update(data:DogSupermarketDTOVo):void
        {
            let dataList = data.lists;
            //生成狗的列表
            for(let i:number = 0; i < dataList.length; i++)
            {
                let petVo = dataList[i];
                this.updateDogItem(petVo);
            }
        }
        /**
         * 更新狗狗的商店信息，并且缓存起来，很多地方用到的
         */
        updateDogItem(item:ShopPetVo):void
        {
            this.shopDogMap.put(item.dogGradeId,item);
        }
        /**
         * 根据狗狗的等级，获取对应狗在商店的信息
         */
        getShopPetVo(dogLv:number):ShopPetVo
        {
            return this.shopDogMap.get(dogLv);
        }
    }
}