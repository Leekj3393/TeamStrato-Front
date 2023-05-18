import { useDispatch, useSelector } from "react-redux";
import { callMemberRoleAPI } from "../../apis/MemberRoleAPICalls";
import { useEffect, useState } from "react";
import { callMemberDetailAPI, callMemberRoleUpdateAPI } from "../../apis/MemberAPICalls";
import MemberRoleCSS from "./MemberRole.module.css";
import { useNavigate } from "react-router-dom";

function MemberRole({setRoleModalOpen, memberCode}) {

    const { memberRole } = useSelector(state => state.memberRoleReducer);
    const { memberDt, roleModify } = useSelector(state => state.memberReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    console.log("memberRole : {}", memberRole);
    console.log("form : {}", form);

    useEffect (
        () => {
            dispatch(callMemberDetailAPI({memberCode}));
            dispatch(callMemberRoleAPI());
        }
        ,
        []
    );

    useEffect(
        () => {
            if(roleModify?.status === 200) {
                alert('직원 권한 수정이 완료 되었습니다.');
                navigate('/', { replace : true });
            }
        },
        [roleModify]
    )

    const closeRoleModal = () => {
        setRoleModalOpen(false);
    };

    /* 권한 변경 이벤트 */
    const onChangeRoleHandler = (e) => {
        setForm({
            ...form,
            memberRole : { roleCode : e.target.value }
        })     
      };

      const onClickMemberUpdateHandler = () => {
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberCode", memberCode);
        formData.append("memberRole.roleCode", form.memberRole.roleCode);
      
        dispatch(callMemberRoleUpdateAPI(formData));
      };

    return (
        <div className={MemberRoleCSS.roleModal}>
            <div className={MemberRoleCSS.roleModalContainer}>
                <div className={MemberRoleCSS.roleModalDiv}>
                    <span>권한 수정</span>
                    <div className={MemberRoleCSS.preRoleDiv}>
                    <label>현재 권한</label>
                    <input type="text" name="prvRoleCode" value={memberDt && memberDt.memberRole?.roleDes} readOnly={true}/>
                    </div>
                    <div>
                    <label>변경 권한</label>
                    <select name="roleCode" onChange={onChangeRoleHandler}>
                        <option value="selection">선택</option>
                            {memberRole &&
                                memberRole.map((role) => (
                                    <option 
                                        key={role.roleCode} 
                                        value={role.roleCode}             
                                    >
                                        {role.roleCode}.{role.roleDes}
                                    </option>
                            ))}
                    </select>
                    </div>
                    <div>
                        <button onClick={onClickMemberUpdateHandler}>수정</button>
                        <button onClick={closeRoleModal}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberRole;