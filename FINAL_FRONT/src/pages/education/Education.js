import { useNavigate } from 'react-router-dom';
import EducationCSS from './Education.css';
import { useState } from 'react';
import EducationRegist from './EducationRegist';


function Education () {

    const navigate = useNavigate();
    const [EdumodalOpen, setEduModalOpen] = useState(false);

    /* 교육 등록 핸들러 */
    const onClickEduRegistHandler = (e) => {
        navigate(`/education/regist`);
    };

    /* 교육 등록 모달창  */
    const onClickOpenEduModal = () => {
        setEduModalOpen(true);
    };

    /* 안전 교육 리스트 이동 핸들러 */
    const onClickEduListSafeHandler = (e) => {
        navigate('/education/safety');
    };

    return (
        <div className='eduBack'>
            <div className='eduList'>
                수강 교육 목록
            </div>
            <div className="eduListBox">
                <div>
                    <div className='eduTitle'>
                        <div>제목</div>
                        <div className='eduStatus'>수강상태</div>
                    </div>
                    <div className='eduPer'>
                        <div>진도율(%) : </div>
                        <div className='eduDate'>수강날짜 : </div>
                    </div>
                    <hr className='eduListHr'/>
                </div>
            </div>
            <div className='edListBt1'>
                <button onClick={onClickEduListSafeHandler}>안 전</button>
            </div>
            <div className='edListBt2'>
                <button>직 무</button>
            </div>
            <div className='edListBt3'>
                <button>기 타</button>
            </div>
            <div className="eduListRg">
                <button onClick={onClickOpenEduModal}>교육 등록</button>
                {EdumodalOpen && <EducationRegist setEduModalOpen={setEduModalOpen}/>}
            </div>
        </div>
    );
}

export default Education;