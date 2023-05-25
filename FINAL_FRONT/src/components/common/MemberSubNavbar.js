import { useNavigate } from 'react-router-dom';
import './SubMainNav.css';
import { useCallback } from 'react';

function MemberSubNavbar() {

   const navigate = useNavigate();

   const logOutHandler = useCallback(() => {
      window.localStorage.removeItem('accessToken');
      navigate("/login");
      });

    return (
        <div className="memberSubBar">
             <img className="message" src="/image/message.png" alt="로고" />
             <div className='memberEmail'>
                Member <br/>Email
             </div>
             <img className="mycard" src="/image/명함.png" alt="로고" />
             <div className='cardMember'>
                My<br/>Card
             </div>
             <div className='logSub' onClick={logOutHandler}>
                Logout
             </div>
             <img className="heartCard" src="/image/heart.png" alt="로고" />
        </div>
    );
}

export default MemberSubNavbar;
