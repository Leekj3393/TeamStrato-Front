import { useState, useCallback, useRef } from 'react';
import './SubMainNav.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { callMemberEmailAPI } from '../../apis/MyPageAPICalls';

function MemberSubNavbar() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);

    const onHoverEmail = () => setActiveItem('email');
    const onHoverCard = () => setActiveItem('card');
    const onHoverLeave = () => setActiveItem(null);

    const logOutHandler = useCallback(() => {
        window.localStorage.removeItem('accessToken');
        navigate("/login");
    }, [navigate]);

    const titleAllMemberRef = useRef(null);  // Create a new reference

    const downloadTitleAllMember = () => {
        if (titleAllMemberRef.current) {
            html2canvas(titleAllMemberRef.current, {backgroundColor: null}).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'my-card-all-content.png';
                link.click();
            });
        }
    };



    //
    const dispatch = useDispatch(); // Initialize useDispatch

    const searchEmailHandler = async () => {
      try {
          const resultAction = await dispatch(callMemberEmailAPI(searchEmail));
          const result = resultAction?.payload; // Get the payload from the action
          console.log("Email search result: ", result);
          if(result && result.memberName && result.memberId) {
              setEmailResult(`Name: ${result.memberName}, Email: ${result.memberId}`);
          } else {
              setEmailResult("No result found");
          }
      } catch (error) {
          console.error("Error while searching for email: ", error);
      }
  };
  
  
  



    //

    const [searchEmail, setSearchEmail] = useState("");
    const [emailResult, setEmailResult] = useState(null);

    //... other code ...


    return (
        <div className={`memberSubBar ${activeItem ? 'expanded' : ''}`} onMouseLeave={onHoverLeave}>
            <img className="message" src="/image/message.png" alt="로고" />
            <div 
                className='memberEmail' 
                onMouseEnter={onHoverEmail}
            >
                Member <br/>Email
                {activeItem === 'email' && 
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>Send Members Email</span>

                        {/* Add this block */}
                        <div>
                            <input 
                                type="text"
                                placeholder="Search email..."
                                value={searchEmail}
                                onChange={e => setSearchEmail(e.target.value)}
                            />
                            <button onClick={searchEmailHandler}>Search</button>
                        </div>
                    </div>
                    
                    {emailResult && <p className="MembersEmail">Result: @ {emailResult}</p>}

                </div>}
            </div>



            <img className="mycard" src="/image/명함.png" alt="로고" />
            <div 
                className='cardMember' 
                onMouseEnter={onHoverCard}
            >
                My<br/>Card
                {activeItem === 'card' && (
                    <div>
                        <div className='submitMember' onClick={downloadTitleAllMember}>
                        🧑‍💻 My Card Download
                        </div>
                        <div className='titleAllMember' ref={titleAllMemberRef}>
                            <img className="memberCard" src="/image/차은우 존잘.png" alt="로고" />
                            <div className='cardSkyLift'>
                                <div className='skyLift'></div>
                                <div>Korea Best Ski Resort</div>
                                <div>회사 주소: John Doe</div>
                                <div>회사 대표번호: </div>
                            </div>
                            <div className='cardContent'>
                                <div className='photoFrame'></div>
                                <div>Name: John Doe</div>
                                <div>Title: Software Engineer</div>
                                <div>Email: johndoe@example.com</div>
                                <div>Phone: johndoe@example.com</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='logSub' onClick={logOutHandler}>
                Logout
            </div>
            <img className="heartCard" src="/image/heart.png" alt="로고" />
        </div>
    );
}

export default MemberSubNavbar;
