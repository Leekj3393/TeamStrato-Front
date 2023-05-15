import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI } from '../../apis/ApprovalAPICalls';


function ApprovalLineRegist() {

    const [ perusers, setPerusers ] = useState('');
    const [ appline, setAppline] = useState('');
    const {regist} = useSelector(state => state.approvalReducer);
    const {data} = useSelector(state => state.approvalReducer);
    //const organChart = useSelector(state => state.approvalReducer);
    //const deptList = useSelector(state => state.approvalReducer);
    const organChart = useState();
    const deptList = useState();

    const params = useParams();
    const deptCode = params.deptCode;
    const memberCode = params.memberCode;
    
    const departments = deptList.data;
    console.log('organChart : ', organChart)
    const members = organChart.data;
    const removedList = perusers.data;
    const applineList = appline.data;
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
                <div className={ApprovalCSS.organChart}>
                    <fieldset>
                        <legend> 조직도 </legend>
                        <div>
                            {departments && departments.map((department) => (
                            <ul key={department.deptCode}>{department.deptName}
                                {members && members.map((member) =>(
                                <li key={member.department.deptCode}>
                                    <input type='radio' id={member.memberCode} name='membersForSelect'></input>
                                    <label for={member.memberCode}>{member.memberName}</label>
                                </li>
                                ))}
                            </ul>
                            ))}
                        </div>
                            
                    </fieldset>
                </div>
                <div className={ApprovalCSS.selectBtnDiv}>
                    <div className={ApprovalCSS.selectAppLineBtnDiv}>
                        <button onClick={onClickApplineSelectHandler} >결재선1 &gt;</button><br/>
                        <button onClick={onClickApplineResetHandler} >&lt; 결재선1</button><br/><br/>
                        <button onClick={onClickApplineSelectHandler} >결재선2 &gt;</button><br/>
                        <button onClick={onClickApplineResetHandler} >&lt; 결재선2</button><br/><br/>
                        <button onClick={onClickApplineSelectHandler} >최종 결재선 &gt;</button><br/>
                        <button onClick={onClickApplineResetHandler} >&lt; 최종 결재선</button><br/><br/>
                    </div>

                    <div className={ApprovalCSS.selectPeruserBtnDiv}>
                        <button onClick={onClickPeruserSelectHandler} > 열람자 &gt;</button><br/>
                        <button onClick={onClickPeruserResetHandler} >&lt; 열람자</button><br/><br/>

                    </div>
                </div>

                <div className={ApprovalCSS.selectedDiv}>
                    <div>
                        <fieldset className={ApprovalCSS.selectedAppLine}>
                            <legend>결재선</legend>
                            <label>기안자</label>
                            <input onChage={onChangeSelectedHandler} placeholder='기안자'></input><br/><br/>
                            <label>결재선1</label>
                            <input onChage={onChangeSelectedHandler} placeholder='결재선1'></input><br/><br/>
                            <label>결재선2</label>
                            <input onChage={onChangeSelectedHandler} placeholder='결재선2'></input><br/><br/>
                            <label>최종 결재선</label>
                            <input onChage={onChangeSelectedHandler} placeholder='최종 결재선'></input>
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className={ApprovalCSS.selectedPerUser}>
                            <legend>열람자</legend>
                            {/* {data && data.map( (peruser) =>  */}
                                <ul /* key={peruser.member.memberCode} */>
                                    <li>
                                        {/* {peruser.member.memberName} */}
                                        <button onClick={() => onClickRemovePeruserHandler(/* peruser.member.memberCode */)}>X</button>
                                    </li>
                                </ul>
                            {/* )} */}
                        </fieldset>
                    </div>
                </div>

                <div className={ApprovalCSS.registFormDiv}>

                    <button onClick={onClickInsertHandler}><img src='../image/app-regist-btn.png'></img></button>
                    <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png'></img></button>

                </div>




            </div>                                                                {/* 본문 내용 끝  */}
        </div>
    );
}

export default ApprovalLineRegist;