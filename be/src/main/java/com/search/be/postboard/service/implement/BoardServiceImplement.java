    package com.search.be.postboard.service.implement;

    import com.search.be.postboard.dto.requeset.board.PostCommentRequestDto;
    import com.search.be.postboard.dto.response.board.*;
    import com.search.be.postboard.entity.BoardEntity;
    import com.search.be.postboard.entity.CommentEntity;
    import com.search.be.postboard.entity.FavoriteEntity;
    import com.search.be.postboard.entity.ImageEntity;
    import com.search.be.postboard.dto.requeset.board.PostBoardRequestDto;
    import com.search.be.postboard.repository.*;
    import com.search.be.postboard.repository.resultSet.GetBoardResultSet;
    import com.search.be.postboard.repository.resultSet.GetCommentListResultSet;
    import com.search.be.postboard.repository.resultSet.GetFavoriteListResultSet;
    import com.search.be.postboard.service.BoardService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Service;

    import java.util.ArrayList;
    import java.util.List;

    @Service
    @RequiredArgsConstructor
    public class BoardServiceImplement implements BoardService {

        private final UserRespository userRespository;
        private final BoardRepository boardRepository;
        private final ImageRepository imageRepository;
        private final CommentRepository commentRepository;
        private final FavoriteRepository favoriteRepository;


        @Override
        public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

            // 특정 게시물 불러오는 API
            GetBoardResultSet resultSet = null;
            List<ImageEntity> imageEntities = new ArrayList<>();

            try{
                resultSet = boardRepository.getBoard(boardNumber);
                if(resultSet == null) return GetBoardResponseDto.noExistBoard();

                imageEntities = imageRepository.findByBoardNumber(boardNumber);

                BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
                boardEntity.incresaseViewCount();
                boardRepository.save(boardEntity);

            }catch (Exception exception){
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }
            return GetBoardResponseDto.success(resultSet, imageEntities);
        }


        // 게시판 작성 API
        @Override
        public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
            try {
                // 유저가 존재하는지
                boolean existedEmail = userRespository.existsByEmail(email);
                if (!existedEmail) return PostBoardResponseDto.notExistUser();

                //보드 작성
                BoardEntity boardEntity = new BoardEntity(dto, email);
                boardRepository.save(boardEntity);

                int boardNumber = boardEntity.getBoardNumber();
                List<String> boardImageList = dto.getBoardImageList();
                List<ImageEntity> imageEntities = new ArrayList<>();

                for (String Image : boardImageList) {
                    ImageEntity imageEntity = new ImageEntity(boardNumber, Image);
                    imageEntities.add(imageEntity);
                }
                imageRepository.saveAll(imageEntities);

            } catch (Exception exception) {
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }

            return PostBoardResponseDto.success();
        }

        // 좋아요 API
        @Override
        public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
            try {

                boolean existedUser = userRespository.existsByEmail(email);
                if(!existedUser) return PutFavoriteResponseDto.noExistUser();

                BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
                if(boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

                FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
                if(favoriteEntity == null) {
                    favoriteEntity = new FavoriteEntity(email, boardNumber);
                    favoriteRepository.save(favoriteEntity);
                    boardEntity.increaseFavoriteCount();
                }
                else{
                    favoriteRepository.delete(favoriteEntity);
                    boardEntity.decreaseFavoriteCount();
                }

                boardRepository.save(boardEntity);

            }catch (Exception exception){
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }
            return PutFavoriteResponseDto.success();
        }

        //좋아요 리스트 API
        @Override
        public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {

            List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

            try {

                boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
                if(! existedBoard) return GetFavoriteListResponseDto.noExistBoard();

                resultSets = favoriteRepository.getFavoriteList(boardNumber);


            }catch (Exception exception){
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }

            return GetFavoriteListResponseDto.success(resultSets);
        }

        // 게시물 댓글 작성 API
        @Override
        public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber,String email){

            try {

                BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
                if(boardEntity == null) return PostCommentResponseDto.noExistBoard();

                boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
                if (!existedBoard) return PostCommentResponseDto.noExistBoard();

                boolean existedUser= userRespository.existsByEmail(email);
                if (!existedUser) return PostCommentResponseDto.noExistUser();

                CommentEntity commentEntity = new CommentEntity(dto,boardNumber,email);
                commentRepository.save(commentEntity);

                boardEntity.increaseCommentCount();
                boardRepository.save(boardEntity);

            }catch (Exception exception){
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }

            return PostCommentResponseDto.success();
        }

        // 게시물 댓글 리스트 불러오기 API
        @Override
        public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {

            List<GetCommentListResultSet> resultSets = new ArrayList<>();

            try {
                boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
                if(! existedBoard) return GetCommentListResponseDto.noExistBoard();

                resultSets = commentRepository.getCommentList(boardNumber);

            }catch (Exception exception){
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }
            return GetCommentListResponseDto.success(resultSets);
        }

        @Override
        public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email) {

            try {
                boolean existedUser = userRespository.existsByEmail(email);
                if(! existedUser) return DeleteBoardResponseDto.noExistUser();

                BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
                if(boardEntity == null) return DeleteBoardResponseDto.noExistBoard();

                String writerEmail = boardEntity.getWriterEmail();
                boolean isWriter = writerEmail.equals(email);
                if(! isWriter) return DeleteBoardResponseDto.noPermission();

                imageRepository.deleteByBoardNumber(boardNumber);
                commentRepository.deleteByBoardNumber(boardNumber);
                favoriteRepository.deleteByBoardNumber(boardNumber);

                boardRepository.delete(boardEntity);

            }catch (Exception exception){
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }

            return DeleteBoardResponseDto.success();
        }

    }
