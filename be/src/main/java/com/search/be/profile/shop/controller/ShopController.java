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

    /** 1) 상품 목록 조회 */
    @GetMapping("/items")
    public ResponseEntity<List<ItemDto>> getAllItems(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        List<ItemDto> items = shopService.getAllItems(token);
        return ResponseEntity.ok(items);
    }

    /** 2) 내 포인트 조회 */
    @GetMapping("/points")
    public ResponseEntity<Map<String,Integer>> getUserPoints(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        int points = shopService.getUserPoints(token);
        return ResponseEntity.ok(Collections.singletonMap("points", points));
    }

    /** 3) 광고권(아이템) 구매 */
    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResponseDto> purchaseItem(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody PurchaseRequestDto req
    ) {
        String token = authHeader.replace("Bearer ", "");
        PurchaseResponseDto resp = shopService.purchaseItem(token, req);
        return ResponseEntity.ok(resp);
    }

    /** 4) 내가 구매한 광고권 개수 조회 */
    @GetMapping("/purchase/count")
    public ResponseEntity<Map<String,Integer>> countPurchases(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        int cnt = shopService.getUserPurchaseCount(token);
        return ResponseEntity.ok(Collections.singletonMap("count", cnt));
    }
}
