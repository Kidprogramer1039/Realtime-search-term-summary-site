package com.search.be.board.controller;

import com.search.be.board.dto.CreatePostRequest;
import com.search.be.board.entity.Post;
import com.search.be.board.repository.PostRepository;
import com.search.be.login.api.JwtUtil;
import com.search.be.login.dto.ApiResponse;
import com.search.be.login.dto.SuccessStatus;
import com.search.be.login.repository.User;
import com.search.be.login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody CreatePostRequest request
    ) {
        // 1) 헤더에서 토큰만 추출
        String token = jwtUtil.getTokenFromHeader(authorizationHeader);
        // 2) 토큰 → userId → User 조회
        UUID userUuid = UUID.fromString(jwtUtil.getUserIdFromToken(token));
        User user = userRepository.findByUserId(userUuid)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 3) Post 생성
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .writer(user.getName())       // 이제 null 아님
                .createdAt(LocalDateTime.now())
                .build();
        postRepository.save(post);

        return ApiResponse.onSuccess(SuccessStatus._CREATED, post);
    }
}
