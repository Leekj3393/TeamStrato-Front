import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailAPI, callMemberUpdateAPI } from "../../apis/MemberAPICalls";
import { callMemberImageAPI } from "../../apis/MemberFileAPICalls";

function MemberModify () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ImageInput = useRef();
    const { memberImg } = useSelector(state => state.memberFileReducer);
    const { modify, memberDt } = useSelector(state => state.memberReducer);
    const { memberCode } = useParams(); 
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');
    // const { preForm, setPreForm } = useState(memberDt);
    const [ form, setForm ] = useState(memberDt);
    const serverUrl = "http://localhost:8001/images/member/"

    // const [ modifyMode, setModifyMode ] = useState(true);

    useEffect(
        () => {
            dispatch(callMemberDetailAPI({memberCode}));
            dispatch(callMemberImageAPI({memberCode}));
        },
        []
    );

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]
    );

    useEffect(
        () => {
            if(modify?.status === 200) {
                alert('직원 정보 수정이 완료 되었습니다.');
                navigate('/', { replace : true });
            }
        },
        [modify]
    )

    /* 이미지 업로드 버튼 클릭 이벤트 */
    const onClickImgageUpload = () => {
        ImageInput.current.click();
    }

    /* 파일 첨부시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    /* 입력 양식의 값이 변경 될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickMemberUpdateHandler = () => {
        
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberCode", form.memberCode);
        formData.append("memberName", form.memberName);
        formData.append("residentNo", form.residentNo);
        formData.append("gender", form.gender);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("bankName", form.bankName);
        formData.append("bankNo", form.bankNo);
        formData.append("memberSalary", form.memberSalary);
        formData.append("memberAnnual", form.memberAnnual);

        if(image) {
            formData.append("memberImage", image);
        }

        dispatch(callMemberUpdateAPI(formData));
    }
    return (
        <>
            <>
            <div class="memberRgTitle">
                직원 수정
            </div>
            <div class="MemberBackground">
                <div className='MemberRgImg'>
                    
                    <img 
                        src={ !imageUrl ? serverUrl + memberImg?.filePath : imageUrl } 
                        alt="preview"
                        className="MemberRgPreview"
                    />
                      
                    <input 
                        style={{display : 'none'}}
                        type="file"
                        name="memberImage"
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={ImageInput}
                        onChange={onChangeImageUpload}
                    />
                    <button 
                        className='memberRgBt3'
                        onClick={onClickImgageUpload}
                    > 
                        이미지 업로드
                    </button>
                </div>
                <div className="memberRgTable">
                    <table>
                        <tbody>
                            <tr>
                                <td className="memberRgTd"><label>이름</label></td>
                                <td>
                                    <input name="memberName" placeholder={ memberDt && memberDt.memberName } onChange={onChangeHandler}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>주민번호</label></td>
                                <td>
                                    <input 
                                    name="residentNo"
                                    onChange={onChangeHandler}
                                    placeholder={ memberDt && memberDt.residentNo } 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>성별</label></td>
                                <td>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="M" 
                                            onChange={onChangeHandler} 
                                            defaultChecked={ memberDt && memberDt.gender === 'M'}
                                        />
                                            남자
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="W" 
                                            onChange={onChangeHandler}
                                            defaultChecked={ memberDt && memberDt.gender === 'W'}
                                        />
                                            여자
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>전화번호</label></td>
                                <td>
                                <input name="phone" placeholder={ memberDt && memberDt.phone } onChange={onChangeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>주소</label></td>
                                <td>
                                <input name="address" placeholder={ memberDt && memberDt.address } onChange={onChangeHandler}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>급여계좌</label></td>
                                <td>
                                <select name="bankName" defaultValue={ memberDt && memberDt.bankName } onChange={onChangeHandler}>
                                    <option value="">선택</option>
                                    <option value="농협">농협</option>
                                    <option value="국민">국민</option>
                                    <option value="신한">신한</option>
                                    <option value="기업">기업</option>
                                    <option value="카카오">카카오</option>
                                </select>
                                <input name="bankNo" placeholder={ memberDt && memberDt.bankNo } onChange={onChangeHandler}/>
                                </td>                           
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>급여</label></td>
                                <td>
                                    <input name="memberSalary" placeholder={ memberDt && memberDt.memberSalary} onChange={onChangeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd" ><label>잔여연차</label></td>
                                <td>
                                    <input name="memberAnnual" placeholder={ memberDt && memberDt.memberAnnual } type="number" onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="memberRgBt">
                    <button className="memberRgBt1" onClick={onClickMemberUpdateHandler}>수정</button>
                    <button className="memberRgBt2" onClick={ () => navigate(-1)}>취소</button>
                </div>
            </div>
        </>
        </>
    );
}

export default MemberModify;