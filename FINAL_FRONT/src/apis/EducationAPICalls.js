import { getDuty, getEdOther, getEducation, getSafety, postEducation } from "../modules/EducationModule";

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

    const reqeustURL = `${PRE_URL}/safety?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getSafety(result));
        }

    }

}

export const callEducationDutyAPI = ({currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/duty?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getDuty(result));
        }

    }

}

export const callEducationOtherAPI = ({currentPage = 1}) => {

    const reqeustURL = `${PRE_URL}/other?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getEdOther(result));
        }

    }

}

export const callEducationDetailAPI = ({edCode}) => {

    const reqeustURL = `${PRE_URL}/educations/${edCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(reqeustURL).then(response => response.json());

        if(result.status === 200) {
            console.log('result', result);
            dispatch(getEducation(result));
        }

    }

}