import { NavLink } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';


function Approval() {


    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.content0}>
                전자결재!
            </div>
        </div>
    );
}

export default Approval;