import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import PagingBar from "../../components/common/PagingBar";
import NoticeCSS from './Notice.module.css';
import { callNoticeStatusListAPI, callNoticeSearchListAPI, callNoticeListAPI } from "../../apis/NoticeAPICalls";


function NoticeStatus() {

    const dispatch = useDispatch();
    const {data} = useSelector(state => state.noticeReducer);
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices.data;
    const pageInfo = notices.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    // 부서 선택 시 사용할 값!
    const params = useParams();
    const noticeStatus = params.noticeStatus;

    /* 검색어 요청시 사용할 값 */
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');


    useEffect(
        () => {
            if(noticeStatus) {
                /* 상태별별 음식에 대한 요청 */
                dispatch(callNoticeStatusListAPI({ noticeStatus, currentPage }));
            } else if(search) {
                /* 검색어에 해당하는 음식에 대한 요청 */
                dispatch(callNoticeSearchListAPI({ search, currentPage }));
            } else {
                /* ?? */
                dispatch(callNoticeListAPI({ currentPage }));
            }
            
        },
        [currentPage, noticeStatus, search]
    );



    return(
        <div className={NoticeCSS}>
            <div className={NoticeCSS.content}>
                공지사항 상태별 페이지!
            </div>
        </div>
    );
}

export default NoticeStatus;