package com.search.be.postboard.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    // 파일 업로드
    String upload(MultipartFile file);
    Resource getImage(String fileName);
}
