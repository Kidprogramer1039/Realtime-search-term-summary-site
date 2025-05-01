// src/your-path/BoardList.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
}

export default function BoardList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("/api/v1/posts")
      .then(res => {
        if (res.data.isSuccess) {
          setPosts(res.data.result);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="board-list">
      {posts.map(post => (
        <div key={post.id} className="board-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>
            작성자: {post.writer} | {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
