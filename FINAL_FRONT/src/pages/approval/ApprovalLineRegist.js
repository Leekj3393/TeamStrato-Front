import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI, callMemberListForAppAPI } from '../../apis/ApprovalAPICalls';


function ApprovalLineRegist() {

    const [ perusers, setPerusers ] = useState('');
    const [ appline, setAppline] = useState('');
    const {regist} = useSelector(state => state.approvalReducer);
    const {data} = useSelector(state => state.approvalReducer);
    const members = useSelector(state => state.approvalReducer.members);
    const deptList = useSelector(state => state.approvalReducer.deptList);  
    const departments = deptList?.data;
    const memberList = members?.data;
    console.log('members : ', members);
    console.log('memberList : ', memberList);
    //const removedList = perusers.data;
    //const applineList = appline.data;
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('상신완료!!!! 전자결재 메인화면으로 이동!!');
                navigate("/approval", {replace : true});
            } else if(regist?.state === 400) {
                alert(regist.message);
            }
        },
        [regist]
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

    const onClickRemovePeruserHandler = ({memberCode}) => {
        const removedList = perusers.filter(peruser => peruser.member.memberCode !== memberCode);
        setPerusers(removedList);
    };

    const onClickApplineSelectHandler = () => {}

    const onClickApplineResetHandler = () => {}

    const onClickPeruserSelectHandler = () => {}

    const onClickPeruserResetHandler = () => {}

    const onClickResetHandler = () => {}

    const onChangeSelectedHandler = () => {}

    
 
    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.appLineContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    기안문 작성 &gt; <b>결재선/열람자 선택</b> &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.selectApplineDiv}>
                    <fieldset>
                        <legend>결재선 선택</legend>
                        <div>
                            <label>결재선1</label><br/>
                            {data && data.map((member) => (
                                <select key={member.memberCode}>
                                    <option>{member.department.deptName}</option>
                                </select>
                            ))}
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