import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callAppLineInsertAPI, callMemberListForAppAPI } from '../../apis/AppLineAPICalls';


function ApprovalLineRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {regist2} = useSelector(state => state.approvalReducer);
    const [expandedItems, setExpandedItems] = useState([]);
    const { accessors } = useSelector(state => state.applineReducer);
    const [form, setForm] = useState({});
    const [select, setSelect] = useState({});
    const [selected, setSelected] = useState({});

    // 부서에 해당하는 동일 직급 직원 조회
  const renderMembers = (dept, jobName) => {
    if (!accessors) return null; // accessors가 undefined인 경우 처리

    const members = accessors.accessor.filter(
      accessor =>
        accessor.department.deptCode === dept.deptCode &&
        accessor.job.jobName === jobName
    );

    if (members.length === 0) return null;

    return (
      <ul>
        {members.map(member => (
          <li key={member.memberCode} onClick={onClickApplineSelectHandler} name='memberCode'>
            {member.memberName}
          </li>
        ))}
      </ul>
    );
  };

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

    const onClickApplineSelectHandler = (e) => {
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
                    <div className={ApprovalCSS.memberChartBox}>
                        <div className={ApprovalCSS.memberChartContent}>
                        <h4>조직도</h4>
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
                                    {dept.deptName}
                                    <ul>
                                    {jobNames.map(jobName => {
                                        const isExpanded = expandedItems.some(
                                        expandedItem =>
                                            expandedItem.dept.deptCode === dept.deptCode &&
                                            expandedItem.jobName === jobName
                                        );

                                        return (
                                        <li key={`${dept.deptCode}-${jobName}`} onClick={() => handleItemClick(dept, jobName)}>
                                            {jobName}
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
                        <h4>결재선</h4>
                        <ul>
                           기안자
                           <li><h3>기안자 이름{}</h3></li> 
                        </ul>
                        <ul>
                           제1 결재선
                           <li name="memberName" onChange={onChangeApplineSelectHandler}><h3>선택된 제1 결재자 이름{}</h3></li> 
                        </ul>
                        <ul>
                           제2 결재선
                           <li><h3>선택된 제2 결재자 이름{}</h3></li> 
                        </ul>
                        <ul>
                           최종 결재선
                           <li><h3>선택된 최종 결재자 이름{}</h3></li> 
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