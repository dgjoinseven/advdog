package com.evsoft.modules.api.dto;

/**
 * User: jiangyunjian
 * Date: 2019/10/24 10:24
 * Description: No Description
 */
public class DogMergeDTO {
    /**
     * 最高等级宠物名称
     */
    private String maxLevelName;

    /**
     * 最高宠物等级
     */
    private Integer maxLevel;

    /**
     * 合并后狗等级
     */
    private Integer MergeLevel;

    /**
     * 开始 位置id 后端置位0，前端为空格
     */
    private Integer fromPositionId;

    /**
     * 目的 位置id
     */
    private Integer toPositionId;

    /**
     * 狗级别 屏幕中间的狗级别
     */
    private Integer dogGradeId;

    /**
     *  屏幕中间狗 当前购买价格
     */
    private String currentPrice;

    /**
     * 开始 位置id 后端置位0，前端为空格
     */
    private String StrfromPositionId;

    /**
     *  信息
     */
    private String msg;

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

    public Integer getMergeLevel() {
        return MergeLevel;
    }

    public void setMergeLevel(Integer mergeLevel) {
        MergeLevel = mergeLevel;
    }

    public Integer getFromPositionId() {
        return fromPositionId;
    }

    public void setFromPositionId(Integer fromPositionId) {
        this.fromPositionId = fromPositionId;
    }

    public Integer getToPositionId() {
        return toPositionId;
    }

    public void setToPositionId(Integer toPositionId) {
        this.toPositionId = toPositionId;
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

    public String getStrfromPositionId() {
        return StrfromPositionId;
    }

    public void setStrfromPositionId(String strfromPositionId) {
        StrfromPositionId = strfromPositionId;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}