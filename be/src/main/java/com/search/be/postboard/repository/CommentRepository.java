package com.search.be.postboard.repository;

import com.search.be.postboard.entity.CommentEntity;
import com.search.be.postboard.repository.resultSet.GetCommentListResultSet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query(
            value =
                    "SELECT "+
                    "   U.nickname AS nickname, " +
                    "   U.profile_image AS profileImage,    " +
                    "   C.write_datetime AS writeDatetime, " +
                    "   C.content AS cotent     " +
                    "FROM comment AS C " +
                    "INNER JOIN user AS U " +
                    "ON C.user_email = U.email " +
                    "WHERE C.board_number = ?1 "+
                    "ORDER BY write_datetime DESC",
                    nativeQuery=true
    )
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);

}
