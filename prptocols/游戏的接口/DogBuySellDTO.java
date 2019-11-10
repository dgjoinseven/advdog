package com.evsoft.modules.api.dto;

/**
 * User: jiangyunjian
 * Date: 2019/10/24 9:47
 * Description: No Description
 */
public class DogBuySellDTO {
    /**
     * 当前金币数量 带单位
     */
    private String goldCoin;

    /**
     * 狗级别id 1-44
     */
    private Integer dogGradeId;

    /**
     * 回收金币
     */
    private String recoveryGoldCoin;

    /**
     * 位置id（购买狗存放位置和销毁狗的位置id）
     */
    private Integer positionId;

    /**
     * 下次购买狗价格
     */
    private String currentPrice;

    /**
     * 信息
     */
    private String msg;

    public String getGoldCoin() {
        return goldCoin;
    }

    public void setGoldCoin(String goldCoin) {
        this.goldCoin = goldCoin;
    }

    public Integer getDogGradeId() {
        return dogGradeId;
    }

    public void setDogGradeId(Integer dogGradeId) {
        this.dogGradeId = dogGradeId;
    }

    public String getRecoveryGoldCoin() {
        return recoveryGoldCoin;
    }

    public void setRecoveryGoldCoin(String recoveryGoldCoin) {
        this.recoveryGoldCoin = recoveryGoldCoin;
    }

    public Integer getPositionId() {
        return positionId;
    }

    public void setPositionId(Integer positionId) {
        this.positionId = positionId;
    }

    public String getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(String currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}