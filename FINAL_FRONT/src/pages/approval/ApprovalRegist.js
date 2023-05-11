import { NavLink } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';


function ApprovalRegist() {
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.content0}>
                전자결재 기안문 작성 페이지!!!!!!
                <NavLink to='/approval/appline'>
                    <div>결재선 선택 페이지로 이동하기!!!</div>
                </NavLink>
            </div>
        </div>
    );
}

export default ApprovalRegist;