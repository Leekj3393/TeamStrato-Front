import MemberRegisCSS from './MemberRegist.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberRegistAPI, calldeptListAPI, calljobDeptListAPI, calljobListAPI } from '../../apis/MemberAPICalls';

function MemberReigst () {

    const navigate = useNavigate();
    const imageInput = useRef();
    const { regist, jobDept } = useSelector(state => state.memberReducer);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({});

    // console.log("jobDept",jobDept);
    console.log("form", form);
    // console.log("imgae", image);

    useEffect (
        () => {
            dispatch(calljobDeptListAPI());
        }
        ,
        []
    );

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

    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('상품 등록이 완료됐습니다.');
                navigate('/member', {replace : true});
            }
        },
        [regist]
    );

    /* 부서 값 변경 이벤트 */
    const onChangeDeptHandler = (e) => {
        setForm({
            ...form,
            department : { deptCode : e.target.value}
        })     
    }

    /* 직급 값 변경 이벤트 */
    const onChangeJobHandler = (e) => {
        setForm({
            ...form,
            job : { jobCode : e.target.value}
        })     
      };

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
        formData.append("department.deptCode", form.department.deptCode);
        formData.append("job.jobCode", form.job.jobCode);
    
        if(image) {
            formData.append("file", image);
        }

        dispatch(callMemberRegistAPI(formData));
    }

    return (
        <>
            <div class="memberRgTitle">
                직원 등록
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
                        style={{display : 'none'}}
                        type="file"
                        name="file"
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={imageInput}
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
                                <td><label>아이디(이메일)</label></td>
                                <td>
                                <input 
                                    name="memberId"
                                    onChange={onChangeHandler}
                                    placeholder='이메일을 입력해주세요'
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label>비밀번호</label></td>
                                <td>
                                <input
                                    name="memberPwd"
                                    onChange={onChangeHandler}
                                />
                                </td>
                            </tr>
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
                                <td><label>부서</label></td>
                                <td>
                                    <select name="deptCode" onChange={onChangeDeptHandler}>
                                        <option value="selection" disabled>선택</option>
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
                                <td><label>직급</label></td>
                                <td>
                                <select name="jobCode" onChange={onChangeJobHandler}>
                                    <option value="selection" disabled>선택</option>
                                    {jobDept?.job &&
                                        jobDept.job.map((job) => (
                                            <option 
                                                key={job.jobCode} 
                                                value={job.jobCode}
                                                
                                             >
                                                {job.jobCode}.{job.jobName}
                                            </option>
                                    ))}
                                </select>
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