import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';


function ApprovalDetail () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector(state => state.approvalReducer);
    const params = useParams();
    const appCode = params.appCode;


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
                    전자결재 문서 상세 조회 페이지
                </div>
                <div className={ApprovalCSS.applineInfoBoxDiv}>
                    <table>
                            <thead>기안자</thead>
                            <tbody>{/* {data && data.member.memberName} */}</tbody>
                    </table>
                    <table>
                            <thead>기안자</thead>
                            <tbody>{/* {data && data.member.memberName} */}</tbody>
                    </table>
                    <table>
                            <thead>제1 결재선</thead>
                            <tbody>{/* {data && data.member.memberName} */}</tbody>
                    </table>
                    <table>
                            <thead>제2 결재선</thead>
                            <tbody>{/* {data && data.member.memberName} */}</tbody>
                    </table>
                    <table>
                            <thead>최종 결재선</thead>
                            <tbody>{/* {data && data.member.memberName} */}</tbody>
                    </table>
                </div>
                <div className={ApprovalCSS.appDetailDiv}>
                    <table className={ApprovalCSS.approvalDetailTable}>
                        <tbody>
                            <tr>
                                <th>문서번호</th>
                                <td>{data && data.appCode}</td>
                                <th>등록일</th>
                                <td>{data && data.appRegistDate}</td>
                            </tr>
                            <tr>
                                <th>부서</th>
                                <td>{/* {data && data.member.department.deptName} */}</td>
                                <th>구분</th>
                                <td>{data && data.appType}</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>{data && data.appTitle}</td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td>{data && data.appTitle}</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colSpan={3}>
                                    {data && data.appContent}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    );
            
}

export default ApprovalDetail;