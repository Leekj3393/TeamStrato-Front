import React, { useState } from 'react';
import PartBoardCSS from '../../components/main/PartBoardCSS.css';  // Assuming you have a CSS file named Board.css

function PartNotice() {
  const [posts, setPosts] = useState([
    {id: 1, title: '첫 번째 게시물', content: '내용1'},
    {id: 2, title: '두 번째 게시물', content: '내용2'},
    {id: 3, title: '세 번째 게시물', content: '내용3'},
    // Add more posts as needed
  ]);

  return (
    <div className={PartBoardCSS}>
    <div className="board">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default PartNotice;
