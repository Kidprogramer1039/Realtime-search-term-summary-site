// src/main/java/com/search/be/profile/shop/service/ShopService.java
package com.search.be.profile.shop.service;

import com.search.be.profile.shop.dto.*;
import java.util.List;

public interface ShopService {
    List<ItemDto> getAllItems(String token);
    int getUserPoints(String token);
    PurchaseResponseDto purchaseItem(String token, PurchaseRequestDto request);
    // 추가: 광고권(구매) 횟수 조회
    int getUserPurchaseCount(String token);

}
