import { NavLink, useNavigate } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalListAPIForAccessor } from '../../apis/ApprovalAPICalls';
import PagingBar from '../../components/common/PagingBar';


function Approval() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector((state) => state.approvalReducer);
    const [currentPage, setCurrentPage] = useState(1);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }


    useEffect(
        () => {
            dispatch(callApprovalListAPIForAccessor({currentPage}));
        },
        [currentPage]
    )

    /* 상세페이지로 이동 */
    const onClickDetailHandler = (appCode) => {
        navigate(`${appCode}`);
    };

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.appInfoBoxDiv}>
                    
                </div>
                <div className={ApprovalCSS.appMainTableInfo}>
                    <h3><b>결재 대기문서가 {} 개 있습니다.</b></h3> {/* 수정하기 count */}
                </div>
                <div className={ApprovalCSS.appMainTatbleDiv}>
                    <table className={ApprovalCSS.appMainTable}>   {/* 게시판 시작 */}
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