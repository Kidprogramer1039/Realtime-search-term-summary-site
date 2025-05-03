// src/main/java/com/search/be/profile/shop/controller/ShopController.java
package com.search.be.profile.shop.controller;

import com.search.be.profile.shop.dto.ItemDto;
import com.search.be.profile.shop.dto.PurchaseRequestDto;
import com.search.be.profile.shop.dto.PurchaseResponseDto;
import com.search.be.profile.shop.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    /** 전체 아이템 목록 조회 */
    @GetMapping("/items")
    public ResponseEntity<List<ItemDto>> getItems(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(shopService.getAllItems(token));
    }

    /** 내 어그로 포인트 조회 */
    @GetMapping("/points")
    public ResponseEntity<Map<String,Integer>> getPoints(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        int pts = shopService.getUserPoints(token);
        return ResponseEntity.ok(Collections.singletonMap("points", pts));
    }

    /** 아이템 구매 (광고권 구매) */
    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResponseDto> purchase(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody PurchaseRequestDto req
    ) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(shopService.purchaseItem(token, req));
    }

    /** 내가 구매한 광고권 개수 조회 */
    @GetMapping("/purchases/count")
    public ResponseEntity<Map<String,Integer>> countPurchases(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        int cnt = shopService.getUserPurchaseCount(token);
        return ResponseEntity.ok(Collections.singletonMap("count", cnt));
    }
}
