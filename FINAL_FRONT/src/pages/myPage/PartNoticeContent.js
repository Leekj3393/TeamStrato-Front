
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { callMyPageNoticeDetailAPI } from '../../apis/MyPageAPICalls';
import PartBoardCSS from "../../components/main/PartBoardCSS.css"

function PartNoticeContent() {
  const MyNoticeDetail = useSelector(state => state.myPageNoticeReducer.MyNoticeDetail);
  const { noticeCode } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log('MyNoticeDetail:',MyNoticeDetail);
    dispatch(callMyPageNoticeDetailAPI(noticeCode)); // Redux-Thunk 미들웨어를 사용하여 디스패치
  }, [dispatch, noticeCode]);

  useEffect(() => {
    console.log('찍어봐요 공지사항 숲 MyNoticeDetail:', MyNoticeDetail);
  }, [MyNoticeDetail]);
  
  return (
    <div className={PartBoardCSS}>
      <div className="PartContent">
        {MyNoticeDetail && MyNoticeDetail.data && (
          <div>
            <h1>{MyNoticeDetail.data.noticeTitle}</h1>
            <p>{MyNoticeDetail.data.noticeContent}</p>
            <p>{MyNoticeDetail.data.noticeType}</p>

          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default PartNoticeContent;
