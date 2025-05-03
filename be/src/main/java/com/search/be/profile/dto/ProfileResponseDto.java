package com.search.be.profile.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ProfileResponseDto {

    private String  username;
    private Long    totalViews;
    private Long    totalLikes;
    private Long    aggroPoints;   // ← 100 조회당 1 포인트
    private Integer postCount;

    private List<ProfilePostDto> posts;
}
