import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import EquNavbarCss from "./EquNavbarCss.css";

function Navbar2() 
{

 const onClickHander = (e) =>
 {
    console.log(e.value);
 }
  
  return (
    <div>
      <h2 className="EquTitle"> 장비 별 장비 조회</h2>
      <h2 className="EquSTitle"> 장비 목록 </h2>
      <div className="category">
        <select 
          className="Select-Box"
          onClick={ onClickHander }>
          <option value={1} >장비 코드</option>
          <option value={2} >장비 명</option>
        </select>
        <input
            className="EquInput"
            type="text"></input>
        <button className="inputBtn"><img src=""/></button>
      </div>
    </div>
  );
}

export default Navbar2;
