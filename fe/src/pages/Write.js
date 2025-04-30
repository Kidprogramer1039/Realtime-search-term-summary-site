// src/pages/Write.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthCallback from '../hooks/useAuthCallback'; 
import useBoardStore from '../stores/boardStore';
import { createPost } from '../api/board';
import './Write.css';

export default function Write() {
  const navigate = useNavigate();
  const user = useAuthCallback(); // user.email 형태로 이메일 접근

  const {
    title,
    content,
    boardImageFileList,
    setTitle,
    setContent,
    setBoardImageFileList,
    resetBoard,
  } = useBoardStore();

  const onImageChange = (e) => {
    setBoardImageFileList(Array.from(e.target.files));
  };

  const onSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      return alert('제목과 내용을 모두 입력해주세요.');
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', user.email);
    boardImageFileList.forEach((file) =>
      formData.append('boardImageList', file)
    );

    const result = await createPost(formData);
    if (result.code === 0) {
      resetBoard();
      navigate('/'); // 성공 시 홈으로 이동
    } else {
      alert('글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="board-write">
      <h2>새 글 작성</h2>
      <input
        className="board-write-input"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="board-write-textarea"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        multiple
        onChange={onImageChange}
      />
      <button className="board-write-button" onClick={onSubmit}>
        글쓰기
      </button>
    </div>
  );
}
