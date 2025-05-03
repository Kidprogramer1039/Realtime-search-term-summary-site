// src/main/java/com/search/be/profile/shop/dto/PurchaseResponseDto.java
package com.search.be.profile.shop.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseResponseDto {
    private Long itemId;
    private int remainingPoints;
}
