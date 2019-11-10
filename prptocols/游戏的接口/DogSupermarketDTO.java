package com.evsoft.modules.api.dto;

import com.evsoft.modules.api.entity.GameDogSupermarketEntity;

import java.util.List;

/**
 * User: jiangyunjian
 * Date: 2019/10/16 20:03
 * Description: No Description
 */
public class DogSupermarketDTO {
    /**
     * 用户id
     */
    private Long userId;

    /**
     * 金币数量 带单位
     */
    private String goldCoin;

    /**
     * 当前最大级别
     */
    private Integer maxGradeId;

    /**
     * 狗级别信息
     */
    private List<DogSupermarketDetailDTO> lists;

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

    public List<DogSupermarketDetailDTO> getLists() {
        return lists;
    }

    public void setLists(List<DogSupermarketDetailDTO> lists) {
        this.lists = lists;
    }

    public Integer getMaxGradeId() {
        return maxGradeId;
    }

    public void setMaxGradeId(Integer maxGradeId) {
        this.maxGradeId = maxGradeId;
    }
}