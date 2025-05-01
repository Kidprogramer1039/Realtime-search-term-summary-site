// src/main/java/com/search/be/board/controller/PostController.java
package com.search.be.board.controller;

import com.search.be.board.dto.CreatePostRequest;
import com.search.be.board.dto.PostResponseDto;
import com.search.be.board.entity.Post;
import com.search.be.board.repository.PostRepository;
import com.search.be.login.api.JwtUtil;
import com.search.be.login.dto.ApiResponse;
import com.search.be.login.dto.SuccessStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostRepository postRepository;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestHeader("X-User-Name") String writer,
            @RequestBody CreatePostRequest request
    ) {
        // 토큰 유효성 체크
        String token = jwtUtil.getTokenFromHeader(authorizationHeader);
        jwtUtil.getUserIdFromToken(token);

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .writer(writer)
                .createdAt(LocalDateTime.now())
                .build();
        postRepository.save(post);

        return ApiResponse.onSuccess(SuccessStatus._CREATED, post);
    }

    /**
     * 내 글만 조회 (인증 필요)
     */
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<PostResponseDto>>> getMyPosts(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestHeader("X-User-Name") String writer
    ) {
        // 토큰 유효성 체크
        String token = jwtUtil.getTokenFromHeader(authorizationHeader);
        jwtUtil.getUserIdFromToken(token);

        log.info("[GET /api/v1/posts/my] 요청받음 - writer={}", writer);

        List<PostResponseDto> response = postRepository
                .findByWriter(writer)
                .stream()
                .map(p -> PostResponseDto.builder()
                        .id(p.getId())
                        .title(p.getTitle())
                        .content(p.getContent())
                        .writer(p.getWriter())
                        .createdAt(p.getCreatedAt())
                        .build()
                ).collect(Collectors.toList());

        log.info("[GET /api/v1/posts/my] 반환 게시물 개수={}", response.size());
        return ApiResponse.onSuccess(SuccessStatus._OK, response);
    }

    /**
     * 전체 글 조회 (공개용, 인증 불필요)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostResponseDto>>> getAllPosts() {
        List<PostResponseDto> list = postRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(p -> PostResponseDto.builder()
                        .id(p.getId())
                        .title(p.getTitle())
                        .content(p.getContent())
                        .writer(p.getWriter())
                        .createdAt(p.getCreatedAt())
                        .build()
                ).collect(Collectors.toList());

        return ApiResponse.onSuccess(SuccessStatus._OK, list);
    }
}
