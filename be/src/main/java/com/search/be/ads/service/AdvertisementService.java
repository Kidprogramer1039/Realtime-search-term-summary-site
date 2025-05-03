// src/main/java/com/search/be/ads/service/AdvertisementService.java
package com.search.be.ads.service;

import com.search.be.ads.dto.AdPostDto;

import java.util.List;

public interface AdvertisementService {
    List<AdPostDto> getRecentAds();
    AdPostDto writeAd(String token, AdPostDto request);
}
