package com.search.be.login.repository;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    @Column(name = "users_uuid", columnDefinition = "BINARY(16)", unique = true)
    private UUID userId;

    @Column(name = "name", nullable = false, length = 5)
    private String name;

    @Column(name = "provider", nullable = false, length = 10)
    private String provider;

    @Column(name = "provider_id", nullable = false, length = 50)
    private String providerId;

    // 게시글 개수를 저장하는 컬럼 (기본값 0)
    @Builder.Default
    @Column(name = "post_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int postCount = 0;


    // 게시글 개수를 저장하는 컬럼 (기본값 0)
    @Builder.Default
    @Column(name = "post_points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int postPoints = 0;

    public void setPostPoints(long points) {
        this.postPoints = (int) points;   // totalViews/100 은 int 범위라 다운캐스트 OK
    }

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, length = 20)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", length = 20)
    private LocalDateTime updatedAt;
}
