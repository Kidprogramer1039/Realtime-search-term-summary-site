// src/main/java/com/search/be/board/repository/PostRepository.java
package com.search.be.board.repository;

import com.search.be.board.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByWriter(String writer);
    List<Post> findAllByOrderByCreatedAtDesc();

    /**
     * writer 컬럼(=userId)로 조회수 합계를 구합니다.
     * p.writer 필드가 Long 타입(userId)이라 가정했습니다.
     */
    @Query("SELECT COALESCE(SUM(p.views),0) FROM Post p WHERE p.writer = :writerId")
    long sumViewsByWriter(@Param("writerId") Long writerId);

    /** 좋아요 합계를 구합니다. */
    @Query("SELECT COALESCE(SUM(p.likes),0) FROM Post p WHERE p.writer = :writerId")
    long sumLikesByWriter(@Param("writerId") Long writerId);
}
