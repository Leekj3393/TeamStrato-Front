import { NavLink } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';


function ApprovalLineRegist() {
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                  {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.content0}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.contentDiv}>
                    기안문 작성 &gt; <b>결재선/열람자 선택</b> &gt; 결재 요청
                </div>
                



        </div>                                                          {/* 본문 내용 끝  */}
        </div>
    );
}

export default ApprovalLineRegist;