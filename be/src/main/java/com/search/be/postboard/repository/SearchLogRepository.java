package com.search.be.postboard.repository;

import com.search.be.postboard.entity.SearchLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {
}
