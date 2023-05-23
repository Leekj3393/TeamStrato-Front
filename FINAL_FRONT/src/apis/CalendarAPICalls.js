import { useNavigate } from "react-router-dom";
import { postCalendar, postCompanycal } from "../modules/CalendarModule";
import Swal from 'sweetalert2';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callCalendarAPI = (state) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })
      

    console.log('callCalendarAPI form', state);

    const requestURL = `${PRE_URL}/calendar/personal`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(state)
        })
        .then(response => response.json());

        console.log('[CalendarAPICalls] callCalendarAPI result : ', result);

        if(result.status === 200){
            dispatch(postCalendar(result));
            Toast.fire({
                icon: 'info',
                title: '개인 일정'
              })
          
        } else {
        alert("조회에 실패했습니다."); }
    }
}

export const callCompanyCalAPI = (state) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })

    console.log('callCompanyCalAPI form', state);

    const requestURL = `${PRE_URL}/calendar/dept`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(state)
        })
        .then(response => response.json());

        console.log('[CalendarAPICalls] callCompanyCalAPI result : ', result);

        if(result.status === 200){
            dispatch(postCompanycal(result));
            Toast.fire({
                icon: 'info',
                title: '부서 일정'
              })
        } else {
        alert("조회에 실패했습니다."); }
    }
}
