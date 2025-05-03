// src/main/java/com/search/be/ads/repository/AdvertisementPostRepository.java
package com.search.be.ads.repository;

import com.search.be.ads.entity.AdvertisementPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdvertisementPostRepository extends JpaRepository<AdvertisementPost, Long> {
    // 최신 5개 광고글
    List<AdvertisementPost> findTop5ByOrderByCreatedAtDesc();
}
