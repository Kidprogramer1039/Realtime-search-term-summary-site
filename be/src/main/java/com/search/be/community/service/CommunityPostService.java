package com.search.be.community.service;

import com.search.be.board.dto.CreatePostRequest;
import com.search.be.board.dto.PostResponseDto;
import com.search.be.community.entity.CommunityPost;
import com.search.be.community.repository.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityPostService {

    private final CommunityPostRepository repo;

    /* 전체 목록 */
    public List<PostResponseDto> getAll() {
        return repo.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    /* 상세 (조회수 +1) */
    @Transactional
    public PostResponseDto getById(Long id) {
        CommunityPost p = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글"));
        p.incrementViews();
        return toDto(p);
    }

    /* 글쓰기 */
    @Transactional
    public PostResponseDto write(CreatePostRequest req, String writer) {
        CommunityPost saved = repo.save(
                CommunityPost.builder()
                        .title(req.getTitle())
                        .content(req.getContent())
                        .writer(writer)
                        .build()
        );
        return toDto(saved);
    }

    /* 좋아요 +1 */
    @Transactional
    public Long like(Long id) {
        CommunityPost p = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글"));
        p.incrementLikes();
        return p.getLikes();
    }

    /* 내가 쓴 글 */
    public List<PostResponseDto> getMine(String writer) {
        return repo.findByWriter(writer)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    /* mapper */
    private PostResponseDto toDto(CommunityPost p) {
        return PostResponseDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .content(p.getContent())
                .writer(p.getWriter())
                .createdAt(p.getCreatedAt())
                .views(p.getViews())
                .likes(p.getLikes())
                .build();
    }
}
