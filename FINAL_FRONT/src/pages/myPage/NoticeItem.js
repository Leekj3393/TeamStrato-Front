import { useNavigate } from 'react-router-dom';
import NoticeCSS from './NoticeItem.module.css';

function NoticeItem({ notice : { noticeCode, deptName, noticeTitle, noticeRegistDate }}) {

    const navigate = useNavigate();

    const onClickNoticeHandler = (noticeCode) => {
        navigate(`/notice/${noticeCode}`);
    }

    return (
        <div 
            className={ NoticeCSS.noticeDiv }
            onClick={ () => onClickNoticeHandler(noticeCode) }
        >
            
            <h5>{ noticeCode }</h5>
            <h5>{ deptName }</h5>
            <h5>{ noticeTitle }</h5>
            <h5>{ noticeRegistDate }</h5>
        </div>
    );
}

export default NoticeItem;