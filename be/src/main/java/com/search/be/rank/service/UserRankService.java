package com.search.be.rank.service;

import com.search.be.board.entity.Post;
import com.search.be.board.repository.PostRepository;
import com.search.be.community.entity.CommunityPost;
import com.search.be.community.repository.CommunityPostRepository;
import com.search.be.rank.dto.UserRankingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserRankService {

    private final PostRepository          postRepo;
    private final CommunityPostRepository commRepo;

    /** 조회수 합계 기준 TOP N (Free + Community 합산) */
    public List<UserRankingDto> topViewUsers(int limit) {

        Map<String, Long> map = new HashMap<>();

        // 자유 게시판
        postRepo.findAll().forEach(p ->
                map.merge(p.getWriter(), p.getViews(), Long::sum));

        // 커뮤니티 게시판
        commRepo.findAll().forEach(p ->
                map.merge(p.getWriter(), p.getViews(), Long::sum));

        return map.entrySet().stream()
                .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
                .limit(limit)
                .map(e -> new UserRankingDto(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }
}
