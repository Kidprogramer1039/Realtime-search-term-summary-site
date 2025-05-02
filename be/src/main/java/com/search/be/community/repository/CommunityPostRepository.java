// src/main/java/com/search/be/community/repository/CommunityPostRepository.java
package com.search.be.community.repository;

import com.search.be.community.entity.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByWriter(String writer);
    List<CommunityPost> findAllByOrderByCreatedAtDesc();
}


