// src/main/java/com/search/be/profile/shop/repository/ItemRepository.java
package com.search.be.profile.shop.repository;

import com.search.be.profile.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // '1회 광고권' 같은 이름으로 이미 등록되었는지 확인
    boolean existsByName(String name);
}
