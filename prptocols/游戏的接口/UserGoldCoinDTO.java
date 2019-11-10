package com.evsoft.modules.api.dto;

import java.math.BigDecimal;

/**
 * User:
 * Date: 2016-11-11
 * Description: No Description
 */
public class UserGoldCoinDTO {
    /**
     * 金币BigDecimal值
     */
    private String goldCoinValue;

    /**
     * 金币数量 带单位
     */
    private String goldCoin;

    private String msg;

    public String getGoldCoinValue() {
        return goldCoinValue;
    }

    public void setGoldCoinValue(String goldCoinValue) {
        this.goldCoinValue = goldCoinValue;
    }

    public String getGoldCoin() {
        return goldCoin;
    }

    public void setGoldCoin(String goldCoin) {
        this.goldCoin = goldCoin;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}