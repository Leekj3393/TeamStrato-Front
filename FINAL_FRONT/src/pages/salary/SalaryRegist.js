import { useEffect, useRef, useState } from 'react';
import SalaryRegistCSS from './SalaryRegistCSS.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpSaveSal, callEmpSchDay, callEmpSearch } from '../../apis/SalaryAPICalls';
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
    const [form , setForm] = useState({});
    const [isClick , setIsClick] = useState(false);
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

    const onClickSave = () =>
    {
        const salaleDate = dateFormat(new Date());
        setForm({
            memberCode : sch.member.memberCode,
            salaryClassification : '월정급여',
            salary : sch.member.memberSalary,
            allowance : sch.allowance,
            incomeTax : sch.incomeTax,
            employmentInsurance : sch.employmentInsurance,
            nationalPesion : sch.nationalPesion,
            medicalInsurance : sch.medicalInsurance,
            totalAmount : sch.totalAmount,
            totalDeducted : sch.totalDeducted,
            paymentAmount : sch.paymentAmount,
            salaleDate : salaleDate
        });
        setIsClick(true);
    }

    useEffect(
        () =>
        {
            console.log(form);
            if(isClick === true)
            {   
                disptch(callEmpSaveSal(form));
                setIsClick(false);
            }
        },
        [isClick]
    )
    return(
        <div className='Ref-sal-att'>
                {isModal && <SalaryFindEmpModal 
                    setIsModal={setIsModal} />}
            <div className='sal-att-Ref'>
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
                <div className='select-day'>
                    <p className='datetext'>기간</p>
                    <input className='day-date' type='date' name='day' onChange={(e) => onChangeHandler(e) }/>
                    <button className='seclet-btn' onClick={ onClickSearch }>조회</button>
                </div>
                <hr className='vv-line'/>
                <div className='save-div'>
                    <button className='save-btn' onClick={onClickSave}>저장</button>
                </div>
            </div>
            <div className='att-sal-Info'>
            <div className='search-salary'>
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
                    <div className="pagebarSal">
                        { sch && <PagingBar pageInfo={sch.pageInfo} setCurrentPage={setCurrentPage}/> }
                    </div>
                </div>
                <div className='valueBox'>
                    <table className='att-Info'>
                        <tbody>
                            {sch &&
                            <>
                                <p>근무 내역</p>
                                <tr>
                                    <td><label>총 근무 시간</label></td>
                                    <td>{sch.totalTime}</td>
                                    <td><label>총 연장근무 시간</label></td>
                                    <td>{sch.overTime}</td>
                                </tr>
                                <tr>
                                <td><label>지각</label></td>
                                <td>{sch.late}</td>
                                <td><label>외출</label></td>
                                <td>{sch.out}</td>
                                </tr>
                                <tr>
                                    <td><label>조퇴</label></td>
                                    <td>{sch.earlyLeave}</td>
                                    <td><label>결근</label></td>
                                    <td>{sch.absence}</td>
                                </tr>
                            </>
                            }
                        </tbody>
                    </table>
                    <table className="sal-Info">
                        <tbody>
                            {sch &&
                            <>
                                <p>급여</p>
                                <tr>
                                    <td>
                                        <p>지급내역</p> 
                                    </td>
                                    <td></td>
                                    <td>
                                        <p>공제내역</p>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><label>기본급</label></td>
                                    <td>{sch.member.memberSalary}</td>
                                    <td><label>소득세</label></td>
                                    <td>{sch.incomeTax}</td>
                                </tr>
                                <tr>
                                    {sch.allowance > 0 &&
                                        <>
                                        <td><label>초과수당</label></td>
                                        <td>{sch.allowance}</td>
                                        </>
                                    }
                                    {sch.allowance <= 0  &&
                                        <>
                                            <td></td>
                                            <td></td>
                                        </>
                                    }
                                    <td><label>고용보험</label></td>
                                    <td>{sch.employmentInsurance}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><label>국민연금</label></td>
                                    <td>{sch.nationalPesion}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><label>요양보험료</label></td>
                                    <td>{sch.medicalInsurance}</td>
                                </tr>
                                <tr>
                                    <td><label>총지급액</label></td>
                                    <td>{sch.totalAmount}</td>
                                    <td><label>공제총액</label></td>
                                    <td>{sch.totalDeducted}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><label>실지급액</label></td>
                                    <td>{sch.paymentAmount}</td>
                                </tr>
                            </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
}


function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export default SalaryRegist;