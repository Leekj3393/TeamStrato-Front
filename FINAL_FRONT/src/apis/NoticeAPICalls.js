import { getNotices, /* getNoticesCount, */ getNotice, postNotice, putNotice } from "../modules/NoticeModule";

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

/* export const callNoticesCountAPI = () => {

    const requestURL = `${PRE_URL}/noticesCount`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] : callNoticesCountAPI result : ', result);
            dispatch(getNoticesCount(result));
        }
    }
} */


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

/* 공지사항 게시글 조회 */
export const callNoticeDetailAPI = ({ noticeCode }) => {

    const requestURL = `${PRE_URL}/detail/${noticeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeDetailAPI result : ", result);
            dispatch(getNotice(result));
        }
    }
}

/* 공지사항 등록 */
export const callNoticeRegistAPI = (form) => {

    const requestURL = `${PRE_URL}/regist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(form),
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] : callNoticeRegistAPI result : ', result);
            dispatch(postNotice(result));
        }
    }
}

// 공지사항 게시판에서 체크한 게시물들을 삭제
export const callNoticesDeleteAPI = () => {}