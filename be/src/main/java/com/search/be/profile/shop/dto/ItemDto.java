// src/main/java/com/search/be/profile/shop/dto/ItemDto.java
package com.search.be.profile.shop.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemDto {
    private Long id;
    private String name;
    private String description;
    private int cost;
}
