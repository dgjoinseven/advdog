package com.evsoft.modules.api.dto;

import java.math.BigDecimal;

/**
 * User: jiangyunjian
 * Date: 2019/10/24 10:39
 * Description: No Description
 */
public class BuyDogByTlbcDTO {
    /**
     * 狗级别id 1-44
     */
    private Integer dogGradeId;

    /**
     * 当前剩余tlbc的值 (回收红包狗对应的红包)
     */
    private BigDecimal tlbcValue;

    /**
     * 位置id（购买狗存放位置id）
     */
    private Integer positionId;

    private String msg;

    public Integer getDogGradeId() {
        return dogGradeId;
    }

    public void setDogGradeId(Integer dogGradeId) {
        this.dogGradeId = dogGradeId;
    }

    public BigDecimal getTlbcValue() {
        return tlbcValue;
    }

    public void setTlbcValue(BigDecimal tlbcValue) {
        this.tlbcValue = tlbcValue;
    }

    public Integer getPositionId() {
        return positionId;
    }

    public void setPositionId(Integer positionId) {
        this.positionId = positionId;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}