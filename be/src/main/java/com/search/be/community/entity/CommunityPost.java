// src/main/java/com/search/be/community/entity/CommunityPost.java
package com.search.be.community.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "community_posts")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPost {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Lob @Column(nullable = false)
    private String content;

    @Column(nullable = false, length = 50)
    private String writer;

    @Builder.Default
    @Column(nullable = false)
    private Long views = 0L;

    @Builder.Default
    @Column(nullable = false)
    private Long likes = 0L;

    @Builder.Default
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public void incrementViews() { this.views++; }
    public void incrementLikes() { this.likes++; }
}
