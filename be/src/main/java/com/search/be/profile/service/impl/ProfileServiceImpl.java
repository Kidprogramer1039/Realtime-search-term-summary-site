// src/main/java/com/search/be/profile/service/impl/ProfileServiceImpl.java
package com.search.be.profile.service.impl;

import com.search.be.board.repository.PostRepository;
import com.search.be.profile.dto.ProfileDto;
import com.search.be.profile.service.ProfileService;
import com.search.be.login.api.JwtUtil;
import com.search.be.login.repository.User;
import com.search.be.login.repository.UserRepository;
import com.search.be.profile.shop.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    @Transactional(readOnly = true)
    public ProfileDto myProfile(String token) {
        // 1) 토큰에서 UUID 추출 후 유저 조회
        UUID userUuid = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User user = userRepository.findByUserId(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 2) 글 통계 (조회수, 좋아요 합계)
        long totalViews = postRepository.sumViewsByWriter(user.getId());
        long totalLikes = postRepository.sumLikesByWriter(user.getId());

        // 3) remain_points 컬럼에서 그대로 남은 포인트 꺼내기
        int remainPoints = user.getRemainPoints();

        // 4) 구매한 광고권 개수
        int adCount = (int) purchaseRepository.countByUserId(user.getId());

        // 5) DTO 조립
        return ProfileDto.builder()
                .username(user.getName())
                .postCount(user.getPostCount())
                .totalViews(totalViews)
                .totalLikes(totalLikes)
                .aggroPoints(remainPoints)
                .adCount(adCount)
                .build();
    }
}
