// src/main/java/com/search/be/profile/shop/service/ShopServiceImpl.java
package com.search.be.profile.shop.service;

import com.search.be.profile.shop.dto.ItemDto;
import com.search.be.profile.shop.dto.PurchaseRequestDto;
import com.search.be.profile.shop.dto.PurchaseResponseDto;
import com.search.be.profile.shop.entity.Item;
import com.search.be.profile.shop.entity.Purchase;
import com.search.be.profile.shop.repository.ItemRepository;
import com.search.be.profile.shop.repository.PurchaseRepository;
import com.search.be.login.api.JwtUtil;
import com.search.be.login.repository.UserRepository;
import com.search.be.login.repository.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {

    private final ItemRepository itemRepository;
    private final PurchaseRepository purchaseRepository;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public List<ItemDto> getAllItems(String token) {
        return itemRepository.findAll().stream()
                .map(item -> ItemDto.builder()
                        .id(item.getId())
                        .name(item.getName())
                        .description(item.getDescription())
                        .cost(item.getCost())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public int getUserPoints(String token) {
        UUID userUuid = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User user = userRepository.findByUserId(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));
        return user.getPostPoints();
    }

    @Override
    public int getUserPurchaseCount(String token) {
        // 토큰 → UUID → User 조회 → 구매 수 리턴
        UUID userUuid = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User user = userRepository.findByUserId(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));
        return (int) purchaseRepository.countByUserId(user.getId());
    }

    @Override
    @Transactional
    public PurchaseResponseDto purchaseItem(String token, PurchaseRequestDto request) {
        UUID userUuid = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User user = userRepository.findByUserId(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이템입니다."));

        int currentPoints = user.getPostPoints();
        if (currentPoints < item.getCost()) {
            throw new IllegalStateException("포인트가 부족합니다.");
        }

        // 포인트 차감 및 postCount 증가
        user.setPostPoints(currentPoints - item.getCost());
        user.setPostCount(user.getPostCount() + 1);
        userRepository.save(user);

        // 구매 기록 저장
        Purchase purchase = Purchase.builder()
                .userId(user.getId())
                .itemId(item.getId())
                .purchasedAt(LocalDateTime.now())
                .build();
        purchaseRepository.save(purchase);

        return PurchaseResponseDto.builder()
                .itemId(item.getId())
                .remainingPoints(user.getPostPoints())
                .build();
    }

}
