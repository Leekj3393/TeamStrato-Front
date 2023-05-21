import { getAppMemberInfo, postApproval, getApprovals, getApproval, putApproval, } from "../modules/ApprovalModule";


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
export const callApprovalWListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/대기?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 검토중(진행중)인 문서 목록 조회 */
export const callApprovalInProgressListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/검토중?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 승인문서 목록 조회 */
export const callApprovalAccessedListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/승인?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 반려문서 목록 조회 */
export const callApprovalReturnedListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/반려?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재자-> 대기 문서 목록 조회(메인페이지) */
export const callApprovalListAPIForAccessor = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/list/대기?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalListAPI result : ', result);
            dispatch(getApprovals(result));
        }
    }    
}

/* 결재 문서 상세 조회 */
export const callApprovalDetailAPI = ({approvalCode}) => {

    const reqeustURL = `${PRE_URL}/${approvalCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(res => res.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] : callApprovalDetailAPI result : ', result);
            dispatch(getApproval(result));
        }
    }

}

