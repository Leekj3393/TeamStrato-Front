import {getApplineMembers, postAppline} from "../modules/ApplineModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/approval`;


// 결재선 선택을 위한 직원목록 조회
export const callMemberListForAppAPI = () => {

    const reqeustURL = `${PRE_URL}/memberList`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('callMemberListForAppAPI result : ', result);
            dispatch(getApplineMembers(result));
        }

    }
}

// 결재선 등록
export const callAppLineInsertAPI = (form2) => {
    const requestURL = `${PRE_URL}/appline`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form2),
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callAppLineInsertAPI result : ', result);
            dispatch(postAppline(result));
        }
    }
}

