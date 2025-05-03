package com.search.be.toppost.controller;

import com.search.be.login.dto.ApiResponse;
import com.search.be.login.dto.SuccessStatus;
import com.search.be.toppost.dto.TopPostDto;
import com.search.be.toppost.service.TopPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/top-posts")
@RequiredArgsConstructor
public class TopPostController {

    private final TopPostService service;

    @GetMapping("/views")
    public ResponseEntity<ApiResponse<List<TopPostDto>>> topViews(
            @RequestParam(defaultValue = "3") int limit) {
        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.topByViews(limit)
        );
    }

    @GetMapping("/likes")
    public ResponseEntity<ApiResponse<List<TopPostDto>>> topLikes(
            @RequestParam(defaultValue = "3") int limit) {
        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.topByLikes(limit)
        );
    }
}
