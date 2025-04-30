package com.search.be.postboard.repository;


import com.search.be.postboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRespository extends JpaRepository<UserEntity, String> {

    boolean findByEmail(String email);

    List<UserEntity> email(String email);

    boolean existsByEmail(String email);
}
