import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormCss from "./Loginform.css";
import { callGetMemberAPI } from "../../apis/LoginAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import { callMailAPI } from "../../apis/MailAPICalls";

function FindPwdForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { member } = useSelector(state => state.memberReducer);

    const onClickFindPwdHandler = () => {
        dispatch(callMailAPI(form));
    }

    // 폼 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        code: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 로그인 버튼 클릭 이벤트 */
    const onClickHandler = () => {
        dispatch(callGetMemberAPI(form));
    }

    const onClickGoBackHandler = () => {
        navigate('/login');
    }

    return (
        <>
            
            <input
                type="text"
                name="memberId"
                className="memberId"
                placeholder="Id(e-mail)"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <input
                type="text"
                name="residentNo"
                className="residentNo"
                placeholder="주민번호(-포함하여 입력)"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <br></br>
            <button className="findIdFormBtn"
                onClick={ onClickHandler } 
            >
                인증번호 발송
            </button>

            <input
                type="text"
                name="mailconfirm"
                className="mailconfirm"
                placeholder="인증 번호를 입력하세요"
                autoComplete='off'
                onChange={ onChangeHandler }
            />

            <div>인증 성공 시 비밀번호 변경 페이지로 이동합니다.</div>

            <button className="findPwdBtn"
                onClick={ onClickFindPwdHandler } 
            >
                인증
            </button>
            <button className="goBackBtn"
                onClick={ onClickGoBackHandler } 
            >
                뒤로가기
            </button>
        </>

            );
}
export default FindPwdForm;
