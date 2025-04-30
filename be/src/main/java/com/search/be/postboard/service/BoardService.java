package com.search.be.postboard.service;

import com.search.be.postboard.dto.requeset.board.PostBoardRequestDto;
import com.search.be.postboard.dto.requeset.board.PostCommentRequestDto;
import com.search.be.postboard.dto.response.board.*;
import org.springframework.http.ResponseEntity;

public interface BoardService {
   ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
   ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);

   ResponseEntity<? super PutFavoriteResponseDto> putFavorite (Integer boardNumber, String email);
   ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList (Integer boardNumber);

   ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);
   ResponseEntity<? super GetCommentListResponseDto> getCommentList (Integer boardNumber);

   ResponseEntity<? super DeleteBoardResponseDto> deleteBoard (Integer boardNumber, String email);
}
