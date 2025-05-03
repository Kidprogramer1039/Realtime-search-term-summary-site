// src/main/java/com/search/be/profile/shop/repository/PurchaseRepository.java
package com.search.be.profile.shop.repository;

import com.search.be.profile.shop.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    // 사용자별 구매 횟수 조회
    long countByUserId(Long userId);

    // 광고권 사용 시, 가장 오래된 구매 내역 한 건을 꺼내오기
    Optional<Purchase> findFirstByUserIdOrderByPurchasedAtAsc(Long userId);


}
