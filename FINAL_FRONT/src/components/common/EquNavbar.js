import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import EquNavbarCss from "./EquNavbarCss.css";

function EquNavbar({url}) 
{
  const [form , setForm] = useState({
    searchName : 'category',
    value : ''
  });

  console.log("[equNavbar] url ", url);

 
 const onChangeHandler = (e) =>
 {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });

 };
 console.log(form); 
  return (
    <div>
      <h2 className="EquTitle"> 장비 별 장비 조회</h2>
      <h2 className="EquSTitle"> 장비 목록 </h2>
      <div className="category">
      { url === "equipment" && 
        <>
          <select 
            className="Select-Box"
            name="searchName"
            onChange={onChangeHandler}
          >
            <option value={"category"}>장비 코드</option>
            <option value={"EquipmentName"}>장비 명</option>
          </select>
          <input
             className="EquInput"
             name="value"
             type="text"
              onChange={onChangeHandler}></input>
          <button className="inputBtn"><img src=""/></button>
        </>
      }
      </div>
    </div>
  );
}

export default EquNavbar;
