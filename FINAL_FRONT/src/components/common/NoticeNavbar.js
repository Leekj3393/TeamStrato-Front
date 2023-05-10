import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from './NoticeNavbar.css';

function NoticeNavbar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [selectedMenu, setSelectedMenu] = useState('notice, part, status');
  const handleClick = (menuName) => {
    setActiveMenu(menuName);
  };
  
  return (
    <div className={styles.Navbar2}>
      <div className="title1">
        <div className="title2">
          <b>공지사항</b>
        </div>
        <div className="navbar2-wrapper">
          <NavLink to="/notice">
            <div className={`navbar2 ${activeMenu === "notice" ? "active" : ""}`} onClick={() => handleClick("notice")}>전체</div>
          </NavLink>
          <NavLink to="/notice/part">
            <div className={`navbar2 ${activeMenu === "part" ? "active" : ""}`} onClick={() => handleClick("part")}>부서별</div>
          </NavLink>
          <NavLink to="/notice/status">
            <div className={`navbar2 ${activeMenu === "status" ? "active" : ""}`} onClick={() => handleClick("status")}>상태별</div>
          </NavLink>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default NoticeNavbar;
