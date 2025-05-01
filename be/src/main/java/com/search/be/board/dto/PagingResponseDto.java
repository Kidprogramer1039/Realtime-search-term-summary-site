// src/main/java/com/search/be/board/dto/PagingResponseDto.java
package com.search.be.board.dto;

import lombok.*;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PagingResponseDto<T> {
    private List<T> content;       // 실제 데이터
    private int page;              // 현재 페이지 (0‐based)
    private int size;              // 페이지 크기
    private long totalElements;    // 전체 항목 수
    private int totalPages;        // 전체 페이지 수
}
