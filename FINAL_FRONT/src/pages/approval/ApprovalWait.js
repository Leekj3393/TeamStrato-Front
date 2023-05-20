import ApprovalCSS from './Approval.module.css';


function Approval() {
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                전자결재 결재 대기함!
                <div className={ApprovalCSS.appWListTableInfo}>
                    <h3>페이지 1 / 100 || 총 문서수 500 개 </h3> {/* 수정하기 count */}
                </div>
            </div>
        </div>
    );
}

export default Approval;