import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI,  callAppLine1InsertAPI, callAppLine2InsertAPI,  callAppLine3InsertAPI, callMemberListForAppAPI, callApprovalInfoForAppAPI } from '../../apis/AppLineAPICalls';
import { callApprovalMemberInfoAPI, callApprovalDetailAPI } from '../../apis/ApprovalAPICalls';
import { callMemberDetailAPI } from '../../apis/MemberAPICalls';


function ApprovalLineRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {appDetail, appMember} = useSelector(state => state.approvalReducer);
    const [expandedItems, setExpandedItems] = useState([]);
    const {regist2, accessors } = useSelector(state => state.applineReducer);
    const appCode = appDetail?.appCode;
    const {memberCode} = useParams();
    const [form, setForm] = useState([]);
    const [form2, setForm2] = useState([]);
    const [form3, setForm3] = useState([]);
    const [select, setSelect] = useState({});
    const [selected, setSelected] = useState({});

    const [firstAccessor, setFirstAccessor] = useState(null); // 첫 번째 결재선 직원 정보를 저장할 상태 변수
    const [secondAccessor, setSecondAccessor] = useState(null); // 두 번째 결재선 직원 정보를 저장할 상태 변수
    const [finalAccessor, setFinalAccessor] = useState(null); // 세 번째 결재선 직원 정보를 저장할 상태 변수

    /* 선택된 결재선에 대한 조회 */
    useEffect(() => {
        dispatch(callMemberDetailAPI({memberCode}));
        dispatch(callApprovalDetailAPI({appCode}));
        dispatch(callApprovalMemberInfoAPI());
        dispatch(callApprovalInfoForAppAPI({appCode}));
    }, []);

    const onChangeHandler = (e) => {
        if(appCode){
            if(e.target.name === 'appLineStatus1' || e.target.name === 'appPriorYn1' || e.target.name === 'appOrder1' ) {
                setForm({
                    ...form,
                    appLineStatus: 'appWait',
                    appPriorYn: 'Y',
                    appOrder: '1'
                });
            } else {
                setForm({
                    ...form,
                    approval: {appCode : appCode},
                    member: {memberCode : e.target.value},
                    
                });
            };
        };
    };
    const onChangeHandler2 = (e) => {
        if(appCode){
            if(e.target.name === 'appLineStatus2' || e.target.name === 'appPriorYn2' || e.target.name === 'appOrder2' ) {
                setForm2({
                    ...form2,
                    appLineStatus: 'appWait',
                    appPriorYn: 'N',
                    appOrder: '2'
                })
            } else {
                setForm2({
                    ...form2,
                    approval: {appCode : appCode},
                    member: {memberCode : e.target.value},
                    
                });
            };
        };
    };
    const onChangeHandler3 = (e) => {
        if(appCode){
            if(e.target.name === 'appLineStatus3' || e.target.name === 'appPriorYn3' || e.target.name === 'appOrder3' ) {
                setForm3({
                    ...form3,
                    appLineStatus: 'appWait',
                    appPriorYn: 'N',
                    appOrder: '3'
                })
            } else {
                setForm3({
                    ...form3,
                    approval: {appCode : appCode},
                    member: {memberCode : e.target.value},
                    
                });
            };
        };
    };
    
    // 부서에 해당하는 동일 직급 직원 조회
    const renderMembers = (dept, jobName) => {
        if (!accessors) return null; // accessors가 undefined인 경우 처리
        
        const members = accessors?.accessor?.filter(
            accessor =>
            accessor?.department?.deptCode === dept?.deptCode &&
            accessor?.job?.jobName === jobName &&
            accessor?.memberCode !== appMember?.memberCode &&
            accessor?.memberCode !== firstAccessor?.memberCode &&
            accessor?.memberCode !== secondAccessor?.memberCode &&
            accessor?.memberCode !== finalAccessor?.memberCode 
            );
            
        if (members?.length === 0) return null;
        
        return (
            <ul>
            {members?.map(member => (
                <li 
                key={member?.memberCode} 
                onClick={e => onClickApplineSelectHandler(e, member)} 
                name='memberCode'
                >
                <div className={ApprovalCSS.contentInfoDiv4}>
                    {member?.memberName}
                </div>
            </li>
            ))}
        </ul>
        );
    };
    
    const handleItemClick = (dept, jobName) => {
        const item = { dept, jobName };
        const isExpanded = expandedItems?.some(
            expandedItem =>
            expandedItem?.dept?.deptCode === dept?.deptCode && expandedItem?.jobName === jobName
            );
            
            if (isExpanded) {
                setExpandedItems(expandedItems?.filter(
                    expandedItem => !(expandedItem?.dept?.deptCode === dept?.deptCode && expandedItem?.jobName === jobName)
                    ));
                } else {
                    setExpandedItems([...expandedItems, item]);
                }
            };
            
            useEffect(() => {
                dispatch(callMemberDetailAPI({memberCode}));
                dispatch(callMemberListForAppAPI());
            }, []);
            
