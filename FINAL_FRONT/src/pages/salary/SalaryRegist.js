import { useEffect, useRef, useState } from 'react';
import SalaryRegistCSS from './SalaryRegistCSS.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpSearch } from '../../apis/SalaryAPICalls';
import SalaryRegistDetail from './SalaryRegistDetail';

function SalaryRegist()
{
    const disptch = useDispatch();
    const search = useRef();
    const [member , setMember] = useState(false);
    const {searchEmp} = useSelector((state) => state.SalaryReducer);
    const emp = searchEmp?.data;
    const regex = /[가-힣]/;

    console.log("emp : {}", emp);
    let timer;
    const searchMember = () =>
    {
        if(timer)
            clearTimeout(timer);
        timer = setTimeout(function()
        {
            disptch(callEmpSearch(search.current.value))
        },500);
    }

    useEffect(
        () =>
        {
            if(searchEmp?.status === 200)
            {
                alert("검색 완료");
                search.current.value = null;

            }            
        },
        [searchEmp]
    )

    const onClikHandler = (member) =>
    {
        setMember(member);
    }

    return(
        <div className="regist-salary">
            <div className='search-emp'>
                <p className='searchType'>이름</p>
                <input 
                    className='searchValue'
                    type='text' placeholder='직원명'
                    ref={search}
                    onChange={(e) => {
                        if(regex.test(search.current.value))
                        {
                            searchMember();
                        }
                    }}
                />
            </div>
            <table className='saMember-Info'>
                <thead>
                    <th className='saThCell'>사진</th>
                    <th className='saThCell'>사번</th>
                    <th className='saThCell'>이름</th>
                </thead>
                <tbody>
                    {emp && emp?.map((member) => (
                        <tr 
                            className='member-Info' 
                            key={member.memberCode} 
                            onClick={() => onClikHandler(member) }>
                            <td className='saTdCell'><img src={member.file?.filePath } alt='당신의 얼굴입니다'/></td>
                            <td className='saTdCell'><label>{member.memberCode}</label></td>
                            <td className='saTdCell'><label>{member.memberName}</label></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='salaryInfo'>
                { member && <SalaryRegistDetail key={member.memberCode} member={member}/>}
            </div>
        </div>
    );
}

export default SalaryRegist;