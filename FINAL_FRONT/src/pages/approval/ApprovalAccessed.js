import ApprovalCSS from './Approval.module.css';


function ApprovalAccessed() {
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                전자결재 완료 문서함!
            </div>
        </div>
    );
}

export default ApprovalAccessed;