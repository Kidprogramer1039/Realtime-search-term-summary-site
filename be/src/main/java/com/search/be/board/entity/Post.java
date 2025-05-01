package com.search.be.board.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 50)
    private String writer;

    /** 조회수 (기본값 0) */
    @Builder.Default
    @Column(nullable = false)
    private Long views = 0L;

    /** 좋아요 수 (기본값 0) */
    @Builder.Default
    @Column(nullable = false)
    private Long likes = 0L;

    /** 작성일 */
    @Builder.Default
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /** 조회수 1 증가 */
    public void incrementViews() {
        this.views++;
    }

    /** 좋아요 1 증가 */
    public void incrementLikes() {
        this.likes++;
    }
}
