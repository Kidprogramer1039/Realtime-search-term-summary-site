// src/main/java/com/search/be/ads/controller/AdvertisementController.java
package com.search.be.ads.controller;

import com.search.be.ads.dto.AdPostDto;
import com.search.be.ads.service.AdvertisementService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ads")
@RequiredArgsConstructor
public class AdvertisementController {

    private final AdvertisementService adService;

    // 최신 5개 광고글
    @GetMapping
    public ResponseEntity<List<AdPostDto>> getAds() {
        return ResponseEntity.ok(adService.getRecentAds());
    }

    // 광고글 작성 (토큰 헤더 필요)
    @PostMapping
    public ResponseEntity<AdPostDto> writeAd(
            @RequestHeader("Authorization") String auth,
            @RequestBody AdPostDto req
    ) {
        String token = auth.replace("Bearer ", "");
        return ResponseEntity.ok(adService.writeAd(token, req));
    }
}
