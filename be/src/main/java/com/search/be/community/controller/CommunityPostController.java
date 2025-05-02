package com.search.be.community.controller;

import com.search.be.board.dto.CreatePostRequest;
import com.search.be.board.dto.PostResponseDto;
import com.search.be.community.service.CommunityPostService;
import com.search.be.login.api.JwtUtil;
import com.search.be.login.dto.ApiResponse;
import com.search.be.login.dto.SuccessStatus;
import com.search.be.login.repository.User;
import com.search.be.login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/community-posts")
@RequiredArgsConstructor
public class CommunityPostController {

    private final CommunityPostService service;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    /* 목록 */
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostResponseDto>>> list() {
        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.getAll()
        );
    }

    /* 글쓰기 */
    @PostMapping
    public ResponseEntity<ApiResponse<PostResponseDto>> write(
            @RequestHeader("Authorization") String auth,
            @RequestBody CreatePostRequest req) {

        String token = jwtUtil.getTokenFromHeader(auth);
        String uid   = jwtUtil.getUserIdFromToken(token);
        User user = userRepo.findByUserId(UUID.fromString(uid))
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        return ApiResponse.onSuccess(
                SuccessStatus._CREATED,
                service.write(req, user.getName())
        );
    }

    /* 상세 */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponseDto>> read(@PathVariable Long id) {
        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.getById(id)
        );
    }

    /* 좋아요 */
    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Long>> like(@PathVariable Long id) {
        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.like(id)
        );
    }

    /* 내가 쓴 글 */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<PostResponseDto>>> myPosts(
            @RequestHeader("Authorization") String auth) {

        String token = jwtUtil.getTokenFromHeader(auth);
        String uid   = jwtUtil.getUserIdFromToken(token);
        User user = userRepo.findByUserId(UUID.fromString(uid))
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.getMine(user.getName())
        );
    }
}
