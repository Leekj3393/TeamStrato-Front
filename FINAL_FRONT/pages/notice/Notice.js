import NoticeCSS from './Notice.css';


function Notice() {
    return(
        <div className={NoticeCSS}>
            <div className='content'>
                공지사항!
            </div>
        </div>
    );
}

export default Notice;