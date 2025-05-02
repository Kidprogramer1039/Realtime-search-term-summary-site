// src/main/java/com/search/be/community/controller/CommunityPostController.java
package com.search.be.community.controller;

import com.search.be.board.dto.CreatePostRequest;
import com.search.be.board.dto.PostResponseDto;
import com.search.be.community.entity.CommunityPost;
import com.search.be.community.repository.CommunityPostRepository;
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

@Slf4j
@RestController
@RequestMapping("/api/v1/community-posts")
@RequiredArgsConstructor
public class CommunityPostController {

    private final CommunityPostRepository repo;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PostResponseDto>>> list(){
        List<PostResponseDto> list = repo.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
        return ApiResponse.onSuccess(SuccessStatus._OK,list);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PostResponseDto>> write(
            @RequestHeader("Authorization") String auth,
            @RequestBody CreatePostRequest req){

        String token = jwtUtil.getTokenFromHeader(auth);
        String idStr = jwtUtil.getUserIdFromToken(token);
        UUID   uuid  = UUID.fromString(idStr);
        User user = userRepo.findByUserId(uuid)
                .orElseThrow(()->new IllegalArgumentException("no user"));

        CommunityPost saved = repo.save(
                CommunityPost.builder()
                        .title(req.getTitle())
                        .content(req.getContent())
                        .writer(user.getName())
                        .build()
        );
        return ApiResponse.onSuccess(SuccessStatus._CREATED,toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponseDto>> read(@PathVariable Long id){
        CommunityPost p = repo.findById(id)
                .orElseThrow(()->new IllegalArgumentException("no post"));
        p.incrementViews(); repo.save(p);
        return ApiResponse.onSuccess(SuccessStatus._OK,toDto(p));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Long>> like(@PathVariable Long id){
        CommunityPost p = repo.findById(id)
                .orElseThrow(()->new IllegalArgumentException("no post"));
        p.incrementLikes(); repo.save(p);
        return ApiResponse.onSuccess(SuccessStatus._OK,p.getLikes());
    }

    private PostResponseDto toDto(CommunityPost p){
        return PostResponseDto.builder()
                .id(p.getId()).title(p.getTitle()).content(p.getContent())
                .writer(p.getWriter()).createdAt(p.getCreatedAt())
                .views(p.getViews()).likes(p.getLikes()).build();
    }
}
