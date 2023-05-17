import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI, callMemberListForAppAPI} from '../../apis/ApprovalAPICalls';
import { calljobDeptListAPI } from '../../apis/MemberAPICalls';


function ApprovalLineRegist() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {jobDept} = useSelector((state) => state.memberReducer);
    const {regist2, member} = useSelector((state) => state.approvalReducer);
    const {memberCode, deptCode} = useParams();
    const [params] = useSearchParams();
    const deptName = params.get("deptName");
    const [form2, setForm2] = useState({
        member: {memberCode},
    });



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
        setForm2({
            ...form2,
            [e.target.name] : e.target.value
        });
    }



    const onClickInsertHandler = () => {
        dispatch(callAppLineInsertAPI(form2));
    }

    const onClickApplineSelectHandler = () => {}

    const onClickApplineResetHandler = () => {}

    const onClickPeruserSelectHandler = () => {}

    const onClickPeruserResetHandler = () => {}

    const onClickResetHandler = () => {}

    /* 부서 값 변경 이벤트 */
    const onChangeDeptHandler = (e) => {
        setForm2({
            ...form2,
            department : { deptCode : e.target.value}
        })     
    }

    /* 멤버 변경 이벤트 */
    const onChangeMemberHandler = (e) => {
        setForm2({
            ...form2,
            member : { memberCode : e.target.value}
        })     
    }


    useEffect(() => {
        // dispatch(calljobDeptListAPI());
        dispatch(callMemberListForAppAPI());
    }, []);

    
 
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.appContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    기안문 작성 &gt; <b>결재선/열람자 선택</b> &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.selectApplineDiv}>
                    <fieldset>
                        <legend>결재선 선택</legend>
                        <div>
                            <h4>결재선 1</h4>
                                {/* <label>부서 선택</label><br/>
                                <select name="deptCode" onChange={onChangeDeptHandler}>
                                    {jobDept?.dept &&
                                        jobDept.dept.map((dept) => (
                                            <option 
                                                key={dept.deptCode} 
                                                value={dept.deptCode}
                                                
                                            >
                                                {dept.deptCode}. {dept.deptName}
                                            </option>
                                    ))}
                                </select><br/>
                                 */}
                                <label>결재선 선택</label><br/>
                                <select name='memberCode' onChange={onChangeMemberHandler}>
                                    <option value="selection" disabled>선택</option>    
                                    {member?.mb && 
                                        member.mb.map((mb) => (
                                            <option
                                                key={mb.deptCode}
                                                value={mb.memberCode}
                                            >
                                                {mb.deptCode} - {mb.memberName}
                                            </option>
                                        ))}
                                </select>
                        
                        </div>
                    </fieldset>
                </div>
                <div className={ApprovalCSS.selectPeruserDiv}>
                    <fieldset>
                        <legend>열람자 선택</legend>
                        <div>

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