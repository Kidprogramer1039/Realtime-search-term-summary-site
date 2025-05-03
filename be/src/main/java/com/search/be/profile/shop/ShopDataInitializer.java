// src/main/java/com/search/be/profile/shop/ShopDataInitializer.java
package com.search.be.profile.shop;

import com.search.be.profile.shop.entity.Item;
import com.search.be.profile.shop.repository.ItemRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ShopDataInitializer {

    private final ItemRepository itemRepository;

    @PostConstruct
    public void init() {
        // 이미 등록된 적 없다면 한 번만 저장
        if (!itemRepository.existsByName("1회 광고권")) {
            itemRepository.save(Item.builder()
                    .name("1회 광고권")
                    .description("광고를 1회 게재할 수 있는 권리")
                    .cost(100)      // 100 어그로 포인트
                    .build());
        }
    }
}