/* 서버 api 통신이 성공하면 받은 객체를 regist2 라는 키 값으로 저장한다. 
useEffect에서 해당 값이 변화함이 감지 되면 200번 코드임을 확인한 뒤 alert('상신완료!!!! 전자결재 메인화면으로 이동!!');을 띄운다 */
useEffect(
    () => {
        if(regist2?.status === 200) {
            alert('상신완료!!!! 전자결재 메인화면으로 이동!!');
            navigate("/approval", {replace : true});
        } else if(regist2?.state === 400) {
            alert(regist2.message);
            console.log('form : ', form);
            console.log('regist2 : ', regist2);
        }
    },
    [regist2]
);

    /* 결재 요청 버튼 클릭 시 이벤트 */
    const onClickInsertHandler = () => {
        if (!firstAccessor || !secondAccessor || !finalAccessor 
            || !form?.memberCode || !form?.appPriorYn || !form?.appLineStatus
            || !form2?.memberCode || !form2?.appPriorYn || !form2?.appLineStatus
            || !form3?.memberCode || !form3?.appPriorYn || !form3?.appLineStatus
            ) {
            if (!firstAccessor && !form?.memberCode) {
                alert("제1 결재선이 선택되지 않았습니다.");
                return;
            } else if (!secondAccessor && !form2?.memberCode) {
                alert("제2 결재선이 선택되지 않았습니다.");
                return;
            } else if (!finalAccessor && !form3?.memberCode) {
                alert("최종 결재선이 선택되지 않았습니다.");
                return;
            } else if ( !form?.appLineStatus) {
                alert("1전결상태가 누락되었습니다.");
                return;
            } else if ( !form?.appPriorYn) {
                alert("1전결여부가 누락되었습니다.");
                return;
            } else if ( !form2?.appPriorYn) {
                alert("2전결여부가 누락되었습니다.");
                return;
            } else if ( !form3?.appPriorYn) {
                alert("3전결여부가 누락되었습니다.");
                return;
            }
        }
    
        const combinedData = {
            form: form,
            form2: form2,
            form3: form3,
        };
    
        dispatch(callAppLineInsertAPI(combinedData));
    };

    /* 조직도에서 이름을 클릭하면 결재선으로 선택되는 클릭 이벤트 */
    const onClickApplineSelectHandler = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
        if (!firstAccessor) {
            setFirstAccessor(member);
        } else if (!secondAccessor) {
            setSecondAccessor(member);
        } else {
            setFinalAccessor(member);
        }

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }
    
    /* 조직도에서 클릭한 직원을 결재선 부분에 나타나는 이벤트 */
    const onChangeApplineSelectHandler = (e) => {
        setSelected({
            ...selected,
            [e.target.name] : e.target.value
        });
    };

    /* 결재선에서 이름을 클릭하면 삭제되는 클릭 이벤트 */
    const onClickApplineRemoveHandler = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
            setFirstAccessor(null);
            alert('제1 결재선을 초기화합니다.');

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }
    /* 결재선에서 이름을 클릭하면 삭제되는 클릭 이벤트 */
    const onClickApplineRemoveHandler2 = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
            setSecondAccessor(null);
            alert('제2 결재선을 초기화합니다.');

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }
    /* 결재선에서 이름을 클릭하면 삭제되는 클릭 이벤트 */
    const onClickApplineRemoveHandler3 = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 해당 결재선 상태 변수에 저장
            setFinalAccessor(null);
            alert('최종 결재선을 초기화합니다.');

        setSelect({
            ...select,
            [e.target.name]: e.target.value
        });
    }

    // 요거를 어떻게 해야할지 모르겠다@@
    const onClickResetHandler = () => {}


    return(
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>                           {/* 본문 하얀 네모 */}
            <div className={ApprovalCSS.appContentDiv}>                      {/* 본문 내용 시작 */}
                <div className={ApprovalCSS.flowInfo}>
                    기안문 작성 &gt; <b>결재선 선택</b> &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.selectApplineDiv}>
                    <div className={ApprovalCSS.memberChartBox}>
                        <div className={ApprovalCSS.memberChartContent}>
                        <div className={ApprovalCSS.contentInfoDiv}>조직도</div>
                        <ul className={ApprovalCSS.memberChartUl}>
                            {accessors?.dept && accessors?.dept?.map(dept => {
                                const uniqueJobNames = new Set();
                                accessors?.accessor?.forEach(accessor => {
                                if (accessor?.department?.deptCode === dept?.deptCode) {
                                    uniqueJobNames.add(accessor?.job?.jobName);
                                }
                                });
                                const jobNames = Array.from(uniqueJobNames);

                                return (
                                <li key={dept?.deptCode}>
                                    <div className={ApprovalCSS.contentInfoDiv2}>
                                        {dept?.deptName}
                                    </div>
                                    <ul>
                                    {jobNames?.map(jobName => {
                                        const isExpanded = expandedItems?.some(
                                        expandedItem =>
                                            expandedItem?.dept?.deptCode === dept?.deptCode &&
                                            expandedItem?.jobName === jobName
                                        );

                                        return (
                                        <li key={`${dept?.deptCode}-${jobName}`} onClick={() => handleItemClick(dept, jobName)}>
                                            {jobName} &gt;
                                            {isExpanded && renderMembers(dept, jobName)}
                                        </li>
                                        );
                                    })}
                                    </ul>
                                </li>
                                );
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={ApprovalCSS.selectedMemberDiv}>
                    <div className={ApprovalCSS.selectedMemberContent}>
                        <div className={ApprovalCSS.contentInfoDiv}>결재선</div>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                기안자
                            </div>
                           <li><div className={ApprovalCSS.contentInfoDiv4}>{appMember && appMember?.job?.jobName} - {appMember && appMember?.memberName}</div></li> 
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                제1 결재선
                            </div>
                            {firstAccessor && (
                             <li>
                                <div 
                                    className={ApprovalCSS.firstAccessor}
                                    onChange={onChangeApplineSelectHandler && onChangeHandler}
                                    onClick={onClickApplineRemoveHandler}
                                    name="memberCode"
                                >
                                    {firstAccessor?.job?.jobName} - {firstAccessor?.memberName}
                                </div>
                                <div onChange={onChangeHandler} name="appOrder1"></div>
                                <div onChange={onChangeHandler}  name="appLineStatus1"></div>
                                <div onChange={onChangeHandler}  name="appPriorYn1"></div>
                             </li>
                             )}
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                제2 결재선
                            </div>
                            {secondAccessor && (
                             <li>
                                <div 
                                    className={ApprovalCSS.secondAccessor}
                                    onChange={onChangeApplineSelectHandler && onChangeHandler2}
                                    onClick={onClickApplineRemoveHandler2}
                                    name="memberCode"
                                >
                                    {secondAccessor?.job?.jobName} - {secondAccessor?.memberName}
                                </div>
                                <div onChange={onChangeHandler2}  name="appOrder2"></div>
                                <div onChange={onChangeHandler2}  name="appLineStatus2"></div>
                                <div onChange={onChangeHandler2}  name="appPriorYn2"></div>
                             </li>
                             )}
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                최종 결재선
                            </div>
                            {finalAccessor && (
                             <li>
                                <div 
                                    className={ApprovalCSS.finalAccessor}
                                    onChange={onChangeApplineSelectHandler && onChangeHandler3}
                                    onClick={onClickApplineRemoveHandler3}
                                    name="memberCode"
                                >
                                    {finalAccessor?.job?.jobName} - {finalAccessor?.memberName}
                                </div>
                                <div onChange={onChangeHandler3}  name="appOrder3"></div>
                                <div onChange={onChangeHandler3}  name="appLineStatus3"></div>
                                <div onChange={onChangeHandler3}  name="appPriorYn3"></div>
                             </li>
                             )} 
                        </ul>
                    </div>
                </div>
                <div className={ApprovalCSS.registFormDiv2}>

                    <button onClick={onClickInsertHandler}><img src='../image/app-regist-btn.png'></img></button>
                    <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png'></img></button>

                </div>
            </div>
        </div>

    );
}

export default ApprovalLineRegist;