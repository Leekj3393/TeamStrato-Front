import { getAppMemberInfo, postApproval, getApprovals, getApproval, putApproval, } from "../modules/ApprovalModule";
import {postLogin} from "../modules/MemberModule";



const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/approval`;

// 결재자 정보 불러오기
//로그인이 완료된 후 회원 정보를 서버에 요청하는 함수
export const callApprovalMemberInfoAPI = () => {
    const requestURL = `${PRE_URL}/memberInfo`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
            dispatch(getAppMemberInfo(result));
            console.log('result', result);
        }
    }
}

// 결재문서 등록
export const callApprovalRegistAPI = (form) => {
    const requestURL = `${PRE_URL}/regist`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form),
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callApprovalRegistAPI result : ', result);
            dispatch(postApproval(result));
        }
    }
}

/* 결재 대기문서 목록 조회 */
export const callApprovalWListAPI = ({ memberCode, currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/${memberCode}/wait?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            console.log('memberCode : ', memberCode);
            console.log('requestURL : ', requestURL);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 검토중(진행중)인 문서 목록 조회 */
export const callApprovalInProgressListAPI = ({ memberCode, currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/${memberCode}/inProgress?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 승인문서 목록 조회 */
export const callApprovalAccessedListAPI = ({ memberCode, currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/${memberCode}/accessed?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 반려문서 목록 조회 */
export const callApprovalReturnedListAPI = ({ memberCode, currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/${memberCode}/returned?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재자-> 결재요청문서 목록 조회(메인페이지) */
export const callApprovalListAPIForAccessor = ({ memberCode, currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/demandList/${memberCode}?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
            console.log('memberCode : ' , memberCode);
        }
    }    
}

/* 결재 문서 상세 조회 */
export const callApprovalDetailAPI = ({appCode}) => {
    const reqeustURL = `${PRE_URL}/${appCode}`;
    return async (dispatch, getState) => {
        const result = await fetch(reqeustURL).then(res => res.json());
        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalDetailAPI result : ', result);
            dispatch(getApproval(result));
        }
    }
}

// 결재 승인/반려 전 본인인증
export const callIdentifyAccessorAPI = (form) => {

    const requestURL = `${PRE_URL}/accessor-identify`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST', // get으로 바꾼 뒤에 토큰을 가져와야하나? 흠,,,,,,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI result : ', result);

        if(result.status === 200){
            /* 로그인 성공 시 발급 받은 accessToken을 클라이언트 측의 localStorage에 저장한다.
            이후 토큰이 필요한 요청에는 저장 된 토큰을 넣어 요청하도록 한다. */
            alert("본인 인증이 완료되었습니다.");
            window.localStorage.setItem('accessToken', result.data.accessToken);
        } else{
            alert("본인 인증을 다시 해주세요.");
        }

        dispatch(postLogin(result));
        
    }
}

// 결재 승인/반려
export const callAccessPutAPI = (formForAccessor) => {
    const requestURL = `${PRE_URL}/approval-accessor`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: formForAccessor
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callAccessPutAPI result : ', result);
            dispatch(putApproval(result));
        }
    }
}