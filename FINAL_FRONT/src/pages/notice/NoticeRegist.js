import { useNavigate, useParams } from 'react-router-dom';
import NoticeCSS from './Notice.module.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { callNoticeRegistAPI } from '../../apis/NoticeAPICalls';
import { calljobDeptListAPI } from '../../apis/MemberAPICalls';
import { callApprovalMemberInfoAPI } from '../../apis/ApprovalAPICalls';


function NoticeRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {appMember} = useSelector(state => state.approvalReducer);
    const memberCode = appMember?.memberCode;
    const noticeRegistDate = useParams();
    const { jobDept } = useSelector(state => state.memberRoleReducer);
    const [form, setForm] = useState({member:{memberCode}, noticeRegistDate:Date()});
    const {regist} = useSelector(state => state.noticeReducer);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const ImageInput = useRef();
    // const department = use

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect (() => {
        dispatch(callApprovalMemberInfoAPI());
    },[]);


    const onChangeHandler = (e) => {
        if(e.target.name === 'memberCode'){
            setForm({
                ...form,
                member: appMember
            })
            console.log('form : ', form);
        } else if(e.target.name === 'noticeRegistDate'){
            setForm({
                ...form,
                noticeRegistDate: Date()
            });
            console.log('form : ', form);
        } else{
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
            console.log('form : ', form);
        }
    };

    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('공지사항이 등록되었습니다. 공지게시판 페이지로 이동합니다.');
                navigate("/notice", {replace: true});
            }
        },
        [regist]
    );


    const onClickRegistHandler = () => {
        if(
            !form?.noticeTitle || !form?.noticeContent || !form?.noticeType || !form?.member?.memberCode ||!form?.noticeRegistDate
        ) {
            if(!form?.noticeTitle) {
                alert("제목을 작성해주세요.");
                console.log('form : ', form);
                return;
            } else if(!form?.noticeContent) {
                alert("내용을 작성해주세요.");
                console.log('form : ', form);
                return;
            } else if(!form?.noticeType) {
                alert("공지사항 구분이 누락되었습니다.");
                console.log('form : ', form);
                return;
            } else if(!form?.member?.memberCode) {
                alert("작성자 정보가 누락되었습니다.");
                console.log('form : ', form);
                return;
            } {
                alert("작성일 정보가 누락되었습니다.");
                console.log('form : ', form);
                return;
            }
        } else if(image) {
            form.append("noticeImage", image);
            console.log('form : ', form);
        }
        console.log('form : ', form);
         dispatch(callNoticeRegistAPI(form));
    };

    useEffect(
        () => {
            if(image) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const {result} = e.target;
                    if(result) setImageUrl(result);
                }
                fileReader.readAsDataURL(image);
            }
        },
        [image]
    );

    /* 이미지 업로드 버튼 클릭 이벤트 */
    const onClickImgageUpload = () => {
        ImageInput.current.click();
    }

    /* 파일 첨부시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className={NoticeCSS}>
            <div className={NoticeCSS.square}></div>
            <div className={NoticeCSS.content}>
                <div className={NoticeCSS.noticeTitleCircle}></div>
                <div className={NoticeCSS.noticeTitle}>
                    공지사항 작성
                </div>
                <div className={NoticeCSS.noticeFormDiv}>
                    <table className={NoticeCSS.noticeFormTable}>
                        <tbody>
                            <tr>
                                <th className={NoticeCSS.noticeTh}>구분</th>
                                <td name='noticeType'>
                                <select  className={NoticeCSS.deptSelect} name="noticeType" onChange={onChangeHandler} for='noticeType'>
                                        <option name="selection" >선택</option>
                                        <option name="noticeType" id=''>공통</option>
                                        <option name="noticeType" id='D1'>인사</option>
                                        <option name="noticeType" id='D2'>안전/교육</option>
                                        <option name="noticeType" id='D3'>장비 관리</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th className={NoticeCSS.noticeTh}>등록일</th>
                                <td
                                        name="noticeRegistDate"
                                        onChange={onChangeHandler}
                                >
                                        {formatDate(Date())}
                                </td>
                            </tr>
                            <tr>
                                <th className={NoticeCSS.noticeTh}>작성자</th>
                                <td
                                    name="memberCode"
                                    onChange={onChangeHandler}
                                >
                                    {appMember?.memberName}
                                </td>
                            </tr>
                            <tr>
                                <th className={NoticeCSS.noticeTh}>제목</th>
                                <td>
                                    <input  className={NoticeCSS.noticeInput}
                                        id='noticeTitle'
                                        name='noticeTitle'
                                        type='text'
                                        placeholder='제목을 입력해주세요.'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={NoticeCSS.noticeTh}>내용</th>
                                <td colSpan={3}>
                                    <textarea className={NoticeCSS.noticeTextrea}
                                        placeholder='내용을 입력해주세요.'
                                        id='noticeContent'
                                        name='noticeContent'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={NoticeCSS.noticeTh}>파일첨부</th>
                                <td>
                                    <div className='AttechedRgImg'>
                                        {imageUrl &&
                                        <img 
                                            src={imageUrl} 
                                            alt="preview"
                                            className="AttecthedRgPreview"
                                            style={{width: "30px", height: "30px"}}
                                        />
                                        }   
                                        <input 
                                            style={{display : 'none'}}
                                            type="file"
                                            name="noticeImage"
                                            accept='image/jpg,image/png,image/jpeg,image/gif'
                                            ref={ImageInput}
                                            onChange={onChangeImageUpload}
                                        />
                                        <button 
                                            className='imgRgBtn'
                                            onClick={onClickImgageUpload}
                                        > 
                                            파일 업로드
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={NoticeCSS.registBtnDiv}>
                <img onClick={onClickRegistHandler} src='../image/regist-btn.png' alt='registNotice' />
            </div>
        </div>
    );
}
export default NoticeRegist;
