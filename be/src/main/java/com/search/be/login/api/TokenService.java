package com.search.be.login.api;


public interface TokenService {
    TokenResponse reissueAccessToken(String authorizationHeader);
}
