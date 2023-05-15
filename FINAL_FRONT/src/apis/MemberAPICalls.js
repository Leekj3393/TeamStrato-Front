import { getMember, getMembers, getMembersId, getMembersName } from "../modules/MemberModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/member`;

export const callMemberListAPI = ({ currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/members?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getMembers(result));
        }

    }
}

export const callMemberDetailAPI = ({memberCode}) => {

    const reqeustURL = `${PRE_URL}/members/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(res => res.json());

        if(result.status === 200) {
            dispatch(getMember(result));
        }
    }

}
