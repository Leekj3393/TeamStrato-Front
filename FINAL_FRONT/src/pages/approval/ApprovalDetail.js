import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';


function ApprovalDetail () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { appDetail } = useSelector(state => state.approvalReducer);
    const params = useParams();
    const appCode = params.appCode;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect(
        () => {
            dispatch(callApprovalDetailAPI({appCode}));
        },
        []
    );



    return (
            <div className={ApprovalCSS}>
                <div className={ApprovalCSS.square}></div>
                <div className={ApprovalCSS.appContentDiv}>
                    <div className={ApprovalCSS.applineInfoBoxDiv}>
                        <table>
                                <thead>
                                    <tr>
                                        <th>기안자</th>
                                        <th>제1 결재선</th>
                                        <th>제2 결재선</th>
                                        <th>최종 결재선</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{appDetail && appDetail.member?.memberName}</td>
                                        <td>홍길동{/* {appLine && appLine.member.memberName} */}</td>
                                        <td>홍길동{/* {appLine && appLine.member.memberName} */}</td>
                                        <td>홍길동{/* {appLine && appLine.member.memberName} */}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>요청</td>
                                        <td>승인{/* {appLine && appLine.appStatus} */}</td>
                                        <td>승인{/* {appLine && appLine.appStatus} */}</td>
                                        <td>반려{/* {appLine && appLine.appStatus} */}</td>
                                    </tr>

                                </tfoot>
                        </table>
                    </div>
                    <div className={ApprovalCSS.appDetailDiv}>
                        <table className={ApprovalCSS.approvalDetailTable}>
                            <tbody>
                                <tr>
                                    <th className={ApprovalCSS.colm1}>문서번호</th>
                                    <td className={ApprovalCSS.colm8}>{appDetail  && appDetail.appCode}</td>
                                    <th className={ApprovalCSS.colm5}>부서</th>
                                    <td className={ApprovalCSS.colm9}>부서명{/* {appDetail && appDetail.member.department.deptName} */}</td>
                                </tr>
                                <tr>
                                    <th className={ApprovalCSS.colm2}>구분</th>
                                    <td className={ApprovalCSS.colm10}>{appDetail && appDetail.appType}</td>
                                    <th className={ApprovalCSS.colm6}>상태</th>
                                    <td className={ApprovalCSS.colm11}>{appDetail && appDetail.appStatus}</td>
                                    <th className={ApprovalCSS.colm7}>등록일</th>
                                    <td className={ApprovalCSS.colm12}>{formatDate(appDetail && appDetail.appRegistDate)}</td>
                                </tr>
                                <tr>
                                    <th className={ApprovalCSS.colm3}>제목</th>
                                    <td className={ApprovalCSS.colm13}>{appDetail && appDetail.appTitle}</td>
                                </tr>
                                <tr>
                                    <th className={ApprovalCSS.colm4}>내용</th>
                                    <td className={ApprovalCSS.colm14}>
                                        {appDetail && appDetail.appContent}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
            
}

export default ApprovalDetail;