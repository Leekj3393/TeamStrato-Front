import MemberRegisCSS from './MemberRegist.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MemberReigst () {

    const navigate = useNavigate();
    const imageInput = useRef();
    const { regist } = useSelector(state => state.memberReducer);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({});

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
        imageInput.current.click();
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

    const onClickProductRegistrationHandler = () => {
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberName", form.memberName);
        formData.append("residentNo", form.residentNo);
        formData.append("gender", form.gender);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("bankName", form.bankName);
        formData.append("bankNo", form.bankNo);
        formData.append("memberSalary", form.memberSalary);
        formData.append("memberAnnual", form.memeberAnnual);
    
        if(image) {
            formData.append("memberImage", image);
        }
    }

    return (
        <>
            <div class="memberRgTitle">
                직원 정보 수정
            </div>
            <div class="MemberBackground">
                <div className='MemberRgImg'>
                    {imageUrl &&
                    <img 
                    src={imageUrl} 
                    alt="preview"
                    className="MemberRgPreview"
                    />
                    }   
                    <input 
                        type="file"
                        name="memberImage"
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={imageInput}
                        onClick={onChangeImageUpload}
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
                                    <input name="memberName" onChange={onChangeHandler}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>주민번호</label></td>
                                <td>
                                    <input 
                                    name="residentNo"
                                    onChange={onChangeHandler} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>성별</label></td>
                                <td>
                                    <label><input type="radio" name="gender" value="M" onChange={onChangeHandler} />남자</label>
                                    <label><input type="radio" name="gender" value="W" onChange={onChangeHandler}/>여자</label>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>전화번호</label></td>
                                <td>
                                <input name="phone" onChange={onChangeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>주소</label></td>
                                <td>
                                <input name="address" onChange={onChangeHandler}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>급여계좌</label></td>
                                <td>
                                <select name="bankName" onChange={onChangeHandler}>
                                    <option>농협</option>
                                    <option>국민</option>
                                    <option>신한</option>
                                    <option>기업</option>
                                    <option>카카오</option>
                                </select>
                                <input name="bankNo" onChange={onChangeHandler}/>
                                </td>                           
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>급여</label></td>
                                <td>
                                    <input name="memberSalary" onChange={onChangeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd" ><label>잔여연차</label></td>
                                <td>
                                    <input name="memberAnnual" onChange={onChangeHandler}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="memberRgBt">
                    <button className="memberRgBt1" onClick={onClickProductRegistrationHandler}>등록</button>
                    <button className="memberRgBt2" onClick={ () => navigate(-1)}>취소</button>
                </div>
            </div>
        </>
    );
}

export default MemberReigst;