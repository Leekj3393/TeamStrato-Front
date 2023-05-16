import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MemberDetailCSS from './MemberDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callMemberDetailAPI } from '../../apis/MemberAPICalls';


function MemberDetail () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector(state => state.memberReducer);
    const params = useParams();
    const memberCode = params.memberCode;

    console.log("member", member);
    
    useEffect(
        () => {
            dispatch(callMemberDetailAPI({memberCode}));
        },
        []
    );

    return (
        <>  
            <div className="memberDtTitle">
                직원 상세조회
            </div>
            <div className='memberDiv'>
            <div className="memberDtBack">
            <div className="memberImageDiv">
                <img className="memberImagePreview" src="/image/memberId.png" alt="preview"></img>
            </div>
            <div className="memberDtTop">
                <span className='memberDtName'>
                    { member.memberName }
                </span>
                <button className='memberDtBt1'>권한</button>
                <button className='memberDtBt2'>인사이동</button>
                <button className='memberDtBt3'>수정하기</button>
            </div>
            <div className='memberDtDpt'>
                <span className="memberDptName">부서</span>
                <span className="memberDptDes">
                    { member.department?.deptName }
                </span>
            </div>
            <div className='memberDtJob'>
                <span className='memberJobName'>직책</span>
                <span className='memberJobDes'>
                    { member.job?.jobName }
                </span>
            </div>
            <div>
                <div className='memberDtPhone'>
                    <img src="/image/memberPhone.png"></img>
                    <span>
                        { member.phone }
                    </span>
                </div>
                <div className="memberDtEmail">
                <img src="/image/memberId.png"></img>
                <span>
                    { member.memberId }
                </span>
                </div>
            </div>
            <div className="memberDtEmp">
                <div className='memberEmpTitle'>인사정보</div>
                <div className="memberEmpDiv">
                    <span >사번</span>
                    <span className='memberEmpDiv2'>
                        { member.memberCode }
                    </span>
                </div>
                <div className="memberEmpDiv">
                    <span>입사일</span>
                    <span className='memberEmpDiv2'>
                        { member.memberHireDate }
                    </span>
                </div>
            </div>
            <div className="memberDtPer">
                <div className='memberEmpTitle'>개인정보</div>
                <div className="memberEmpDiv">
                    <span>성별</span>
                    <span className='memberEmpDiv2'>
                        { member.gender }
                    </span>
                </div>
                <div className="memberEmpDiv">
                    <span>주소</span>
                    <span className='memberEmpDiv2'>
                        { member.address }
                    </span>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default MemberDetail;