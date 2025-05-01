package com.search.be.board.controller;

import com.search.be.board.dto.CreatePostRequest;
import com.search.be.board.dto.PostResponseDto;
import com.search.be.board.entity.Post;
import com.search.be.board.repository.PostRepository;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostRepository postRepository;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    /** 전체 조회 */
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
                        .views(p.getViews())
                        .likes(p.getLikes())
                        .build()
                )
                .collect(Collectors.toList());

        return ApiResponse.onSuccess(SuccessStatus._OK, list);
    }

    /** 글 쓰기 */
    @PostMapping
    public ResponseEntity<ApiResponse<PostResponseDto>> create(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody CreatePostRequest request
    ) {
        // --- 토큰에서 사용자 정보 추출 ---
        String token = jwtUtil.getTokenFromHeader(authorizationHeader);
        String userIdStr = jwtUtil.getUserIdFromToken(token);
        UUID userId = UUID.fromString(userIdStr);
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다. userId=" + userId));

        // --- 게시글 생성 및 저장 ---
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .writer(user.getName())
                .build();  // views, likes, createdAt 등은 @Builder.Default로 기본값 설정
        postRepository.save(post);

        // --- 응답 DTO 생성 ---
        PostResponseDto dto = PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .writer(post.getWriter())
                .createdAt(post.getCreatedAt())
                .views(post.getViews())
                .likes(post.getLikes())
                .build();

        return ApiResponse.onSuccess(SuccessStatus._CREATED, dto);
    }

    /** 상세 조회 (views++) */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponseDto>> getPostById(
            @PathVariable Long id
    ) {
        Post p = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다. id=" + id));

        p.incrementViews();
        postRepository.save(p);

        PostResponseDto dto = PostResponseDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .content(p.getContent())
                .writer(p.getWriter())
                .createdAt(p.getCreatedAt())
                .views(p.getViews())
                .likes(p.getLikes())
                .build();

        return ApiResponse.onSuccess(SuccessStatus._OK, dto);
    }

    /** 좋아요 증가 */
    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Long>> likePost(
            @PathVariable Long id
    ) {
        Post p = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다. id=" + id));

        p.incrementLikes();
        postRepository.save(p);

        return ApiResponse.onSuccess(SuccessStatus._OK, p.getLikes());
    }

    // … (기존 getMyPosts 등) …
}
