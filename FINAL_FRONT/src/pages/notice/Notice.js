import NoticeCSS from './Notice.module.css';


function Notice() {
    return(
        <div className={NoticeCSS}>
            <div className={NoticeCSS.content}>
                공지사항!
            </div>
        </div>
    );
}

export default Notice;