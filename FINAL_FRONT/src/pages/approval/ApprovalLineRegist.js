import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI, callMemberListForAppAPI, callMemberForAppAPI } from '../../apis/AppLineAPICalls';
import { callApprovalMemberInfoAPI } from '../../apis/ApprovalAPICalls';
/* todolist 참고해서 만들어보기 */

function ApprovalLineRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {regist2} = useSelector(state => state.approvalReducer);
    const [expandedItems, setExpandedItems] = useState([]);
    const { accessors, selectedMem } = useSelector(state => state.applineReducer);
    const [form, setForm] = useState({});
    const [select, setSelect] = useState({});
    const [selected, setSelected] = useState({});
    const [selected2, setSelected2] = useState({});
    const [selected3, setSelected3] = useState({});
    const {appMember} = useSelector(state => state.approvalReducer);
    // const {memberCode} = useParams();
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 직원의 정보를 저장할 상태 변수
    const [selectedMember2, setSelectedMember2] = useState(null); // 선택된 직원의 정보를 저장할 상태 변수
    const [selectedMember3, setSelectedMember3] = useState(null); // 선택된 직원의 정보를 저장할 상태 변수

    // 부서에 해당하는 동일 직급 직원 조회
    const renderMembers = (dept, jobName) => {
        if (!accessors) return null; // accessors가 undefined인 경우 처리

        const members = accessors.accessor.filter(
        accessor =>
            accessor.department.deptCode === dept.deptCode &&
            accessor.job.jobName === jobName &&
            accessor.memberCode !== appMember?.memberCode &&
            accessor.memberCode !== selectedMember?.memberCode &&
            accessor.memberCode !== selectedMember2?.memberCode &&
            accessor.memberCode !== selectedMember3?.memberCode 
        );

        if (members.length === 0) return null;

        return (
        <ul>
            {members.map(member => (
            <li key={member.memberCode} onClick={e => onClickApplineSelectHandler(e, member)} name='memberCode'>
                <div className={ApprovalCSS.contentInfoDiv4}>
                    {member.memberName}
                </div>
            </li>
            ))}
        </ul>
        );
    };


    const onClickRemoveSelectedMember = (id) =>  {
        const removedList = selected.filter(slt => slt.memberCode !== id);
        alert('선택된 결재자를 삭제합니다.');
        setSelected(removedList);
    }

    const handleItemClick = (dept, jobName) => {
        const item = { dept, jobName };
        const isExpanded = expandedItems.some(
        expandedItem =>
            expandedItem.dept.deptCode === dept.deptCode && expandedItem.jobName === jobName
        );

        if (isExpanded) {
        setExpandedItems(expandedItems.filter(
            expandedItem => !(expandedItem.dept.deptCode === dept.deptCode && expandedItem.jobName === jobName)
        ));
        } else {
        setExpandedItems([...expandedItems, item]);
        }
    };

    useEffect(() => {
        dispatch(callMemberListForAppAPI());
        dispatch(callApprovalMemberInfoAPI());
    }, []);

    // useEffect(() => {
    //     dispatch(callMemberForAppAPI(memberCode));
    //   }, [dispatch, memberCode]);

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

    /* 조직도에서 이름을 클릭하면 결재선으로 선택되는 클릭 이벤트 */
    const onClickApplineSelectHandler = (e, member) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 상태 변수에 저장하기!!
        setSelectedMember(member);
        setSelectedMember2(member);
        setSelectedMember3(member);

        setSelect({
            ...select,
            [e.target.name] : e.target.value
        });
    }
    const onClickApplineSelectHandler2 = (e, member) => {
        // 선택된 직원의 정보를 상태 변수에 저장하기!!
        setSelectedMember2(member);

        setSelect({
            ...select,
            [e.target.name] : e.target.value
        });
    }
    const onClickApplineSelectHandler3 = (e, member, member2, member3) => {
        // 이전의 클릭 이벤트 중지하기!!
        e.stopPropagation();

        // 선택된 직원의 정보를 상태 변수에 저장하기!!
        setSelectedMember(member);
        setSelectedMember2(member2);
        setSelectedMember3(member3);

        setSelect({
            ...select,
            [e.target.name] : e.target.value
        });
    }
    
    const onChangeApplineSelectHandler = (e) => {
        setSelected({
            ...selected,
            [e.target.name] : e.target.value
        });
    }
    
    const onChangeApplineSelectHandler2 = (e) => {
        setSelected2({
            ...selected2,
            [e.target.name] : e.target.value
        });
    }
    
    const onChangeApplineSelectHandler3 = (e) => {
        setSelected3({
            ...selected3,
            [e.target.name] : e.target.value
        });
    }

    const onClickApplineResetHandler = () => {}
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
                            {accessors?.dept && accessors.dept.map(dept => {
                                const uniqueJobNames = new Set();
                                accessors?.accessor.forEach(accessor => {
                                if (accessor.department.deptCode === dept.deptCode) {
                                    uniqueJobNames.add(accessor.job.jobName);
                                }
                                });
                                const jobNames = Array.from(uniqueJobNames);

                                return (
                                <li key={dept.deptCode}>
                                    <div className={ApprovalCSS.contentInfoDiv2}>
                                        {dept.deptName}
                                    </div>
                                    <ul>
                                    {jobNames.map(jobName => {
                                        const isExpanded = expandedItems.some(
                                        expandedItem =>
                                            expandedItem.dept.deptCode === dept.deptCode &&
                                            expandedItem.jobName === jobName
                                        );

                                        return (
                                        <li key={`${dept.deptCode}-${jobName}`} onClick={() => handleItemClick(dept, jobName)}>
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
                           <li><div className={ApprovalCSS.contentInfoDiv4}>{appMember && appMember.job.jobName} - {appMember && appMember.memberName}</div></li> 
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                제1 결재선
                            </div>
                            {selectedMember && (
                             <li>
                                <div 
                                    className={ApprovalCSS.contentInfoDiv3}
                                    onChange={onChangeApplineSelectHandler}
                                    onClick={onClickRemoveSelectedMember}
                                    name="memberCode"
                                >
                                    {selectedMember.job.jobName} - {selectedMember.memberName}
                                </div>
                             </li>
                             )}
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                제2 결재선
                            </div>
                            {selectedMember2 && (
                             <li>
                                <div 
                                    className={ApprovalCSS.contentInfoDiv3}
                                    onChange={onChangeApplineSelectHandler2}
                                    onClick={onClickRemoveSelectedMember}
                                    name="memberCode"
                                >
                                    {selectedMember2.job.jobName} - {selectedMember2.memberName}
                                </div>
                             </li>
                             )}
                        </ul>
                        <ul>
                            <div className={ApprovalCSS.contentInfoDiv2}>
                                최종 결재선
                            </div>
                            {selectedMember3 && (
                             <li>
                                <div 
                                    className={ApprovalCSS.contentInfoDiv3}
                                    onChange={onChangeApplineSelectHandler3}
                                    onClick={onClickRemoveSelectedMember}
                                    name="memberCode"
                                >
                                    {selectedMember3.job.jobName} - {selectedMember3.memberName}
                                </div>
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