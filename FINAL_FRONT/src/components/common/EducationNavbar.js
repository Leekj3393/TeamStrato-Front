import { useState } from "react";
import { NavLink } from "react-router-dom";
import eduNavbarCSS from "./EducationNavbar.css";

function EducationNavbar() {

    const [activeMenu, setActiveMenu] = useState("");
    const [selectedMenu, setSelectedMenu] = useState('calendar');
    const handleClick = (menuName) => {
        setActiveMenu(menuName);
    };

    return(
        <div className="eduNavbar">
            <div className="eduTitle1">
                <div className="eduTitle2">
                    <b>교육</b>
                </div>
                <div className="eduNavbar-wrapper">
                    <NavLink to="/education">
                    <div className={`eduNavbar ${activeMenu === "educaionList" ? "active" : ""}`} onClick={() => handleClick("educaion")}>교육</div>
                    </NavLink>
                    <NavLink>
                    <div className={`eduNavbar ${activeMenu === "educaionPhoto" ? "active" : ""}`} onClick={() => handleClick("educaionPhoto")}>교육 사진</div>
                    </NavLink>
                    <NavLink>
                    <div className={`eduNavbar ${activeMenu === "accidentList" ? "active" : ""}`} onClick={() => handleClick("accidentList")}>사건/사고</div>
                    </NavLink>
                </div>
                <hr className="eduHr"/>
            </div>
        </div>
    );
}

export default EducationNavbar;