package com.search.be.board.repository;

import com.search.be.board.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 추가적인 조회 메서드가 필요하면 여기에 정의
}
