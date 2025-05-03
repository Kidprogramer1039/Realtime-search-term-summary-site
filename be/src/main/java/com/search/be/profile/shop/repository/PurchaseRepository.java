// src/main/java/com/search/be/profile/shop/repository/PurchaseRepository.java
package com.search.be.profile.shop.repository;

import com.search.be.profile.shop.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    // 사용자별 구매 횟수 조회
    long countByUserId(Long userId);
}
