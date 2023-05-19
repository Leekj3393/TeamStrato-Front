import { useNavigate, useParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalRegistAPI, callApprovalMemberInfoAPI } from '../../apis/ApprovalAPICalls';
import approvalReducer from '../../modules/ApprovalModule';

function ApprovalRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {memberCode} = useParams();
    const [form, setForm] = useState({member: memberCode});
    const {regist, appMember} = useSelector(state => state.approvalReducer);

    useEffect(
        () => {
            dispatch(callApprovalMemberInfoAPI());
        }, []
    );

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
            !form.appTitle || !form.appContent || !form.appType
        ) {
            alert("양식을 모두 입력해주세요.");
            return;
        }
    };
    const onClickResetHandler = () => {};

    return (
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.flowInfo}>
                    <b>기안문 작성</b> &gt; 결재선 선택 &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.appFormDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <th colSpan={1}>기안자</th>
                                <td name='memberCode' onChange={onChangeHandler}>{appMember && appMember.memberName}</td>
                                <th colSpan={1}>부서</th>
                                <td name='deptCode'>{appMember && appMember.department.deptName}</td>
                            </tr>
                            <tr>
                                <th colSpan={1}>구분</th>
                                <td name='appType' onChange={onChangeHandler}>기안문</td>
                                <th colSpan={1}>등록일</th>
                                <td className='today'>'2023-05-18'</td>
                            </tr>
                            <tr>
                                <th colSpan={1}>제목</th>
                                <td colSpan={5}>
                                    <input
                                        name='appTitle'
                                        type='text'
                                        placeholder='기안문의 제목을 입력해주세요.'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={1} rowSpan={3}>내용</th>
                                <td colSpan={3} rowSpan={3}>
                                    <textarea
                                        placeholder='기안문의 내용을 입력해주세요.'
                                        name='appContent'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={ApprovalCSS.nextBtnDiv}>
                <button onClick={onClickRegistHandler}><img src='../image/next-btn.png' alt='Next' /></button>
                <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png' alt='Cancel' /></button>
            </div>
        </div>
    );
}

export default ApprovalRegist;
