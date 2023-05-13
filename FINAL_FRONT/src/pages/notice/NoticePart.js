import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import NoticeCSS from './NoticePart.module.css';
import { NavLink } from 'react-router-dom';
import { callNoticeDepartmentListAPI, callNoticeListAPI, callNoticeSearchListAPI } from "../../apis/NoticeAPICalls";
import PagingBarForNoticePart from "../../components/common/pagingbar/PagingBarForNoticePart";

function NoticePart() {

    const style = { textDecoration : 'none', color : 'black', fontWeight : 'bold'};
    const style2 = { textDecoration : 'none', color : 'gray', fontWeight : 'bold'};
    const activeStyle = ({ isActive }) => isActive ? style : style2;

    const dispatch = useDispatch();
    const {data} = useSelector(state => state.noticeReducer);
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices.data;
    const pageInfo = notices.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    // 부서 선택 시 사용할 값!
    const params = useParams();
    const deptCode = params.deptCode;

    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');


    useEffect(
        () => {
            if(deptCode) {
                /* 부서코드에 대한 요청 */
                dispatch(callNoticeDepartmentListAPI({ deptCode, currentPage }));
            } else if(search) {
                /* 검색어에 해당하는 게시글에 대한 요청 */
                dispatch(callNoticeSearchListAPI({ search, currentPage }));
            } else {
                /* 모든 게시들에 대한 요청  --> 여기를 수정하고 싶다 부서별 게시글 수 같은거 보여주는.. 그런거..??*/
                dispatch(callNoticeListAPI({ currentPage }));
            }
            
        },
        [currentPage, deptCode, search]
    );


    return(
        <div className={NoticeCSS}>
            <div className={NoticeCSS.noticeTitle2}>                         {/* 본문 시작 */}
                공지사항 부서별 게시판!!
            </div>
                <div className={NoticeCSS.square2}></div>                  {/* 본문 하얀 네모 */}
                <div className={NoticeCSS.partSelect2}>
                    <li><NavLink to="/notice/part/d1" style={ activeStyle }>인사</NavLink></li>
                    <li><NavLink to="/notice/part/d2" style={ activeStyle }>안전/교육</NavLink></li>
                    <li><NavLink to="/notice/part/d3" style={ activeStyle }>장비관리</NavLink></li>
                </div>
            <div className={NoticeCSS.content2}>
                <div className={NoticeCSS.contentDiv2}>
                    <div className={NoticeCSS.noticeSearch2}>  
                        <select>                                        {/* 검색 조건 */}
                            <option>제목</option>
                            <option>내용</option>
                        </select>
                        <input type="text"/>                            {/* 검색어 입력란 */}
                    </div>
                    <div className={NoticeCSS.tableInfo2}>           {/* 게시글/페이지 정보 */}
                        게시물 100000 개 || 페이지 1/1000
                    </div>

                    <table className={NoticeCSS.noticePartTable2}>   {/* 게시판 시작 */}
                        <thead>
                            <tr className={NoticeCSS.title2}>
                                <th>글번호</th>
                                <th>부서</th>
                                <th>제목</th>
                                <th>등록일</th>
                                <th>조회수</th>
                            </tr>                               {/* 게시글은 한 페이지 당 5개씩!!! */}
                        </thead>

                        <tbody>
                            {data &&
                                data.map((notice) => (
                                    <tr key={notice.noticeCode}>
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
            </div>
            <div>
                { pageInfo && <PagingBarForNoticePart pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
    );
}

export default NoticePart;