import { useEffect, useState } from 'react';
import SalaryRegistCSS from './SalaryRegistCSS.css';
import { useDispatch, useSelector } from 'react-redux';

function SalaryRegist()
{
    const disptch = useDispatch();
    const [search , setSearch] = useState("");
    const {searchmEp} = useSelector((state) => state.SalaryReducer);

    const onChangeHandler = (e) =>
    {
        setSearch(e.target.value);
    }

    useEffect(
        () =>
        {
            console.log("search : {}",search);
            disptch(callEmpSearch(search));
        },
        [search]
    )

    return(
        <div className="regist-salary">
            <div className='search-emp'>
                <p className='searchType'>이름</p>
                <input 
                    className='searchValue'
                    type='text' placeholder='직원명'
                    onChange={ onChangeHandler }
                />
            </div>
        </div>
    );
}

export default SalaryRegist;