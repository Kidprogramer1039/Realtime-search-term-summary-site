// src/main/java/com/search/be/ads/entity/AdvertisementPost.java
package com.search.be.ads.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "advertisement_posts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AdvertisementPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int views = 0;

    @Column(nullable = false)
    private int likes = 0;

    @Column(name = "writer_id", nullable = false)
    private Long writerId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
