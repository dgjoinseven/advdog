package com.evsoft.modules.api.dto;

/**
 * User: jiangyunjian
 * Date: 2019/10/23 16:24
 * Description: No Description
 */
public class LookVideoCountDTO {

    /**
     * 类型 4.喂狗粮食 5.加速 是全局的次数(每天15次) 6.金币不足看视频 商品点击购买次数每天3次 8 离线收益
     */
    private Integer lookType;

    /**
     * 看视频剩余次数 4.喂狗粮食 5.加速 是全局的次数(每天15次) 6.金币不足看视频 商品点击购买次数每天3次
     */
    private Integer remainingTimes;

    /**
     * 当前端传入6的时候返回 看视频获取金币数量, 当前传递类型=8 的时候返回离线收益的金币
     */
    private String getGoldCoin;

    private String msg;

    public Integer getLookType() {
        return lookType;
    }

    public void setLookType(Integer lookType) {
        this.lookType = lookType;
    }

    public Integer getRemainingTimes() {
        return remainingTimes;
    }

    public void setRemainingTimes(Integer remainingTimes) {
        this.remainingTimes = remainingTimes;
    }

    public String getGetGoldCoin() {
        return getGoldCoin;
    }

    public void setGetGoldCoin(String getGoldCoin) {
        this.getGoldCoin = getGoldCoin;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}