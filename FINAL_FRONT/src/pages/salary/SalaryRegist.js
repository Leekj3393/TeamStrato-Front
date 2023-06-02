import { useEffect, useRef, useState } from 'react';
import SalaryRegistCSS from './SalaryRegistCSS.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpSchDay, callEmpSearch } from '../../apis/SalaryAPICalls';
import SalaryRegistDetail from './SalaryRegistDetail';
import SalaryFindEmpModal from './Modal/SalaryFindEmpModal';
import { useNavigate } from 'react-router-dom';
import PagingBar from '../../components/common/PagingBar';

function SalaryRegist()
{
    const [day , setDay] = useState();
    const [isModal , setIsModal] = useState(false);
    const { member } = useSelector((state) => state.SalaryReducer);
    const { sch } = useSelector((state) => state.SalaryReducer);
    const [currntPage , setCurrentPage] = useState(1);
    const disptch = useDispatch();

    useEffect(
        () =>
        {
           { sch && disptch(callEmpSchDay(day,sch.member.memberCode,{currntPage})); }
        },
        [currntPage]
    );

    const onClickHandler = () =>
    {
        setIsModal(true);
    }

    const onChangeHandler = (e) =>
    {
       setDay(e.target.value);
    }

    const onClickSearch = () =>
    {
        if(day != null && member)
        {
                disptch(callEmpSchDay(day,member.memberCode,{currntPage}));
        }
        else
        {
            alert(`day : ${day ? day : '정보없음'} \nmember : ${member ? member : '정보없음'} \n 모든 정보를 입력해주세요`);
        }
    }

    console.log("sch : {} " , sch);
    console.log("member : {}", member);
    console.log("day : {}", day);

    return(
            <div>
                {isModal && <SalaryFindEmpModal 
                    setIsModal={setIsModal} />}
            <div className='salary-info'>
                <div className='member-Info'>
                    <p className='mP-1'>사원</p>
                    {
                        !member && !sch &&
                        <>
                        <p className='mP-2'></p>
                        <p className='mP-3'></p>
                        </>
                    }
                    {member && !sch &&
                        <>
                            <p className='mP-2'>{member && member?.memberCode}</p>
                            <p className='mP-3'>{member?.memberName}</p>
                        </>
                    }
                    {
                        sch &&
                        <>
                            <p className='mP-2'>{sch.member?.memberCode}</p>
                            <p className='mP-3'>{sch.member?.memberName}</p>
                        </>
                    }
                    <button className='member-select' 
                        onClick={onClickHandler}>사원 조회</button>
                </div>
                <hr className='vv-line'/>
                <div className='year-month'>
                    <p className='datetext'>기간</p>
                    <input type='date' name='day' onChange={(e) => onChangeHandler(e) }/>
                    <button className='seclet-btn' onClick={ onClickSearch }>조회</button>
                </div>
                <hr className='vv-line'/>
            </div>
            <div className='selcet-salary'>
                <table className='select-tbSalary'>
                    <thead className='salary-thead'>
                        <th className='salary-th'>날짜</th>
                        <th className='salary-th'>출근시간</th>
                        <th className='salary-th'>퇴근시간</th>
                        <th className='salary-th'>상태</th>
                    </thead>
                    <tbody className='select-tdSalary'>
                        { sch && sch.attendance.map((s) =>(
                            <tr key={s.attendanceCode}>
                                <td className='salary-td'>{s.attendanceDate}</td>
                                <td className='salary-td'>{s.startTime}</td>
                                <td className='salary-td'>{s.endTime}</td>
                                <td className='salary-td'>{s.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagebar">
                    { sch && <PagingBar pageInfo={sch.pageInfo} setCurrentPage={setCurrentPage}/> }
                </div>
            </div>
        </div>
    );
    
}

export default SalaryRegist;