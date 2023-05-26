import { getClassInfo, getClassList, getClassView, getClassViewList, postClass, putClass } from "../modules/ClassModule";
import { getDuty, getEdOther, getEducation, getEducationPhoto, getSafety, postEducation } from "../modules/EducationModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/education`;

export const callEducationRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/add`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(postEducation(result));
        }

    }

}

export const callEducationSafetyAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/safety?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getSafety(result));
        }

    }

}

export const callEducationDutyAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/duty?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getDuty(result));
        }

    }

}

export const callEducationOtherAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/other?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getEdOther(result));
        }

    }

}

export const callEducationDetailAPI = ({edCode}) => {

    const requestURL = `${PRE_URL}/educations/${edCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('callEducationDetailAPI reuslt : {}', result);
            dispatch(getEducation(result));
        }

    }

}

export const callClassRegistAPI = ({edCode}) => {

    const requestURL = `${PRE_URL}/classRegist?edCode=${edCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("callClassRegistAPI : {}", result);
            dispatch(postClass(result));
        }
    }
}

export const callEducationUpdateAPI = ({edCode, classTime}) => {

    const requestURL = `${PRE_URL}/classUpdate?edCode=${edCode}&playTime=${classTime}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] : callMemberUpdateAPI result : ', result);
            dispatch(putClass(result));
        }
    }
}

export const callClassViewAPI = () => {

    const requestURL = `${PRE_URL}/classViewList`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('callClassViewAPI result', result);
            dispatch(getClassViewList(result));
        }

    }

}

export const callClassInfoAPI = ({edCode}) => {

    const requestURL = `${PRE_URL}/classInfo?edCode=${edCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('callClassViewAPI result', result);
            dispatch(getClassInfo(result));
        }

    }

}

export const callClassListAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/classList?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getClassList(result));
        }

    }

}

export const callEducationPhotoListAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/photoList?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('callClassViewAPI result', result);
            dispatch(getEducationPhoto(result));
        }

    }

}

export const callEducationPhotoInsertAPI = ({fileTitle}, formData) => {

    const requestURL = `${PRE_URL}/photoList?fileTitle=${fileTitle}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('callClassViewAPI result', result);
            dispatch(getEducationPhoto(result));
        }

    }

}