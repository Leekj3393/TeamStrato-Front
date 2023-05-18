import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalRegistAPI } from '../../apis/ApprovalAPICalls';
import { callMemberDetailAPI } from '../../apis/MemberAPICalls';
import { getMemberId } from '../../utils/TokenUtils';
import { getDate } from 'date-fns';



function ApprovalRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector((state) => state.memberReducer);
    const {regist} = useSelector((state) => state.approvalReducer);
    const {memberCode} = useParams();
    const [form, setForm] = useState({member: {memberCode}});

    useEffect(() => {
        dispatch(callMemberDetailAPI({memberCode}));
    }, []);

    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('결재선 선택 페이지로 이동합니다.');
                navigate("/approval/appline", {replace: true});
            }
        },
        [regist]
    );

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };


    const onClickRegistHandler = () => {

        if(

            !form.appTitle || !form.appContent || !form.appType || !form.appStatus
        ) {
            alert("양식을 모두 입력해주세요.");
            return;
        } else if(form.appType !== '기안문') {
            alert("^기안문^이라고 입력하세요!");
            return;
        } else if(form.appStatus !== '대기') {
            alert("^대기^라고 입력하세요!");
            return;
        }

        dispatch(callApprovalRegistAPI(form));
    }

    const onClickResetHandler = () => {
        navigate("/approval", {replace : true});
    }

    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}            
            <div className={ApprovalCSS.appContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    <b>기안문 작성</b> &gt; 결재선 선택 &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.appFormDiv}>
                    <table>
                        <tr>
                            <th colSpan={1}>기안자</th>
                            <td>기안자이름{member.memberName}</td>
                            <th colSpan={1}>부서</th>
                            <td>부서명{/* {member.department.deptName} */}</td>
                        </tr>
                        <tr>
                            <th colSpan={1}>구분</th>
                            <td>기안문</td>
                            <th colSpan={1}>등록일</th>
                            <td>2023-05-18</td>
                        </tr>
                        <tr>
                            <th colSpan={1}>제목</th>
                            <td colSpan={3}><input className='app-title' type='text' value=''></input></td>
                        </tr>
                        <tr>
                            <th colSpan={1} rowSpan={3}>내용</th>
                            <td colSpan={3} rowSpan={3}><input className='app-content' type='text' value=''></input></td>
                        </tr>
                    </table>
                </div>

            </div>                                                               {/* 본문 내용 끝 */}
            <div className={ApprovalCSS.nextBtnDiv}>

                <button onClick={onClickRegistHandler}><img src='../image/next-btn.png'></img></button>
                <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png'></img></button>

            </div>

        </div>
    );
}

export default ApprovalRegist;

{/* <label for='type-select'>기안 구분 : </label><br/>
<select name='appType' id='type-select' onChange={onChangeHandler}>
    <option value=''>기안 타입을 선택해주세요.</option>
    <option value="기안문">기안문</option>
</select><br/><br/>
<label for='status-select'>기안 상태 : </label><br/>
<select name='appStatus' id='status-select' onChange={onChangeHandler}>
    <option value=''>기안 상태를 선택해주세요.</option>
    <option value="대기">대기</option>
</select> */}
{/* <label>기안자 : </label><br/>
<input 
    type='text' 
    name='memberCode'
    autoComplete='off'
    value={getMemberId()}
    readOnly={true}
    /><br/><br/>
<label>제목 : </label><br/>
<input 
    type='text' 
    name='appTitle'
    autoComplete="off"
    onChange={onChangeHandler}
    /><br/><br/>

<label>내용 : </label><br/>
<input 
    type='text' 
    name='appContent'  
    autoComplete="off"
    onChange={onChangeHandler}
    /><br/><br/>

<label>기안 구분 : </label><br/>
<input 
    type='text' 
    name='appType' 
    autoComplete="off"
    onChange={onChangeHandler}
    placeholder='기안문'
    />
<br/><br/>

<label>기안상태 : </label><br/>
<input 
    type='text' 
    name='appStatus' 
    autoComplete="off"
    onChange={onChangeHandler}
    placeholder='대기'
/>
<br/><br/>  */}