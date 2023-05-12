import { getNotices, getNotice, postNotice, putNotice } from "../modules/NoticeModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/notice`;

export const callNoticeListAPI = ({ currentPage = 1}) => {

    const requestURL = `${PRE_URL}?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] : callNoticeListAPI result : ', result);
            dispatch(getNotices(result));
        }
    }
}


export const callNoticeDepartmentListAPI = ({ deptCode, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/notice/part/${deptCode}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeDepartmentListAPI result : ", result);
            dispatch(getNotices(result));
        }
    }
}


export const callNoticeStatusListAPI = ({ noticeStatus, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/notice/status/${noticeStatus}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeStatusListAPI result : ", result);
            dispatch(getNotices(result));
        }
    }
}


export const callNoticeSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/notice/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeSearchListAPI result : ", result);
            dispatch(getNotices(result));
        }
    }
}

export const callNoticeDetailAPI = ({ noticeCode }) => {

    const requestURL = `${PRE_URL}/notice/${noticeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeDetailAPI result : ", result);
            dispatch(getNotice(result));
        }
    }
}