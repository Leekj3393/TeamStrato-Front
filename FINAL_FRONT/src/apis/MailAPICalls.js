import { postMail } from "../modules/MailModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/member`;


export const callMailAPI = (form) => {

    const requestURL = `${PRE_URL}/login/findpwd`;

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

        }

        dispatch(postMail(result));
        
    }
}



// // 이메일 인증번호
// const onClickFindPwdHandler = () => {
//     ajax({
//        type : "POST",
//        url : "login/findPwd",
//        data : {
//           "email" : mail.val()
//        },
//        success : function(data){
//           alert("해당 이메일로 인증번호 발송이 완료되었습니다. \n 확인부탁드립니다.")
//           console.log("data : "+ data);
//           chkEmailConfirm(data, mailconfirm, mailconfirmTxt);
//        }
//     })
//  }
 
//      // 이메일 인증번호 체크 함수
//      function chkEmailConfirm(data, mailconfirm, mailconfirmTxt){
//          mailconfirm.on("keyup", function(){
//              if (data != mailconfirm.val()) { //
//                  confirmchk = false;
//                  mailconfirmTxt.html("<span id='emconfirmchk'>인증번호가 잘못되었습니다</span>")
                 
//                  //console.log("중복아이디");
//              } else { // 아니면 중복아님
//                  emconfirmchk = true;
//                  mailconfirmTxt.html("<span id='emconfirmchk'>인증번호 확인 완료</span>")
 
//              }
//          })
//      }