// src/main/java/com/search/be/profile/controller/ProfileController.java
package com.search.be.profile.controller;

import com.search.be.profile.dto.ProfileDto;
import com.search.be.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    /** 내 프로필 조회 */
    @GetMapping
    public ResponseEntity<ProfileDto> myProfile(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        ProfileDto dto = profileService.myProfile(token);
        return ResponseEntity.ok(dto);
    }
}
