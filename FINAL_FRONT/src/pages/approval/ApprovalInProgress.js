import { useDispatch, useSelector } from 'react-redux';
import PagingBar from '../../components/common/PagingBar';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { callApprovalInProgressListAPI } from '../../apis/ApprovalAPICalls';
import { useNavigate } from 'react-router-dom';


function ApprovalInProgress() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useSelector(state => state.approvalReducer);
    const approvals = useSelector(state => state.approvalReducer);
    const pageInfo = approvals.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    // const totalCount = approvals.data.length; // 총 문서 개수 (수정해야함!!)
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect(() => {
        dispatch(callApprovalInProgressListAPI({currentPage}));
    }, 
    [currentPage])

    /* 상세페이지로 이동 */
    const onClickDetailHandler = (appCode) => {
       navigate(`../${appCode}`);
    };   

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.appListTableInfo}>
                    {/* <h3>페이지 {pageInfo.currentPage} / {pageInfo.maxPage} || 총 문서수 {totalCount} 개 </h3> 수정하기 count */}
                </div>
                <div className={ApprovalCSS.appListTatbleDiv}>
                    <table className={ApprovalCSS.appListTable}>   {/* 게시판 시작 */}
                        <thead>
                            <tr className={ApprovalCSS.title}>
                                <th>문서번호</th>
                                <th>기안구분</th>
                                <th>등록일</th>
                                <th>기안서 제목</th>
                                <th>상태</th>
                                <th>결재 요청자</th>
                            </tr>                               {/* 게시글은 한 페이지 당 5개씩!!! */}
                        </thead>
                        <tbody>
                            {data && data.map((approval) => (
                                <tr 
                                    className={ApprovalCSS.lists} 
                                    key={approval.appCode}
                                    onClick={() => onClickDetailHandler(approval.appCode)}
                                >
                                    <th>{approval.appCode}</th>
                                    <th>{approval.appType}</th>
                                    <th>{formatDate(approval.appRegistDate)}</th>
                                    <th>{approval.appTitle}</th>
                                    <th>{approval.appStatus}</th>
                                    <th>{/* {approval.member.department.deptName}-{approval.member.memberName} */}</th>     {/* 기안한 사람 조회가 안됨...ㅠㅠㅠㅠ헝 짜증나....ㅠㅠㅠ */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
            </div>
        </div>
    );
}

export default ApprovalInProgress;