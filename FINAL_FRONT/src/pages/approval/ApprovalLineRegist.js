import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI, callMemberListForAppAPI } from '../../apis/AppLineAPICalls';
// import { calljobDeptListAPI } from '../../apis/MemberAPICalls';


function ApprovalLineRegist() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {regist2, applines} = useSelector(state => state.approvalReducer);
    // const {jobDept} = useSelector(state => state.memberReducer);

    // const {memberCode} = useParams();
    // const [params] = useSearchParams();
    const [form, setForm] = useState({
    });


    // applines.appline을 정렬하여 리스트화하는 함수
    const sortApplines = (applineList) => {
      // deptCode를 기준으로 오름차순 정렬
      const sortedByDept = applineList.sort((a, b) => a.department.deptCode - b.department.deptCode);
    
      // jobCode를 기준으로 오름차순 정렬
      const sortedByJob = sortedByDept.sort((a, b) => a.job.jobCode - b.job.jobCode);
    
      // memberCode를 기준으로 오름차순 정렬
      const sortedByMember = sortedByJob.sort((a, b) => a.memberCode - b.memberCode);
    
      return sortedByMember;
    };

    const sortedApplines = sortApplines(applines?.appline || []);





    // useEffect (
    //     () => {
    //         dispatch(calljobDeptListAPI());
    //     }
    //     ,
    //     []
    // );

    useEffect(() => {
        dispatch(callMemberListForAppAPI());
    }, []);


    useEffect(
        () => {
            if(regist2?.status === 200) {
                alert('상신완료!!!! 전자결재 메인화면으로 이동!!');
                navigate("/approval", {replace : true});
            } else if(regist2?.state === 400) {
                alert(regist2.message);
            }
        },
        [regist2]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }



    const onClickInsertHandler = () => {
        dispatch(callAppLineInsertAPI(form));
    }

    const onClickApplineSelectHandler = () => {}
    const onClickDeptSelectHandler = () => {}

    const onClickApplineResetHandler = () => {}

    const onClickPeruserSelectHandler = () => {}

    const onClickPeruserResetHandler = () => {}

    const onClickResetHandler = () => {}


    
    /* 부서 값 변경 이벤트 */
    const onChangeDeptHandler = (e) => {
        setForm({
            ...form,
            department : { deptCode : e.target.value}
        })     
    }
    
    /* 직급 값 변경 이벤트 */
    const onChangeJobHandler = (e) => {
        setForm({
            ...form,
            job : { jobCode : e.target.value}
        })     
    };
    
    /* 멤버 변경 이벤트 */
    const onChangeMemberSelectHandler = (e) => {
        setForm({
            ...form,
            member : { memberCode : e.target.value}
        })     
    }

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.appContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    기안문 작성 &gt; <b>결재선 선택</b> &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.selectApplineDiv}>
                    <fieldset>
                        <legend>결재선 선택</legend>
                        <div>
                            <label>결재선 1 선택</label><br/> {/* 1. 부서 > 직급 > 사원 조회 2. 선택 사원 결재선 표시 3. 등록 */}
                            <ul>
                            {sortedApplines.map((appline) => (
                                <li key={appline.memberCode} value={appline.memberCode}>
                                {appline.department.deptName}
                                <ul>
                                    <li value={appline.job.jobCode}>{appline.job.jobName}</li>
                                    <ul>
                                    <li value={appline.memberCode}>{appline.memberName}</li>
                                    </ul>
                                </ul>
                                </li>
                            ))}
                            </ul>

                        </div>
                    </fieldset>
                </div>
                <div className={ApprovalCSS.registFormDiv}>

                    <button onClick={onClickInsertHandler}><img src='../image/app-regist-btn.png'></img></button>
                    <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png'></img></button>

                </div>
            </div>
        </div>

    );
}

export default ApprovalLineRegist;




{/* <select name='memberCode' onChange={onChangeMemberSelectHandler}>
                                <option value="selection" disabled>선택</option>    
                                {applines?.job && 
                                    applines.job.map((job) => (
                                        <option
                                            key={job.memberCode}
                                            value={job.memberCode}
                                        >
                                            {job.department.deptName}-{job.memberName}
                                        </option>
                                    ))}
                            </select> */}