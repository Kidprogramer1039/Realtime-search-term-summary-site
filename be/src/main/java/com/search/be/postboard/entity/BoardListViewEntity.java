package com.search.be.postboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board_list_view")
@Table(name = "board_list_view")
public class BoardListViewEntity {
    @Id
    private int boardNumber;
    private String title;
    private String content;
    private String titleImage;
    private String viewCount;
    private String favouriteCount;
    private String commentCount;
    private String writeDatetime;
    private String writeEmail;
    private String writerNickname;
    private String writerProfileImage;
}
