import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import NoticeCSS from './Notice.module.css';
import { callNoticeListAPI, callNoticeSearchListAPI } from "../../apis/NoticeAPICalls";
import PagingBar from "../../components/common/PagingBar";

function Notice() {

    const dispatch = useDispatch();
    const {data} = useSelector(state => state.noticeReducer);
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices.data;
    const pageInfo = notices.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');


    useEffect(
        () => {
            if(search) {
                /* 검색어에 해당하는 게시글에 대한 요청 */
                dispatch(callNoticeSearchListAPI({ search, currentPage }));
            } else {
                /* 모든 게시들에 대한 요청 */
                dispatch(callNoticeListAPI({ currentPage }));
            }
            
        },
        [currentPage, search]
    );

    return(
        <div className={NoticeCSS}>
            <div className={NoticeCSS.square}></div>                  {/* 본문 하얀 네모 */}
            <div className={NoticeCSS.content}>
                    <div className={NoticeCSS.noticeSearch}>  
                        <select>                                        {/* 검색 조건 */}
                            <option>제목</option>
                            <option>내용</option>
                        </select>
                        <input type="text"/>                            {/* 검색어 입력란 */}
                    </div>
                    <div className={NoticeCSS.tableInfo}>           {/* 게시글/페이지 정보 */}
                        게시물 100000 개 || 페이지 1/1000
                    </div>

                    <table className={NoticeCSS.noticeMainTable}>   {/* 게시판 시작 */}
                        <thead>
                        <tr className={NoticeCSS.title}>
                            <th>글번호</th>
                            <th>부서</th>
                            <th>제목</th>
                            <th>등록일</th>
                            <th>조회수</th>
                        </tr>                               {/* 게시글은 한 페이지 당 5개씩!!! */}
                        </thead>
                        <tbody>
                            {data && data.map((notice) => (
                                <tr className={NoticeCSS.lists} key={notice.noticeCode}>
                                    <th>{notice.noticeCode}</th>
                                    <th>{notice.department.deptName}</th>
                                    <th>{notice.noticeTitle}</th>
                                    <th>{notice.noticeRegistDate}</th>
                                    <th>1000</th>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
    );
}

export default Notice;