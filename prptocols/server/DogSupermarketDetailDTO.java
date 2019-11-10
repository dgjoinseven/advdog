package com.evsoft.modules.api.dto;

import java.math.BigDecimal;

/**
 * User: jiangyunjian
 * Date: 2019/10/16 20:08
 * Description: No Description
 */
public class DogSupermarketDetailDTO {
    /**
     * 狗级别
     */
    private Integer dogGradeId;

    /**
     * 狗宠物名称
     */
    private String dogLevelName;

    /**
     * 开始购买价格
     */
    private BigDecimal lowBuyValue;

    /**
     * 购买叠加率
     */
    private BigDecimal buyRate;

    /**
     * 最高购买价格
     */
    private BigDecimal hightBuyValue;

    /**
     * 购买次数
     */
    private Integer buyNum;

    /**
     * 当前购买价格
     */
    private String currentPrice;

    /**
     * tlbc是否可购买
     */
    private Integer isBuyTlbc;

    /**
     * 是否可金币购买
     */
    private Integer isBuyGoldcoin;

    /**
     * 是否解锁,1:已解锁,0:未解锁
     */
    private Integer isLock;

    /**
     * tlbc购买价格
     */
    private BigDecimal tlbcPrice;

    public Integer getDogGradeId() {
        return dogGradeId;
    }

    public void setDogGradeId(Integer dogGradeId) {
        this.dogGradeId = dogGradeId;
    }

    public String getDogLevelName() {
        return dogLevelName;
    }

    public void setDogLevelName(String dogLevelName) {
        this.dogLevelName = dogLevelName;
    }

    public BigDecimal getLowBuyValue() {
        return lowBuyValue;
    }

    public void setLowBuyValue(BigDecimal lowBuyValue) {
        this.lowBuyValue = lowBuyValue;
    }

    public BigDecimal getBuyRate() {
        return buyRate;
    }

    public void setBuyRate(BigDecimal buyRate) {
        this.buyRate = buyRate;
    }

    public BigDecimal getHightBuyValue() {
        return hightBuyValue;
    }

    public void setHightBuyValue(BigDecimal hightBuyValue) {
        this.hightBuyValue = hightBuyValue;
    }

    public Integer getBuyNum() {
        return buyNum;
    }

    public void setBuyNum(Integer buyNum) {
        this.buyNum = buyNum;
    }

    public String getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(String currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Integer getIsBuyTlbc() {
        return isBuyTlbc;
    }

    public void setIsBuyTlbc(Integer isBuyTlbc) {
        this.isBuyTlbc = isBuyTlbc;
    }

    public Integer getIsBuyGoldcoin() {
        return isBuyGoldcoin;
    }

    public void setIsBuyGoldcoin(Integer isBuyGoldcoin) {
        this.isBuyGoldcoin = isBuyGoldcoin;
    }

    public Integer getIsLock() {
        return isLock;
    }

    public void setIsLock(Integer isLock) {
        this.isLock = isLock;
    }

    public BigDecimal getTlbcPrice() {
        return tlbcPrice;
    }

    public void setTlbcPrice(BigDecimal tlbcPrice) {
        this.tlbcPrice = tlbcPrice;
    }
}