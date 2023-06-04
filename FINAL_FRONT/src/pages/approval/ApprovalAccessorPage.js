import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalDetailAPI, callAccessPutAPI, callIdentifyAccessorAPI, callApprovalMemberInfoAPI } from '../../apis/ApprovalAPICalls';
import { callAppLineDetailAPI } from '../../apis/AppLineAPICalls';
import {getMemberId, decodeJwt} from '../../utils/TokenUtils';

function ApprovalAccessorPage () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { access, appDetail, appMember } = useSelector(state => state.approvalReducer);
    const {appLineCode} = useParams();
    const params = useParams();
    const memberCode = appMember?.memberCode;
    const { appLineDetail } = useSelector(state => state.applineReducer);
    const [form, setForm] = useState({
        appLineCode: appLineDetail?.appLineCode,
        appLineStatus: '',
        appTime: ''
      });

    useEffect(
        () => {
            dispatch(callApprovalMemberInfoAPI());
        },[]
        );
    const appCode = params.appCode;
    useEffect(
        () => {
        dispatch(callAppLineDetailAPI({appCode}));
        dispatch(callApprovalDetailAPI({appCode}));
    },[]
    );
    
    // const [identifyingForm, setIdentifyingForm] = useState({
    //     memberId: getMemberId(),
    //     memberPassword: ''
    // });
    
    useEffect(() => {
        if(access?.status === 200){
            alert("결재 승인/반려 처리가 완료되었습니다.");
            navigate('/', { replace : true });
        }
    }, [access])
    

       

    const onChangeIdentifyHandler = (e) => {
    //     setIdentifyingForm({
    //         ...identifyingForm,
    //         [e.target.name] : e.target.value
    //     });
    };

    const onClickIdenticationHandler = () => {
        // dispatch(callIdentifyAccessorAPI(identifyingForm));
    };

    const onClickApprovalAccessHandler = () => {
        const updatedForm = {
            ...form,
            appLineStatus: 'appAccessed',
            appTime: new Date().toString()
          };
          setForm(updatedForm);
        
          dispatch(callAccessPutAPI(updatedForm));
    };

    const onClickApprovalReturnHandler = () => {};

    // const onClickBack = () => {}

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

 

    return (
            <div className={ApprovalCSS}>
                <div className={ApprovalCSS.square}></div>
                <div className={ApprovalCSS.appContentDiv}>
                    <div className={ApprovalCSS.applineInfoBoxDiv2}>
                        <table>
                                <thead>
                                    <tr>
                                        <th className={ApprovalCSS.col01}>기안자</th>
                                        <th className={ApprovalCSS.col02}>제1 결재선</th>
                                        <th className={ApprovalCSS.col03}>제2 결재선</th>
                                        <th className={ApprovalCSS.col04}>최종 결재선</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={ApprovalCSS.col05}>{appDetail && appDetail?.member?.memberName}</td>
                                        {appLineDetail && appLineDetail?.map((appLine) => (
                                        <td className={ApprovalCSS.col05}>{appLine?.accessor?.memberName}</td>
                                        ))}
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className={ApprovalCSS.col09}>요청</td>
                                        {appLineDetail && appLineDetail?.map((appLine) => (
                                        <td className={ApprovalCSS.col05}>{appLine?.appLineStatus}</td>
                                        ))}
                                    </tr>
                                </tfoot>
                        </table>
                    </div>
                    <div className={ApprovalCSS.appAccessorDiv}>
                        <table className={ApprovalCSS.approvalAccessorTable}>
                            <tbody>
                                <tr className={ApprovalCSS.accessorTr1}>
                                    <th className={ApprovalCSS.col1}>문서번호</th>
                                    <td className={ApprovalCSS.col8}>{appDetail  && appDetail?.appCode}</td>
                                    <th className={ApprovalCSS.col5}>부서</th>
                                    <td className={ApprovalCSS.col9}>{appDetail && appDetail?.member?.department?.deptName}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr2}>
                                    <th className={ApprovalCSS.col2}>구분</th>
                                    <td className={ApprovalCSS.col10}>{appDetail && appDetail?.appType}</td>
                                    <th className={ApprovalCSS.col6}>상태</th>
                                    <td className={ApprovalCSS.col11}>{appDetail && appDetail?.appStatus}</td>
                                    <th className={ApprovalCSS.col7}>등록일</th>
                                    <td className={ApprovalCSS.col12}>{formatDate(appDetail && appDetail?.appRegistDate)}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr3}>
                                    <th className={ApprovalCSS.col3}>제목</th>
                                    <td className={ApprovalCSS.col13}>{appDetail && appDetail?.appTitle}</td>
                                </tr>
                                <tr className={ApprovalCSS.accessorTr4}>
                                    <th className={ApprovalCSS.col4}>내용</th>
                                    <td className={ApprovalCSS.col14}>
                                        {appDetail && appDetail?.appContent}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={ApprovalCSS.appAccessTable}>
                            <tr>
                                <th className={ApprovalCSS.col77}>본인인증</th>
                                <td className={ApprovalCSS.col55}>
                                    <input name="memberId" type="text" placeholder='아이디' value={getMemberId()} readOnly={true}/*  onChange={onChangeIdentifyHandler} *//>
                                    <input name="memberPassword" type="password" placeholder='비밀번호' onChange={onChangeIdentifyHandler}/>
                                    <div className={ApprovalCSS.identifyBtn} onClick={onClickIdenticationHandler}><img src='../../image/identify-btn.png'/></div>
                                </td>
                            </tr>
                        </table>
                        <div className={ApprovalCSS.registAppLineDiv}>
                            <div className={ApprovalCSS.accessBtn} onClick={onClickApprovalAccessHandler}><img src='../../image/access-btn.png'/></div>
                            <div className={ApprovalCSS.returnBtn} onClick={onClickApprovalReturnHandler}><img src='../../image/deny-btn.png'/></div>
                        </div>
                    </div>
                </div>
            </div> 
    );
            
}

export default ApprovalAccessorPage;