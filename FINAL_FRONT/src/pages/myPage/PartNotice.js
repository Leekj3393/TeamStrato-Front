import { useState } from "react";
import PartBoardCSS from "../../components/main/PartBoardCSS.css"
function NoticePart() {


    const boardData = [
        { id: 1, title: '게시물 1', content: '첫 번째 게시물입니다.', views: 10, date: '2023-05-19' },
        { id: 2, title: '게시물 2', content: '두 번째 게시물입니다.', views: 20, date: '2023-05-18' },
        { id: 3, title: '게시물 3', content: '세 번째 게시물입니다.', views: 15, date: '2023-05-17' },
        // 가상의 게시판 데이터
      ];
        const [searchText, setSearchText] = useState(''); // 검색어를 상태로 관리
      
        // 게시물을 검색하는 함수
        const handleSearch = () => {
          // 검색 결과를 출력하는 로직을 추가해주세요.
          // 예: 검색어와 게시물 제목을 비교하여 일치하는 게시물을 필터링하여 출력
          const filteredData = boardData.filter((item) =>
            item.title.includes(searchText)
          );
      
          // 필터링된 게시물 목록을 반환하거나 상태로 관리해주세요.
          // 예: setFilteredData(filteredData);
        };


        const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 상태로 관리
        const postsPerPage = 5; // 페이지당 게시물 수
      
        // 현재 페이지에 해당하는 게시물 목록 계산
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = boardData.slice(indexOfFirstPost, indexOfLastPost);
      
        // 전체 페이지 수 계산
        const totalPages = Math.ceil(boardData.length / postsPerPage);
      
        // 페이지 변경 함수
        const handlePageChange = (page) => {
          setCurrentPage(page);
        };

        return (
            <div className={PartBoardCSS}>
              <div className="partNemo">
                <div className="circlePart"></div>
                <div className="partName">'안전관리'부서 공지사항</div>
                <div className="partInput">
                  <input
                  className="PartInput"
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    style={{ width: '250px' ,height:'25px' }}
                  />
                  <div className="searchPart" onClick={handleSearch}>검색</div>
                </div>



                <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>



              </div>
        
              <table className="boardTable">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성글</th>
                    <th>조회수</th>
                    <th>등록 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {boardData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>{item.views}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>




            </div>
          );
        };
    
export default NoticePart;