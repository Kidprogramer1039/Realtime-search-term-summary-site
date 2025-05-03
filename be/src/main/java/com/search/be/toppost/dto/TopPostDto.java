package com.search.be.toppost.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TopPostDto {
    private final Long   id;
    private final String title;
    private final String writer;
    private final Long   hits;      // views or likes
    private final String board;     // FREE / COMMUNITY
}
