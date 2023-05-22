import { useNavigate, useParams } from 'react-router-dom';
import NoticeCSS from './Notice.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { callNoticeRegistAPI } from '../../apis/NoticeAPICalls';
import { calljobDeptListAPI } from '../../apis/MemberAPICalls';

function NoticeRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {memberCode} = useParams();
    const { jobDept } = useSelector(state => state.memberRoleReducer);
    const [form, setForm] = useState({member: memberCode});
    const {regist, appMember} = useSelector(state => state.approvalReducer);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const ImageInput = useRef();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    /* 부서 값 변경 이벤트 */
    const onChangeDeptHandler = (e) => {
        setForm({
            ...form,
            department : { deptCode : e.target.value}
        })     
    }

    useEffect (
        () => {
            dispatch(calljobDeptListAPI());
        }
        ,
        []
    );

    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('공지사항이 등록되었습니다. 공지게시판 페이지로 이동합니다.');
                navigate("/notice", {replace: true});
            }
        },
        [regist]
    );

    const onChangeHandler = (e) => {
        if(e.target.name === 'appStatus' || e.target.name === 'appType' && e.target.checked) {
            setForm({
                ...form,
                appStatus: '대기',
                appType: '기안문'
            });
        } else {setForm({
            ...form,
            [e.target.name]: e.target.value,
          });
        }
    };

    const onClickRegistHandler = () => {
        if(
            !form.noticeTitle || !form.noticeContent || !form.department.deptCode || !form.appStatus
        ) {
            if(!form.appTitle) {
                alert("제목을 작성해주세요.");
                return;
            } else if(!form.appContent) {
                alert("제목을 작성해주세요.");
                return;
            }  else if(!form.appType) {
                alert("기안구분이 누락되었습니다.");
                return;
            } else {
                alert("기안상태가 누락되었습니다.");
                return;
            }
        } else if(image) {

        }
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
                {/* <div className={NoticeCSS.flowInfo}>
                    <b>기안문 작성</b> &gt; 결재선 선택 &gt; 결재 요청
                </div> */}
                <div className={NoticeCSS.noticeFormDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <th>부서</th>
                                <td name='deptCode'>
                                <select  className={NoticeCSS.deptSelect} name="deptCode" onChange={onChangeDeptHandler}>
                                        <option value="selection">선택</option>
                                        {jobDept?.dept &&
                                            jobDept.dept.map((dept) => (
                                                <option 
                                                    key={dept.deptCode}
                                                    value={dept.deptCode}
                                                >
                                                    {dept.deptCode}.{dept.deptName}
                                                </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input
                                        id='textInput'
                                        name='noticeTitle'
                                        type='text'
                                        placeholder='제목을 입력해주세요.'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colSpan={3}>
                                    <textarea
                                        placeholder='내용을 입력해주세요.'
                                        name='noticeContent'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>파일첨부</th>
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
                                            이미지 업로드
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={NoticeCSS.registBtnDiv}>
                <button onClick={onClickRegistHandler}><img src='../image/regist-btn.png' alt='registNotice' /></button>
            </div>
        </div>
    );
}

export default NoticeRegist;
