// src/main/java/com/search/be/profile/dto/ProfileDto.java
package com.search.be.profile.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileDto {
    private String username;
    private int postCount;
    private long totalViews;
    private long totalLikes;
    private int aggroPoints;  // DB의 remain_points
    private int adCount;      // 구매한 광고권 개수
}
