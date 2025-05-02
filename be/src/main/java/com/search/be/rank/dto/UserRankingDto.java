package com.search.be.rank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRankingDto {
    private final String writer;
    private final Long   totalViews;
}
