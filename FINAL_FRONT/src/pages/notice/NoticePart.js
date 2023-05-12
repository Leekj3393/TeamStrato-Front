import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import PagingBar from "../../components/common/PagingBar";
import NoticeCSS from './Notice.module.css';
import { NavLink } from 'react-router-dom';
import { callNoticeDepartmentListAPI, callNoticeListAPI, callNoticeSearchListAPI } from "../../apis/NoticeAPICalls";
import NoticeList from "./list/NoticeList";

function NoticePart() {

    const style = { textDecoration : 'none', color : 'black', fontWeight : 'bold'};
    const style2 = { textDecoration : 'none', color : 'gray', fontWeight : 'bold'};
    const activeStyle = ({ isActive }) => isActive ? style : style2;

    const dispatch = useDispatch();
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
                /* 카테고리별 음식에 대한 요청 */
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
            <div className={NoticeCSS.noticeTitle}>                         {/* 본문 시작 */}
                공지사항 부서별 게시판!!
                { noticeList && <NoticeList noticeList={noticeList} /> }
            </div>
                <div className={NoticeCSS.square}></div>                  {/* 본문 하얀 네모 */}
                <div className={NoticeCSS.partSelect}>
                    <li><NavLink to="/notice/part/d1" style={ activeStyle }>인사</NavLink></li>
                    <li><NavLink to="/notice/part/d2" style={ activeStyle }>안전/교육</NavLink></li>
                    <li><NavLink to="/notice/part/d3" style={ activeStyle }>장비관리</NavLink></li>
                </div>
                
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
    );
}

export default NoticePart;