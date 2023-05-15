import { getMembers } from "../modules/MemberModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/member`;

export const callMemberListAPI = ({ currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/memberList?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getMembers(result));
        }

    }
}

export const callMemberIdSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/memberList/searchMbId?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[MemberAPICalls] callMemberIdSearchListAPI result : ", result);
            
        }
    }
}

export const callMemberNameSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/memberList/searchMbName?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[MemberAPICalls] callMemberNameSearchListAPI result : ", result);
            
        }
    }
}