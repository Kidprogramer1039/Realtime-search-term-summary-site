// src/main/java/com/search/be/login/repository/User.java
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

    @Column(name = "users_uuid", columnDefinition = "BINARY(16)", unique = true, nullable = false)
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

    // 기존에 사용하던 총 포인트 컬럼 (기본값 0)
    @Builder.Default
    @Column(name = "post_points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int postPoints = 0;

    // 새로 추가된 “남은 어그로 포인트” 컬럼 (구매 시 차감)
    @Builder.Default
    @Column(name = "remain_points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int remainPoints = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ─────────────────────────────────────────────────────
    // /////////// Setter / Helper 메서드 ///////////
    // ─────────────────────────────────────────────────────

    /** 기존 총 포인트 업데이트 (필요하면) */
    public void setPostPoints(long points) {
        this.postPoints = (int) points;
    }

    /** 남은 어그로 포인트 조회 */
    public int getRemainPoints() {
        return this.remainPoints;
    }

    /** 남은 어그로 포인트 차감 (구매할 때 사용) */
    public void deductRemainPoints(int cost) {
        if (this.remainPoints < cost) {
            throw new IllegalStateException("포인트가 부족합니다.");
        }
        this.remainPoints -= cost;
    }

    /** 게시글 개수 직접 세팅 (ShopServiceImpl에서 호출) */
    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }

    /** 게시글 개수 1 증가 helper */
    public void incrementPostCount() {
        this.postCount++;
    }
}
