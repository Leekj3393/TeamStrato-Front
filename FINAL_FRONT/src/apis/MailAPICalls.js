import { useNavigate } from "react-router-dom";
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

        if(result.status === 200){
            dispatch(postMail(result));
            alert("메일 발송 성공, 비밀번호 변경 페이지로 이동해주세요.");
        } else {
        alert("입력하신 정보의 아이디가 없습니다.."); }
    }
}
