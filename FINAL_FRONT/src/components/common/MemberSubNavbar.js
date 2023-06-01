import { useState, useCallback, useRef, useEffect } from 'react';
import './SubMainNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { callMemberEmailAPI, callMyPageMemberAPI } from '../../apis/MyPageAPICalls';
import Swal from 'sweetalert2';

function MemberSubNavbar() {
    //알러트 창
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', () => Swal.stopTimer())
        toast.addEventListener('mouseleave', () => Swal.resumeTimer())
    }
    })
    //

    //멤버 정보
    const dispatch = useDispatch();
    const membersData = useSelector(state => state.myPageReducer.membersData); 
    useEffect(() => {
      dispatch(callMyPageMemberAPI());
    }, []);

    //
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);

    const onHoverEmail = () => setActiveItem('email');
    const onHoverCard = () => setActiveItem('card');
    const onHoverLeave = () => setActiveItem(null);

    //로그아웃
    // const logOutHandler = useCallback(() => {
    //     window.localStorage.removeItem('accessToken');
    //     navigate("/login");
    // }, [navigate]);
    //
    const logOutHandler = useCallback(() => {
        Swal.fire({
            title: '정말 로그아웃하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                window.localStorage.removeItem('accessToken');
                navigate("/login");
            }
        });
    }, [navigate]);
    



    const titleAllMemberRef = useRef(null);  // Create a new reference

    const downloadTitleAllMember = () => {
        if (titleAllMemberRef.current) {
            html2canvas(titleAllMemberRef.current, {backgroundColor: null}).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = '명함.png';
                link.click();
            });
        }
    };

    const [searchEmail, setSearchEmail] = useState('');
    const [emailResult, setEmailResult] = useState(null);

    const searchEmailHandler = async () => {
        if (!searchEmail) {
            console.error("No email entered for search");
            return;
        }
        try {
            const result = await callMemberEmailAPI(searchEmail); // Call the API
            console.log("Email search result: ", result);
            if(result) {
                setEmailResult(`Result: ${JSON.stringify(result)}`);
            } else {
                setEmailResult("No result found");
            }
        } catch (error) {
            console.error("Error while searching for email: ", error);
        }
    };
    
//

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
                
                {emailResult && <p className="MembersEmail">Result: {emailResult}</p>}

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
                                <img className="secondLogo" src="/image/카드로고.png" alt="로고" />
                            <div className='cardSkyLift'>
                                <div className='skyLift'></div>
                                <div><span class="name-ski"><b>Korea Best Ski Resort</b></span></div>
                                <div>회사 주소: 서울시 성동구<br/> 아차산로 28번길 1890호</div>
                                <div>회사 대표번호: 02-222-5678</div>
                            </div>
                            <div className='cardContent'>
                                <div className='photoFrame'></div>
                                <div><span class="name-label">Name:</span> {membersData.memberName}</div>

                                <div><span class="name-label">Title:</span> {membersData.department.deptName}{membersData.job.jobName}</div>
                                <div><span class="name-label">Email:</span> {membersData.memberId}</div>
                                <div><span class="name-label">Phone:</span> {membersData.phone}</div>
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
