import { NavLink, useNavigate } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalRegistAPI } from '../../apis/ApprovalAPICalls';



function ApprovalRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {regist} = useSelector(state => state.approvalReducer);
    const [form, setForm] = useState({});

    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('결재선 선택 페이지로 이동합니다.');
                navigate("/approval/appline");
            }
        },
        [regist]
    );


    const onClickRegistHandler = () => {

        const formData = new FormData();

        formData.append("appTitle", form.appTitle);
        formData.append("appContent", form.appContent);
        formData.append("appType", form.appType);
        formData.append("appStatus", form.appStatus);

        dispatch(callApprovalRegistAPI(formData));
    }

    const onClickResetHandler = () => {}

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}            
            <div className={ApprovalCSS.content0}>
                전자결재 기안문 작성 페이지!!!!!!
                
            </div>
            <div className={ApprovalCSS.appLineContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    <b>기안문 작성</b> &gt; 결재선/열람자 선택 &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.appFormDiv}>
                    <label>제목 : </label><br/>
                    <input type='text' id='apptitle' value={form.appTitle}></input><br/><br/>

                    <label>내용 : </label><br/>
                    <input type='text' id='appContent'  value={form.appContent}></input><br/><br/>

                    <label>기안 구분 : </label><br/>
                    <input type='radio' id='appType' value={form.appType} checked></input>
                    <label for='appType'>기안문</label>
                    <br/><br/>

                    <label>기안상태 : </label><br/>
                    <input type='radio' id='appStatus' value={form.appStatus} checked></input>
                    <label for='appStatus'>대기중</label>
                    <br/><br/>
                </div>

            </div>                                                               {/* 본문 내용 끝 */}
            <div className={ApprovalCSS.nextBtnDiv}>

                <button onClick={onClickRegistHandler}><img src='../image/next-btn.png'></img></button>
                <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png'></img></button>

            </div>

        </div>
    );
}

export default ApprovalRegist;