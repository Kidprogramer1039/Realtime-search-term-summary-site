package com.search.be.rank.controller;

import com.search.be.login.dto.ApiResponse;
import com.search.be.login.dto.SuccessStatus;
import com.search.be.rank.dto.UserRankingDto;
import com.search.be.rank.service.UserRankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ranks")
@RequiredArgsConstructor
public class UserRankController {

    private final UserRankService service;

    /** GET /api/v1/ranks/views?limit=10 */
    @GetMapping("/views")
    public ResponseEntity<ApiResponse<List<UserRankingDto>>> topViews(
            @RequestParam(defaultValue = "10") int limit) {

        return ApiResponse.onSuccess(
                SuccessStatus._OK,
                service.topViewUsers(limit)
        );
    }
}
