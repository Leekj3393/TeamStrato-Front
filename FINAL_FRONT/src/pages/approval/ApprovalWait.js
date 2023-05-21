import { useDispatch, useSelector } from 'react-redux';
import PagingBar from '../../components/common/PagingBar';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { callApprovalWListAPI } from '../../apis/ApprovalAPICalls';


function Approval() {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.approvalReducer);
    const approvals = useSelector(state => state.approvalReducer);
    const pageInfo = approvals.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callApprovalWListAPI({currentPage}));
    }, 
    [currentPage])

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                전자결재 결재 대기함!
                <div className={ApprovalCSS.appListTableInfo}>
                    <h3>페이지 1 / 100 || 총 문서수 500 개 </h3> {/* 수정하기 count */}
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
                                <tr className={ApprovalCSS.lists} key={approval.appCode}>
                                    <th>{approval.appCode}</th>
                                    <th>{approval.appType}</th>
                                    <th>{approval.appRegistDate}</th>
                                    <th>{approval.appTitle}</th>
                                    <th>{approval.appStatus}</th>
                                    <th>{/* {approval.member.department.deptName}-{approval.member.memberName} */}</th>
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

export default Approval;