package com.search.be.profile.controller;

import com.search.be.board.repository.PostRepository;
import com.search.be.community.repository.CommunityPostRepository;
import com.search.be.login.api.JwtUtil;
import com.search.be.login.dto.ApiResponse;
import com.search.be.login.dto.SuccessStatus;
import com.search.be.login.repository.User;
import com.search.be.login.repository.UserRepository;
import com.search.be.profile.dto.ProfilePostDto;
import com.search.be.profile.dto.ProfileResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final PostRepository          postRepo;
    private final CommunityPostRepository commRepo;
    private final UserRepository          userRepo;
    private final JwtUtil                 jwtUtil;

    @GetMapping
    public ResponseEntity<ApiResponse<ProfileResponseDto>> myProfile(
            @RequestHeader("Authorization") String authHeader) {

        /* ───────── 사용자 식별 ───────── */
        String token  = jwtUtil.getTokenFromHeader(authHeader);
        UUID   userId = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User   user   = userRepo.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));
        String writer = user.getName();

        /* ───────── 글 모으기 ───────── */
        List<ProfilePostDto> list = new ArrayList<>();

        postRepo.findByWriter(writer).forEach(p ->
                list.add(new ProfilePostDto(
                        p.getId(), p.getTitle(), "FREE",
                        p.getViews(), p.getLikes()))
        );
        commRepo.findByWriter(writer).forEach(p ->
                list.add(new ProfilePostDto(
                        p.getId(), p.getTitle(), "COMMUNITY",
                        p.getViews(), p.getLikes()))
        );

        long totalViews = list.stream().mapToLong(ProfilePostDto::getViews).sum();
        long totalLikes = list.stream().mapToLong(ProfilePostDto::getLikes).sum();
        long aggro      = totalViews / 100;   // ★ 100 조회 = 1 포인트

        /* DB에 포인트 저장 (User 엔티티에 setPostPoints 가 있어야 함) */
        user.setPostPoints(aggro);
        userRepo.save(user);

        ProfileResponseDto dto = ProfileResponseDto.builder()
                .username(writer)
                .totalViews(totalViews)
                .totalLikes(totalLikes)
                .aggroPoints(aggro)
                .postCount(list.size())
                .posts(list)
                .build();

        return ApiResponse.onSuccess(SuccessStatus._OK, dto);
    }
}
