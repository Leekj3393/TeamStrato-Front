import { postAppLine, getMembersForApp } from "../modules/ApprovalModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/approval`;

export const callAppLineInsertAPI = (formData) => {
    const requestURL = `${PRE_URL}/appline`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
        headers : {
            // "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callAppLineInsertAPI result : ', result);
            dispatch(postAppLine(result));
        }
    }
}

export const callMemberListForAppAPI = () => {
    const requestURL = `${PRE_URL}/appline/organchart`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                // "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ApprovalAPICalls] :  callMemberListForAppAPI result : ', result);
            dispatch(getMembersForApp(result));
        }
    }

}
