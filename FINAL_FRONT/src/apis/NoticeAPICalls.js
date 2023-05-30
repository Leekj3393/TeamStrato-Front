import { getNotices, getNotice, getNoticesDeleted, postNotice, putNotice } from "../modules/NoticeModule";

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

export const callNoticeDeletedListAPI = ({ currentPage = 1}) => {

    const requestURL = `${PRE_URL}/deleted/?page=${currentPage}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] : callNoticeDeltedListAPI result : ', result);
            dispatch(getNoticesDeleted(result));
        }
    }
}


export const callNoticeSearchContentListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/search/content/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeSearchContentListAPI result : ", result);
            dispatch(getNotices(result));
        }
    }
}


export const callNoticeSearchTitleListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/search/title/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[NoticeAPICalls] callNoticeSearchTitleListAPI result : ", result);
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