package com.search.be.login.info;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getName();
}
