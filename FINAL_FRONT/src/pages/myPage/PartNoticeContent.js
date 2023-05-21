import React, { useState } from 'react';
import { useState } from "react";
import PartBoardCSS from "../../components/main/PartBoardCSS.css"

const boardData = [
  { id: 1, title: '게시물 1', content: '첫 번째 게시물입니다.', views: 10, date: '2023-05-19' },
  { id: 2, title: '게시물 2', content: '두 번째 게시물입니다.', views: 20, date: '2023-05-18' },
  { id: 3, title: '게시물 3', content: '세 번째 게시물입니다.', views: 15, date: '2023-05-17' },
  // 가상의 게시판 데이터
];

const Board = () => {
  const [expandedPosts, setExpandedPosts] = useState([]); // 게시물의 확장 상태를 저장하는 상태

  // 게시물 확장 토글 함수
  const togglePostExpansion = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter((id) => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  return (
    <div className={PartBoardCSS}>
      {/* ... */}

      <table className="boardTable">
        <thead>
          {/* ... */}
        </thead>
        <tbody>
          {boardData.map((item) => (
            <React.Fragment key={item.id}>
              <tr onClick={() => togglePostExpansion(item.id)}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.views}</td>
                <td>{item.date}</td>
              </tr>
              {expandedPosts.includes(item.id) && (
                <tr>
                  <td colSpan="5">{item.content}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* ... */}
    </div>
  );
};

export default Board;
