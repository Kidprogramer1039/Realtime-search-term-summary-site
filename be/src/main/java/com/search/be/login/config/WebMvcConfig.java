package com.search.be.login.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // GET /login 요청이 들어오면 /index.html 을 클라이언트에 그대로 전달
        registry.addViewController("/login").setViewName("forward:/index.html");
    }
}
