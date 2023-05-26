import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import NoticeCSS from './Notice.module.css';
import { callNoticeListAPI, callNoticeSearchListAPI, callNoticesDeleteAPI/* , callNoticesCountAPI  */} from "../../apis/NoticeAPICalls";
import PagingBar from "../../components/common/PagingBar";
import { isAdmin } from "../../utils/TokenUtils"; /* isAdmin()!!!!! */

function Notice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data/* , noticesCount */} = useSelector(state => state.noticeReducer);
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices.data;
    const pageInfo = notices.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }
    useEffect(
        () => {
        }, []
        )
        
        useEffect(
            () => {
                if(search) {
                    /* 검색어에 해당하는 게시글에 대한 요청 */
                    dispatch(callNoticeSearchListAPI({ search, currentPage }));
                } else {
                    /* 모든 게시들에 대한 요청 */
                    dispatch(callNoticeListAPI({ currentPage }));
                    /* dispatch(callNoticesCountAPI()); */
            }
            
        },
        [currentPage, search]
    );

    const { noticeCode } = useParams();
    const onClickNoticeCode = (noticeCode) => {
      navigate(`/notice/detail/${noticeCode}`);
    }
    const onClickRegistPage = () => {
      navigate('/notice/regist');
    }

    const onClickSelectedNoticesDeleteHandler = () => {
        dispatch(callNoticesDeleteAPI()); 
        alert("선택 게시물들이 삭제되었습니다.");
    }


    return(
        <div className={NoticeCSS}>
            <div className={NoticeCSS.square}></div>                  {/* 본문 하얀 네모 */}
            <div className={NoticeCSS.content}>
                <div className={NoticeCSS.noticeTitleCircle}></div>
                <div className={NoticeCSS.noticeTitle}>
                    전체 공지사항
                </div>
                <div className={NoticeCSS.noticeSearch}>  
                    <select>                                        {/* 검색 조건 */}
                        <option>제목</option>
                        <option>내용</option>
                    </select>
                    <input type="text"/>                            {/* 검색어 입력란 */}
                    <button type='button'>검색</button>
                </div>
                <div className={NoticeCSS.tableInfo}>           {/* 게시글/페이지 정보 */}
                    전체 게시물 {data?.length * pageInfo?.maxPage} 개 || 페이지 {pageInfo?.currentPage} / {pageInfo?.maxPage}
                </div>

                <table className={NoticeCSS.noticeMainTable}>   {/* 게시판 시작 */}
                    <thead>
                    <tr className={NoticeCSS.title}>
                        {isAdmin && <th className={NoticeCSS.column0}>선택</th>}
                        <th className={NoticeCSS.column1}>글번호</th>
                        <th className={NoticeCSS.column2}>부서</th>
                        <th className={NoticeCSS.column3}>제목</th>
                        <th className={NoticeCSS.column4}>등록일</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data && data?.map((notice) => (
                            <tr className={NoticeCSS.lists} key={notice.noticeCode} htmlFor="noticeCode">
                                {isAdmin && <td className={NoticeCSS.column0}><input type="checkbox" value={notice.noticeCode} id="noticeCode" name="noticeCode"></input></td>}
                                <td className={NoticeCSS.column1}  onClick={() => onClickNoticeCode(notice.noticeCode)}>{notice.noticeCode}</td>
                                <td className={NoticeCSS.column2}  onClick={() => onClickNoticeCode(notice.noticeCode)}>{notice.noticeType}</td>
                                <td className={NoticeCSS.column3}  onClick={() => onClickNoticeCode(notice.noticeCode)}>{notice.noticeTitle}</td>
                                <td className={NoticeCSS.column4}  onClick={() => onClickNoticeCode(notice.noticeCode)}>{formatDate(notice.noticeRegistDate)}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                {isAdmin && <div className={NoticeCSS.deleteBtnDiv} onClick={onClickSelectedNoticesDeleteHandler}>
                    선택 삭제
                </div>}
                {isAdmin && <div className={NoticeCSS.goToRegistBtnDiv} onClick={onClickRegistPage}>
                    게시물 등록
                    {/* <img src="../../image/regist-btn.png"/> */}
                </div>}
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage }/> }
            </div>
        </div>
    );
}

export default Notice;