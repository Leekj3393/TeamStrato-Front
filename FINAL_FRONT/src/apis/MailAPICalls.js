import { Navigate } from "react-router-dom";
import { postMail } from "../modules/MailModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;


export const callMailAPI = (form) => {
    console.log('callMailAPI form', form);

    const requestURL = `${PRE_URL}/auth/send`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[MaillAPICalls] callMAilAPI result : ', result);

        if(result.status === 404/* 백단 return값 수정해서 코드 200 되면 200으로 수정할게요 */){
            dispatch(postMail(result));
            alert("메일이 전송 되었습니다. 확인 후 비밀번호를 변경해주세요.");
        } else {
        alert("입력하신 정보의 아이디가 없습니다.."); }
    }
}
