import { useState } from "react";
import { NavLink } from "react-router-dom";


function SalaryNavBar()
{
    const [activeMenu, setActiveMenu] = useState("myPage"); // Set initial value to "myPage"
    const [selectedMenu, setSelectedMenu] = useState('myPage,myToDoList');
    const handleClick = (menuName) => {
      setActiveMenu(menuName);
    };
  
    
    return (
      <div>
        <div className="title1">
          <div className="title2">
            <b>마이페이지</b>
          </div>
          <div className="navbar2-wrapper">
            <NavLink to="/myPage">
              <div className={`navbar2 ${activeMenu === "myPage" ? "active" : ""}`} onClick={() => handleClick("myPage")}>급여 명세서</div>
            </NavLink>
            <NavLink to="/myPage/Document">
              <div className={`navbar2 ${activeMenu === "Document" ? "active" : ""}`} onClick={() => handleClick("Document")}>급여명세서 추가</div>
            </NavLink>
          </div>
          <hr />
        </div>
      </div>
    );
}

export default SalaryNavBar;
