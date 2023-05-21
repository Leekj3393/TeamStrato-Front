import { NavLink } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';


function Approval() {


    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.appInfoBoxDiv}>
                    
                </div>
                <div className={ApprovalCSS.appMainTableInfo}>
                    <h3><b>결재 대기문서가 5 개있습니다.</b></h3> {/* 수정하기 count */}
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
                                <tr className={ApprovalCSS.lists}>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                </tr>
                                <tr className={ApprovalCSS.lists}>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                </tr>
                                <tr className={ApprovalCSS.lists}>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                </tr>
                                <tr className={ApprovalCSS.lists}>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                </tr>
                                <tr className={ApprovalCSS.lists}>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                </tr>
                            {/* {data && data.map((approval) => (
                                <tr className={ApprovalCSS.lists} key={approval.noticeCode}>
                                    <th>{approval.noticeCode}</th>
                                    <th>{approval.department.deptName}</th>
                                    <th>{approval.noticeTitle}</th>
                                    <th>{approval.noticeRegistDate}</th>
                                    <th>1000</th>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Approval;