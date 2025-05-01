// src/main/java/com/search/be/board/repository/PostRepository.java
package com.search.be.board.repository;

import com.search.be.board.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByWriter(String writer);
    List<Post> findAllByOrderByCreatedAtDesc();
}
