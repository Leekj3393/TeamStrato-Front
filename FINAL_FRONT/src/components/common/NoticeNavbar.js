import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './NoticeNavbar.css';

function NoticeNavbar() {

  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");
  
  const [selectedMenu, setSelectedMenu] = useState('notice, part, status');

  const imgPath = 'image/manager-page-btn.png'

  const [turnBtn, SetTurnBtn] = useState(imgPath);




  const handleClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const imgPath2 = 'image/manager-page-btn-off.png'



  const onClickToManage = () => {
      SetTurnBtn(imgPath2)
  };

  
  return (
    <div className={styles.Navbar2}>
      <div className="title1">
        <div className="title2">
          <NavLink to="/notice-manage">
            <img className="btn" src={turnBtn} onClick={onClickToManage}/>
          </NavLink>
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
