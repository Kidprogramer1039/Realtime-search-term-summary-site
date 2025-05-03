// src/main/java/com/search/be/profile/service/ProfileService.java
package com.search.be.profile.service;

import com.search.be.profile.dto.ProfileDto;

public interface ProfileService {
    ProfileDto myProfile(String token);
}
