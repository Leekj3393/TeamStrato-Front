import {getApplineMembers, getApprovalInfo, postAppline} from "../modules/ApplineModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/approval`;

// 결재선 선택을 위한 결재정보 조회
export const callApprovalInfoForAppAPI = ({appCode}) => {

    const reqeustURL = `${PRE_URL}/registedApp/${appCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(res => res.json());

        if(result.status === 200) {
            console.log('callApprovalInfoForAppAPI result : ', result);
            dispatch(getApprovalInfo(result));
        }

    }
}


// 결재선 선택을 위한 직원목록 조회
export const callMemberListForAppAPI = () => {

    const reqeustURL = `${PRE_URL}/memberList`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(res => res.json());

        if(result.status === 200) {
            console.log('callMemberListForAppAPI result : ', result);
            dispatch(getApplineMembers(result));
        }

    }
}

// 결재선 등록
export const callAppLine1InsertAPI = (form) => {
    const requestURL = `${PRE_URL}/appline1`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form),
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callAppLineInsertAPI result : ', result);
            dispatch(postAppline(result));
        }
    }
}
export const callAppLine2InsertAPI = (form) => {
    const requestURL = `${PRE_URL}/appline2`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form),
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callAppLineInsertAPI result : ', result);
            dispatch(postAppline(result));
        }
    }
}
export const callAppLine3InsertAPI = (form) => {
    const requestURL = `${PRE_URL}/appline3`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form),
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callAppLineInsertAPI result : ', result);
            dispatch(postAppline(result));
        }
    }
}

//

