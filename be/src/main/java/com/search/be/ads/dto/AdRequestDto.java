// be/src/main/java/com/search/be/ads/dto/AdRequestDto.java
package com.search.be.ads.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdRequestDto {
    private String title;    // <- 반드시 이 이름
    private String content;  // <- 반드시 이 이름
}
