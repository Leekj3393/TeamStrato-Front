import ApprovalCSS from './Approval.module.css';


function ApprovalInProgress() {
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                전자결재 진행함 페이지!!!
            </div>
        </div>
    );
}

export default ApprovalInProgress;