import { useEffect, useState } from 'react';
import EducationSubNavbar from '../../components/common/EducationSubNavbar';
import EduSafeCSS from './EduSafe.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEducationSafetyAPI } from '../../apis/EducationAPICalls';
import PagingBar from '../../components/common/EducationPagingBar';
import { useNavigate } from 'react-router';


function EduSafe() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector((state) => state.educationReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callEducationSafetyAPI({currentPage}));
        },
        [currentPage]
    )

    /* 교육 상세조회 핸들러 */
    const onClickEducationDtHandler = (edCode) => {
        navigate(`/education/${edCode}`);
    };

    /* 교육시간 변환 함수 */
    function formatTime(durationInSeconds) {
        const minutes = Math.floor(durationInSeconds / 60000);
        

        return `약 ${minutes}분 `;
    }

    return (
        <>        
        
        <div className={EduSafeCSS.eduListBack}>
            <div className={EduSafeCSS.haeder}>{<EducationSubNavbar/>}</div>
            {data && data.map(education => (
            <div 
                key={education.edCode}
                className={EduSafeCSS.eduListDiv}
            >
                <div className={EduSafeCSS.eduListTitle}>
                    {education.edName}
                </div>
                <div className={EduSafeCSS.eduListStatus}>
                <button style={{ backgroundColor: education.edStatus === "Y" ? "#FFD6D6" : "#D6EEFF" }}>
                        {education.edStatus === "Y" ? "필수" : "선택"}
                    </button>
                </div>
                <div className={EduSafeCSS.eduListTime}>
                    영상시간 : {formatTime(education.edTime)}
                </div> 
                <div className={EduSafeCSS.eduListBt}>
                    <button onClick={ () => onClickEducationDtHandler(education.edCode)}>시 청</button>
                </div>
            </div>
            ))};
            <div className={EduSafeCSS.eduListPaging}>
                {pageInfo && (
                    <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
                )}
            </div>
        </div>
        </>
    );
}

export default EduSafe;