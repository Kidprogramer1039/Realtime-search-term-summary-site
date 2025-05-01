// src/main/java/com/search/be/login/dto/ApiResponse.java
package com.search.be.board.dto;

import com.search.be.login.dto.SuccessStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

@Getter
@RequiredArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class ApiResponse<T> {

    private final boolean isSuccess;
    private final String  code;
    private final String  message;
    private final T       payload;

    public static <T> ResponseEntity<ApiResponse<T>> onSuccess(SuccessStatus status, T payload) {
        ApiResponse<T> response = new ApiResponse<>(
                true,
                status.getCode(),     // now String
                status.getMessage(),
                payload
        );
        return ResponseEntity
                .status(status.getHttpStatus())
                .body(response);
    }
}
