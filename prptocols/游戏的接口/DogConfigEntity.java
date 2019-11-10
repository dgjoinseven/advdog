package com.evsoft.modules.api.entity;

import java.math.BigDecimal;

/**
 * 
 * @author liuwei
 * @date 2019-10-16 21:00
 */
public class DogConfigEntity {

    /**
     * id
     */
    private Long id;

    /**
     * 等级id
     */
    private Integer gradeId;

    /**
     * 等级name
     */
    private String gradeName;

    /**
     * 开始购买价格
     */
    private BigDecimal lowBuyPrice;

    /**
     * 购买叠加率
     */
    private BigDecimal buyRate;

    /**
     * 最高购买价格
     */
    private BigDecimal hightBuyPrice;

    /**
     * 最高购买次数
     */
    private Integer hightBuyNum;

    /**
     * tlbc购买值
     */
    private BigDecimal tlbcValue;

    /**
     * tlbc是否可以购买
     */
    private Integer isTlbc;

    /**
     * 回收值
     */
    private BigDecimal recoveryValue;

    /**
     * 回收率
     */
    private BigDecimal recoveryRate;

    /**
     * 在线产生的值/秒
     */
    private BigDecimal onlineProduceValue;

    /**
     * 离线产生的值/秒
     */
    private BigDecimal offlineProduceValue;

    /**
     * 预留字段1
     */
    private String reserved1;

    /**
     * 预留字段2
     */
    private String reserved2;

    /**
     * 预留字段3
     */
    private String reserved3;

    /**
     * 状态 0-默认  -1 失败
     */
    private Integer status;

    /**
     * 创建人
     */
    private String createBy;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 更新人
     */
    private String updateBy;

    /**
     * 更新时间
     */
    private String updateTime;

    /**
     * tlbc 加速
     */
    private BigDecimal addSpeedTlbc;

    /**
     * 狗粮 加速
     */
    private BigDecimal addSpeedDogfood;

    /**
     * 其他 加速
     */
    private BigDecimal addSpeedOther;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGradeId() {
        return gradeId;
    }

    public void setGradeId(Integer gradeId) {
        this.gradeId = gradeId;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName == null ? null : gradeName.trim();
    }

    public BigDecimal getLowBuyPrice() {
        return lowBuyPrice;
    }

    public void setLowBuyPrice(BigDecimal lowBuyPrice) {
        this.lowBuyPrice = lowBuyPrice;
    }

    public BigDecimal getBuyRate() {
        return buyRate;
    }

    public void setBuyRate(BigDecimal buyRate) {
        this.buyRate = buyRate;
    }

    public BigDecimal getHightBuyPrice() {
        return hightBuyPrice;
    }

    public void setHightBuyPrice(BigDecimal hightBuyPrice) {
        this.hightBuyPrice = hightBuyPrice;
    }

    public Integer getHightBuyNum() {
        return hightBuyNum;
    }

    public void setHightBuyNum(Integer hightBuyNum) {
        this.hightBuyNum = hightBuyNum;
    }

    public BigDecimal getTlbcValue() {
        return tlbcValue;
    }

    public void setTlbcValue(BigDecimal tlbcValue) {
        this.tlbcValue = tlbcValue;
    }

    public Integer getIsTlbc() {
        return isTlbc;
    }

    public void setIsTlbc(Integer isTlbc) {
        this.isTlbc = isTlbc;
    }

    public BigDecimal getRecoveryValue() {
        return recoveryValue;
    }

    public void setRecoveryValue(BigDecimal recoveryValue) {
        this.recoveryValue = recoveryValue;
    }

    public BigDecimal getRecoveryRate() {
        return recoveryRate;
    }

    public void setRecoveryRate(BigDecimal recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public BigDecimal getOnlineProduceValue() {
        return onlineProduceValue;
    }

    public void setOnlineProduceValue(BigDecimal onlineProduceValue) {
        this.onlineProduceValue = onlineProduceValue;
    }

    public BigDecimal getOfflineProduceValue() {
        return offlineProduceValue;
    }

    public void setOfflineProduceValue(BigDecimal offlineProduceValue) {
        this.offlineProduceValue = offlineProduceValue;
    }

    public String getReserved1() {
        return reserved1;
    }

    public void setReserved1(String reserved1) {
        this.reserved1 = reserved1 == null ? null : reserved1.trim();
    }

    public String getReserved2() {
        return reserved2;
    }

    public void setReserved2(String reserved2) {
        this.reserved2 = reserved2 == null ? null : reserved2.trim();
    }

    public String getReserved3() {
        return reserved3;
    }

    public void setReserved3(String reserved3) {
        this.reserved3 = reserved3 == null ? null : reserved3.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy == null ? null : createBy.trim();
    }

    public String getCreateTime() {
        return createTime;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy == null ? null : updateBy.trim();
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public BigDecimal getAddSpeedTlbc() {
        return addSpeedTlbc;
    }

    public void setAddSpeedTlbc(BigDecimal addSpeedTlbc) {
        this.addSpeedTlbc = addSpeedTlbc;
    }

    public BigDecimal getAddSpeedDogfood() {
        return addSpeedDogfood;
    }

    public void setAddSpeedDogfood(BigDecimal addSpeedDogfood) {
        this.addSpeedDogfood = addSpeedDogfood;
    }

    public BigDecimal getAddSpeedOther() {
        return addSpeedOther;
    }

    public void setAddSpeedOther(BigDecimal addSpeedOther) {
        this.addSpeedOther = addSpeedOther;
    }
}