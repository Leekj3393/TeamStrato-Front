import edCSS from"./EducationRegist.module.css";

function EducationRegist({setEduModalOpen}) {

    /* 모달창 끄기 */
    const onClickCloseEduModal = () => {
        setEduModalOpen(false);
    };

    return (
        <div className={edCSS.roleModal}>
            <div className={edCSS.roleModalContainer}>
                <div className={edCSS.roleModalDiv}>
                    <span>교육 등록</span>
                    <div className={edCSS.modalEduTitle}>
                        <label>교육 제목</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>필수 여부</label>
                        <select>
                            <option>필수</option>
                            <option>선택</option>
                        </select>
                    </div>
                    <div>
                        <label>교육 카테고리</label>
                        <select>
                            <optiono>안전</optiono>
                            <optiono>직무</optiono>
                            <optiono>기타</optiono>
                        </select>
                    </div>
                    <div className={edCSS.modalEduVideo}>
                        <label>영상첨부</label>
                        <input type="file" accept="video/mp4, video/mkv, video/x-m4v, video/*"/>
                    </div>
                    <div>
                        <button>등록</button>
                        <butoon onClick={onClickCloseEduModal}>취소</butoon>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationRegist;