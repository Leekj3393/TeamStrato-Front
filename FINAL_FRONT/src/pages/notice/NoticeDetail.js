import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import {callNoticeDetailAPI} from '../../apis/NoticeAPICalls';
import NoticeCSS from "./Notice.module.css";
import { isAdmin } from "../../utils/TokenUtils";

function NoticeDetail() {

    const {noticeDetail} = useSelector(state => state.noticeReducer);
    const { noticeCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }


    useEffect(() => {
        console.log('noticeDetail:',noticeDetail);
        dispatch(callNoticeDetailAPI({noticeCode}));
    }, []);


  return (
    <div className={NoticeCSS}>
        <div className={NoticeCSS.square}></div>
        <div className={NoticeCSS.content}>
            <div className={NoticeCSS.DetailDiv}>
                <table className={NoticeCSS.DetailTable}>
                    <tr>
                        <th className={NoticeCSS.col1}>문서번호</th>
                        <td className={NoticeCSS.col6}>{noticeDetail  && noticeDetail.noticeCode}</td>
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col2}>부서</th>
                        <td className={NoticeCSS.col7}>{noticeDetail && noticeDetail.noticeType}</td>
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col3}>등록일</th>
                        <td className={NoticeCSS.col8}>{formatDate(noticeDetail && noticeDetail.noticeRegistDate)}</td>
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col4}>제목</th>
                        <td className={NoticeCSS.col9}>{noticeDetail && noticeDetail.noticeTitle}</td>
                    </tr>
                    <tr>
                        <th className={NoticeCSS.col5}>내용</th>
                        <td className={NoticeCSS.col10}>{noticeDetail && noticeDetail.noticeContent}</td>
                    </tr>
                </table>
                {isAdmin && <div className={NoticeCSS.detailAdminDiv}>
                    <div className={NoticeCSS.modifyBtn}><img src='../../image/MODIFY-BTN.png'></img></div>
                    <div className={NoticeCSS.deleteBtn}><img src='../../image/delete-btn.png'></img></div>
                </div>}
            </div>
        </div>
    </div>
    );
  
  
  
};


export default NoticeDetail;