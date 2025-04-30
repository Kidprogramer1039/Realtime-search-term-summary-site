import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useBoardStore from "./stores/board.store.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BoardWrite() {

    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();
    const { boardImageFileList, setBoardImageFileList } = useBoardStore();
    const { resetBoard } = useBoardStore();

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const navigate = useNavigate();

    const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setTitle(value);
        if (!titleRef.current) return;
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    };

    const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);
        if (!contentRef.current) return;
        contentRef.current.style.height = 'auto';
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    };

    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImageUrls([...imageUrls, imageUrl]);
        setBoardImageFileList([...boardImageFileList, file]);
    };

    const onSubmitHandler = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        boardImageFileList.forEach(file => formData.append("boardImage", file));

        try {
            await axios.post("http://localhost:8080/postboard", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("게시물이 성공적으로 등록되었습니다.");
            resetBoard();
            navigate("/");
        } catch (error) {
            alert("게시물 등록 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    return (
        <div className="board-write">
            <textarea ref={titleRef} placeholder="제목을 입력하세요" value={title} onChange={onTitleChangeHandler} />
            <textarea ref={contentRef} placeholder="내용을 입력하세요" value={content} onChange={onContentChangeHandler} />
            <input type="file" ref={imageInputRef} onChange={onImageChangeHandler} />
            <div className="image-preview">
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`미리보기 ${index}`} style={{ width: '100px', margin: '5px' }} />
                ))}
            </div>
            <button onClick={onSubmitHandler}>작성 완료</button>
        </div>
    );
}