package com.search.be.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfilePostDto {
    private Long   id;
    private String title;
    private String board;   // FREE | COMMUNITY
    private Long   views;
    private Long   likes;
}
