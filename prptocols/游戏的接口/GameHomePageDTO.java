package com.evsoft.modules.api.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * User:
 * Date: 2019/10/15 21:54
 * Description: 游戏首页DTO
 */
public class GameHomePageDTO {
    /**
     * 用户id
     */
    private Long userId;

    /**
     * 金币数量 带单位
     */
    private String goldCoin;

    /**
     * TLBC
     */
    private BigDecimal tlbc;

    /**
     * 开始时间
     */
    private String startTime;

    /**
     * 服务器时间
     */
    private String serverTime;

    /**
     * 金币时间间隔 单位小时
     */
    private Integer intervalTime;

    /**
     * 排位1狗id
     */
    private Integer position1;

    /**
     * 排位2狗id
     */
    private Integer position2;

    /**
     * 排位3狗id
     */
    private Integer position3;

    /**
     * 排位4狗id
     */
    private Integer position4;

    /**
     * 排位5狗id
     */
    private Integer position5;

    /**
     * 排位6狗id
     */
    private Integer position6;

    /**
     * 排位7狗id
     */
    private Integer position7;

    /**
     * 排位8狗id
     */
    private Integer position8;

    /**
     * 排位9狗id
     */
    private Integer position9;

    /**
     * 排位10狗id
     */
    private Integer position10;

    /**
     * 排位11狗id
     */
    private Integer position11;

    /**
     * 排位12狗id
     */
    private Integer position12;

    /**
     * 狗级别 屏幕中间的狗级别
     */
    private Integer dogGradeId;

    /**
     * 当前购买价格
     */
    private String currentPrice;

    /**
     * 离线收益,若小于等于0 不显示弹框
     */
    private String offlineGoldCoin;

    /**
     * 上次离线收益值,若小于等于0 不显示弹框
     */
    private String lastOfflineGoldCoin;

    /**
     * 最高等级宠物名称
     */
    private String maxLevelName;

    /**
     * 最高宠物等级
     */
    private Integer maxLevel;

    /**
     * 当前可买龙的级别
     */
    //private Integer currentLevel;

    /**
     * tlbc的间隔 以及 待收的数据
     */
    private TlbcDTO tlbcDTO;

    /**
     * 狗粮总值
     */
    private Integer dogFoodCount=0;

    /**
     * 分红总金额
     */
    private String shareTotalAmount = "计算中";

    /**
     * 金币BigDecimal值
     */
    private String goldCoinValue;


    /**
     * 显示宠物名称
     */
    private String showLevelName;

    /**
     * 显示宠物等级
     */
    private Integer showLevel;


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getGoldCoin() {
        return goldCoin;
    }

    public void setGoldCoin(String goldCoin) {
        this.goldCoin = goldCoin;
    }

    public BigDecimal getTlbc() {
        return tlbc;
    }

    public void setTlbc(BigDecimal tlbc) {
        this.tlbc = tlbc;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getServerTime() {
        return serverTime;
    }

    public void setServerTime(String serverTime) {
        this.serverTime = serverTime;
    }

    public Integer getIntervalTime() {
        return intervalTime;
    }

    public void setIntervalTime(Integer intervalTime) {
        this.intervalTime = intervalTime;
    }


    public String getOfflineGoldCoin() {
        return offlineGoldCoin;
    }

    public void setOfflineGoldCoin(String offlineGoldCoin) {
        this.offlineGoldCoin = offlineGoldCoin;
    }

    public Integer getPosition1() {
        return position1;
    }

    public void setPosition1(Integer position1) {
        this.position1 = position1;
    }

    public Integer getPosition2() {
        return position2;
    }

    public void setPosition2(Integer position2) {
        this.position2 = position2;
    }

    public Integer getPosition3() {
        return position3;
    }

    public void setPosition3(Integer position3) {
        this.position3 = position3;
    }

    public Integer getPosition4() {
        return position4;
    }

    public void setPosition4(Integer position4) {
        this.position4 = position4;
    }

    public Integer getPosition5() {
        return position5;
    }

    public void setPosition5(Integer position5) {
        this.position5 = position5;
    }

    public Integer getPosition6() {
        return position6;
    }

    public void setPosition6(Integer position6) {
        this.position6 = position6;
    }

    public Integer getPosition7() {
        return position7;
    }

    public void setPosition7(Integer position7) {
        this.position7 = position7;
    }

    public Integer getPosition8() {
        return position8;
    }

    public void setPosition8(Integer position8) {
        this.position8 = position8;
    }

    public Integer getPosition9() {
        return position9;
    }

    public void setPosition9(Integer position9) {
        this.position9 = position9;
    }

    public Integer getPosition10() {
        return position10;
    }

    public void setPosition10(Integer position10) {
        this.position10 = position10;
    }

    public Integer getPosition11() {
        return position11;
    }

    public void setPosition11(Integer position11) {
        this.position11 = position11;
    }

    public Integer getPosition12() {
        return position12;
    }

    public void setPosition12(Integer position12) {
        this.position12 = position12;
    }

    public Integer getDogGradeId() {
        return dogGradeId;
    }

    public void setDogGradeId(Integer dogGradeId) {
        this.dogGradeId = dogGradeId;
    }

    public String getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(String currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getMaxLevelName() {
        return maxLevelName;
    }

    public void setMaxLevelName(String maxLevelName) {
        this.maxLevelName = maxLevelName;
    }

    public Integer getMaxLevel() {
        return maxLevel;
    }

    public void setMaxLevel(Integer maxLevel) {
        this.maxLevel = maxLevel;
    }

    /*public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }*/

    public TlbcDTO getTlbcDTO() {
        return tlbcDTO;
    }

    public void setTlbcDTO(TlbcDTO tlbcDTO) {
        this.tlbcDTO = tlbcDTO;
    }

    public Integer getDogFoodCount() {
        return dogFoodCount;
    }

    public void setDogFoodCount(Integer dogFoodCount) {
        this.dogFoodCount = dogFoodCount;
    }

    public String getShareTotalAmount() {
        return shareTotalAmount;
    }

    public void setShareTotalAmount(String shareTotalAmount) {
        this.shareTotalAmount = shareTotalAmount;
    }

    public String getLastOfflineGoldCoin() {
        return lastOfflineGoldCoin;
    }

    public void setLastOfflineGoldCoin(String lastOfflineGoldCoin) {
        this.lastOfflineGoldCoin = lastOfflineGoldCoin;
    }

    public String getGoldCoinValue() {
        return goldCoinValue;
    }

    public void setGoldCoinValue(String goldCoinValue) {
        this.goldCoinValue = goldCoinValue;
    }

    public String getShowLevelName() {
        return showLevelName;
    }

    public void setShowLevelName(String showLevelName) {
        this.showLevelName = showLevelName;
    }

    public Integer getShowLevel() {
        return showLevel;
    }

    public void setShowLevel(Integer showLevel) {
        this.showLevel = showLevel;
    }
}