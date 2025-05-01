package com.search.be.board.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponseDto {
    private Long          id;
    private String        title;
    private String        content;
    private String        writer;
    private LocalDateTime createdAt;

    /** 조회수 & 좋아요 수 추가 */
    private Long          views;
    private Long          likes;
}
