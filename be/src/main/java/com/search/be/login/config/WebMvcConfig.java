package com.search.be.login.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // /login?… 로 들어오는 모든 GET 요청을 React index.html 로 포워딩
        registry.addViewController("/login")
                .setViewName("forward:/index.html");
    }
}
