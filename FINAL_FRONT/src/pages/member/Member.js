import MemberCSS from './Member.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { callMemberListAPI } from '../../apis/MemberAPICalls';
import PagingBar from '../../components/common/PagingBar';
import { useNavigate } from 'react-router-dom';


function Member() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, pageInfo } = useSelector((state) => state.memberReducer);
    const [currentPage, setCurrentPage] = useState(1);
    
    const hireDate = data && data.member ? data.member.memberHireDate.split("T")[0] : null;

    useEffect(() => {
            dispatch(callMemberListAPI({currentPage}));        
    }, [currentPage]);

    const onClickMemberHandler = (memberCode) => {
        navigate(`/member/${memberCode}`);
    }

    const onClickMemberRegistHandler = (e) => {
        navigate(`/member/regist`);
    }


    


    return (
        <>
            <div className="memberListTitle">
                직원목록
            </div>
            <div className="mbSearch">
                <select>
                    <option value="none">선택</option>
                    <option value="memberId">아이디</option>
                    <option value="memberName">이름</option>
                </select>
            </div>
            <div className="mbSearchBar">
                <input type="text" 
                />
            </div>
            <div className="mbInsert">
                <button onClick={onClickMemberRegistHandler}>직원 등록</button>
            </div>
            <div className='mbTableDiv'>
            <table className='mbTable'>
                <colgroup>
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan="2">이름</th>
                        <th colSpan="5">기본정보</th>
                        <th colSpan="2">인사정보</th>
                        <th colSpan="3">개인정보</th>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <th>사번</th>
                        <th>입사일</th>
                        <th>근속기간</th>
                        <th>근무일수</th>
                        <th>부서</th>
                        <th>직급</th>
                        <th>이메일</th>
                        <th>성별</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((member) => (
                        <tr key={member.memberCode}
                            onClick ={ () => onClickMemberHandler(member.memberCode)}
                        >
                            <td>{member.memberName}</td>
                            <td>{member.memberStatus}</td>
                            <td>{member.memberCode}</td>
                            <td>{member.memberHireDate.split("T")[0]}</td>
                            <td></td>
                            <td></td>
                            <td>{member.department.deptName}</td>
                            <td>{member.job.jobName}</td>
                            <td>{member.memberId}</td>
                            <td>{member.gender}</td>
                            <td>{member.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div>
            {pageInfo && (
                <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
            )}
            </div>
            </>
    )
}

export default Member;