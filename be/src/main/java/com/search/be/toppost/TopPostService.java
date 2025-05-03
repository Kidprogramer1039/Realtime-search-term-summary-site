package com.search.be.toppost.service;

import com.search.be.board.entity.Post;
import com.search.be.board.repository.PostRepository;
import com.search.be.community.entity.CommunityPost;
import com.search.be.community.repository.CommunityPostRepository;
import com.search.be.toppost.dto.TopPostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TopPostService {

    private final PostRepository          postRepo;
    private final CommunityPostRepository commRepo;

    public List<TopPostDto> topByViews(int limit) {
        return top(limit, "views");
    }
    public List<TopPostDto> topByLikes(int limit) {
        return top(limit, "likes");
    }

    private List<TopPostDto> top(int limit, String field) {
        Stream<TopPostDto> free = postRepo.findAll().stream()
                .map(p -> new TopPostDto(
                        p.getId(), p.getTitle(), p.getWriter(),
                        field.equals("views") ? p.getViews() : p.getLikes(),
                        "FREE"
                ));
        Stream<TopPostDto> comm = commRepo.findAll().stream()
                .map(p -> new TopPostDto(
                        p.getId(), p.getTitle(), p.getWriter(),
                        field.equals("views") ? p.getViews() : p.getLikes(),
                        "COMMUNITY"
                ));

        return Stream.concat(free, comm)
                .sorted(Comparator.comparingLong(TopPostDto::getHits).reversed())
                .limit(limit)
                .toList();
    }
}
