import NoticeCSS from './Notice.css';

function NoticeStatus() {
    return(
        <div className={NoticeCSS}>
            <div className='content'>
                공지사항 관리자 상태별 페이지!
            </div>
        </div>
    );
}

export default NoticeStatus;