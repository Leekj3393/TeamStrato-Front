import { useEffect, useRef, useState } from 'react';
import SalaryRegistCSS from './SalaryRegistCSS.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpSchDay, callEmpSearch } from '../../apis/SalaryAPICalls';
import SalaryRegistDetail from './SalaryRegistDetail';
import SalaryFindEmpModal from './Modal/SalaryFindEmpModal';
import { useNavigate } from 'react-router-dom';

function SalaryRegist()
{
    const [day , setDay] = useState();
    const [isModal , setIsModal] = useState(false);
    const { member } = useSelector((state) => state.SalaryReducer);
    const disptch = useDispatch();

    useEffect(
        () =>
        {
            if(day != null && member)
            {
                disptch(callEmpSchDay(day,member.memberCode));
            }
        },
        [day , member]
    )

    const onClickHandler = () =>
    {
        setIsModal(true);
    }

    const onChangeHandler = (e) =>
    {
       setDay(e.target.value);
    }

    console.log("member : {}", member);
    console.log("day : {}", day);

    return(
            <div>
                {isModal && <SalaryFindEmpModal 
                    setIsModal={setIsModal} />}
            <div className='salary-info'>
                <div className='member-Info'>
                    <p className='mP-1'>사원</p>
                    <p className='mP-2'>{member?.memberCode}</p>
                    <p className='mP-3'>{member?.memberName}</p>
                    <button className='member-select' 
                        onClick={onClickHandler}>조회</button>
                </div>
                <hr className='vv-line'/>
                <div className='year-month'>
                    <p className='datetext'>기간</p>
                    <input type='date' name='day' onChange={(e) => onChangeHandler(e) }/>
                </div>
            </div>
        </div>
    );
    
}

export default SalaryRegist;