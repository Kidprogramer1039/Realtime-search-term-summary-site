package com.search.be.postboard.dto.response.board;
import com.search.be.postboard.common.ResponseCode;
import com.search.be.postboard.common.ResponseMessage;
import com.search.be.postboard.dto.response.board.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PostBoardResponseDto extends ResponseDto {
    private PostBoardResponseDto(){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
    // 성공하였을 때
    public static ResponseEntity<PostBoardResponseDto> success(){
        PostBoardResponseDto result = new PostBoardResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    // 존재하지 않는 유저
    public static ResponseEntity<ResponseDto> notExistUser(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}