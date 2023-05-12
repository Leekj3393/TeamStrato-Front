import { useDispatch, useSelector } from 'react-redux';
import NoticeItem from '../item/NoticeItem';
import NoticeCSS from '../Notice.module.css';
import NoticeListCSS from './NoticeList.module.css';
import { useEffect, useState } from 'react';
import { callNoticeListAPI } from '../../../apis/NoticeAPICalls';

function NoticeList() {
// function NoticeList() {

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.noticeReducer);
    console.log("data ", data);
    // const { review } = useSelector((state) => state.noticeReducer);
    // const [productReviewModal, setProductReviewModal] = useState(false);
    // const [productReviewWriteModal, setProductReviewWriteModal] = useState(false);
    // const [noticeCode, setNoticeCode] = useState(0);
  
  
    useEffect(() => {
      dispatch(callNoticeListAPI());
    }, []);

    

    return (
        <div className={NoticeListCSS.content}>
                
                <div className={NoticeListCSS.contentDiv}>
                    <div className={NoticeListCSS.noticeSearch}>  
                        <select>                                        {/* 검색 조건 */}
                            <option>제목</option>
                            <option>내용</option>
                        </select>
                        <input type="text"/>                            {/* 검색어 입력란 */}
                    </div>
                    <div className={NoticeListCSS.tableInfo}>           {/* 게시글/페이지 정보 */}
                        게시물 100000 개 || 페이지 1/1000
                    </div>

                    <table className={NoticeListCSS.noticeMainTable}>   {/* 게시판 시작 */}
                        <thead>
                            <tr className={NoticeListCSS.title}>
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
    );
}

export default NoticeList;