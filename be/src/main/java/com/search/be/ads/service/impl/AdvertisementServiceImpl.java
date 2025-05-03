// src/main/java/com/search/be/ads/service/impl/AdvertisementServiceImpl.java
package com.search.be.ads.service.impl;

import com.search.be.ads.dto.AdPostDto;
import com.search.be.ads.entity.AdvertisementPost;
import com.search.be.ads.repository.AdvertisementPostRepository;
import com.search.be.profile.shop.repository.PurchaseRepository;
import com.search.be.login.repository.User;
import com.search.be.login.repository.UserRepository;
import com.search.be.login.api.JwtUtil;
import com.search.be.ads.service.AdvertisementService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdvertisementServiceImpl implements AdvertisementService {

    private final AdvertisementPostRepository adRepo;
    private final PurchaseRepository purchaseRepo;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    @Override
    public List<AdPostDto> getRecentAds() {
        return adRepo.findTop5ByOrderByCreatedAtDesc().stream()
                .map(ad -> AdPostDto.builder()
                        .id(ad.getId())
                        .title(ad.getTitle())
                        .content(ad.getContent())
                        .views(ad.getViews())
                        .likes(ad.getLikes())
                        .createdAt(ad.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AdPostDto writeAd(String token, AdPostDto req) {
        // 1) 토큰 → 유저 조회
        UUID uuid = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User user = userRepo.findByUserId(uuid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        // 2) 광고권 확인 (가장 오래된 구매 기록 한 건)
        var optPurchase = purchaseRepo.findFirstByUserIdOrderByPurchasedAtAsc(user.getId());
        var purchase = optPurchase.orElseThrow(() -> new IllegalStateException("광고권이 없습니다."));
        // 3) 광고권 사용(삭제)
        purchaseRepo.delete(purchase);

        // 4) 광고글 저장
        AdvertisementPost saved = adRepo.save(
                AdvertisementPost.builder()
                        .title(req.getTitle())
                        .content(req.getContent())
                        .writerId(user.getId())
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        // 5) DTO 반환
        return AdPostDto.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .content(saved.getContent())
                .views(saved.getViews())
                .likes(saved.getLikes())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}
