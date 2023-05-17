import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MemberDetailCSS from './MemberDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callMemberDetailAPI } from '../../apis/MemberAPICalls';
import { callMemberImageAPI } from '../../apis/MemberFileAPICalls';


function MemberDetail () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { memberDt } = useSelector(state => state.memberReducer);
    const { memberImg } = useSelector(state => state.memberFileReducer);
    const params = useParams();
    const memberCode = params.memberCode;
    const serverUrl = "http://localhost:8001/images/member/"

    console.log("member", memberDt);
    console.log("memberImg", memberImg);

    useEffect(
        () => {
            dispatch(callMemberDetailAPI({memberCode}));
            dispatch(callMemberImageAPI({memberCode}));
        },
        []
    );

    const onClickMemberModify = () => {
        navigate(`/member/modify/${memberCode}`);
    }

    return (
        <>  
            <div className="memberDtTitle">
                직원 상세조회
            </div>
            <div className='memberDiv'>
            <div className="memberDtBack">
            <div className="memberImageDiv">
                <img className="memberImagePreview" src={ serverUrl + memberImg?.filePath } alt="preview"></img>
            </div>
            <div className="memberDtTop">
                <span className='memberDtName'>
                    { memberDt && memberDt.memberName }
                </span>
                <button className='memberDtBt1'>권한</button>
                <button className='memberDtBt2'>인사이동</button>
                <button className='memberDtBt3' onClick={onClickMemberModify}>수정하기</button>
            </div>
            <div className='memberDtDpt'>
                <span className="memberDptName">부서</span>
                <span className="memberDptDes">
                    { memberDt && memberDt.department?.deptName }
                </span>
            </div>
            <div className='memberDtJob'>
                <span className='memberJobName'>직책</span>
                <span className='memberJobDes'>
                    { memberDt && memberDt.job?.jobName }
                </span>
            </div>
            <div>
                <div className='memberDtPhone'>
                    <img src="/image/memberPhone.png"></img>
                    <span>
                        { memberDt && memberDt.phone }
                    </span>
                </div>
                <div className="memberDtEmail">
                <img src="/image/memberId.png"></img>
                <span>
                    { memberDt && memberDt.memberId }
                </span>
                </div>
            </div>
            <div className="memberDtEmp">
                <div className='memberEmpTitle'>인사정보</div>
                <div className="memberEmpDiv">
                    <span >사번</span>
                    <span className='memberEmpDiv2'>
                        { memberDt && memberDt.memberCode }
                    </span>
                </div>
                <div className="memberEmpDiv">
                    <span>입사일</span>
                    <span className='memberEmpDiv2'>
                        { memberDt && memberDt.memberHireDate }
                    </span>
                </div>
            </div>
            <div className="memberDtPer">
                <div className='memberEmpTitle'>개인정보</div>
                <div className="memberEmpDiv">
                    <span>성별</span>
                    <span className='memberEmpDiv2'>
                        { memberDt && memberDt.gender }
                    </span>
                </div>
                <div className="memberEmpDiv">
                    <span>주소</span>
                    <span className='memberEmpDiv2'>
                        { memberDt && memberDt.address }
                    </span>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default MemberDetail;