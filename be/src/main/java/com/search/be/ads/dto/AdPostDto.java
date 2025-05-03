// src/main/java/com/search/be/ads/dto/AdPostDto.java
package com.search.be.ads.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AdPostDto {
    private Long id;
    private String title;
    private String content;
    private int views;
    private int likes;
    private LocalDateTime createdAt;
}
