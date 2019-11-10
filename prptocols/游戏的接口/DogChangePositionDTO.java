package com.evsoft.modules.api.dto;

/**
 * User: jiangyunjian
 * Date: 2019/10/24 10:08
 * Description: No Description
 */
public class DogChangePositionDTO {
    /**
     * 开始 狗级别id 1-44
     */
    private Integer fromDogGradeId;

    /**
     * 目的 狗级别id 1-44
     */
    private Integer toDogGradeId;

    /**
     * 开始 位置id
     */
    private Integer fromPositionId;

    /**
     * 目的 位置id
     */
    private Integer toPositionId;

    private String msg;

    public Integer getFromDogGradeId() {
        return fromDogGradeId;
    }

    public void setFromDogGradeId(Integer fromDogGradeId) {
        this.fromDogGradeId = fromDogGradeId;
    }

    public Integer getToDogGradeId() {
        return toDogGradeId;
    }

    public void setToDogGradeId(Integer toDogGradeId) {
        this.toDogGradeId = toDogGradeId;
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

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}