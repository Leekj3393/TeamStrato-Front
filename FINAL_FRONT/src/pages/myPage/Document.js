import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DocumentCSS from '../../components/main/Document.css';

function Document() {
  useEffect(() => {
    const menuItems = document.querySelectorAll(".menu-item");
    const contents = document.querySelectorAll(".content");

    const handleClick = (index) => {
      menuItems.forEach(function (menuItem) {
        menuItem.classList.remove("active");
      });
      menuItems[index].classList.add("active");

      contents.forEach(function (content) {
        content.classList.remove("active");
      });
      contents[index].classList.add("active");
    };

    menuItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        handleClick(index);
      });
    });

    // Default: Show the first menu and content
    menuItems[0].classList.add("active");
    contents[0].classList.add("active");

    // Cleanup: Remove event listeners when the component is unmounted
    return () => {
      menuItems.forEach(function (item) {
        item.removeEventListener("click", handleClick);
      });
    };
  }, []);

  //캘린더
  const calendarRef1 = useRef(null);
  const calendarRef2 = useRef(null);
  const calendarRef3 = useRef(null);
  const [selectedDates1, setSelectedDates1] = useState([]);
  const [selectedDates2, setSelectedDates2] = useState([]);
  const [selectedDates3, setSelectedDates3] = useState([]);

  useEffect(() => {
    const calendarApi1 = calendarRef1.current.getApi();
    const calendarApi2 = calendarRef2.current.getApi();
    const calendarApi3 = calendarRef3.current.getApi();

    calendarApi1.on("dateClick", handleDateClick1);
    calendarApi2.on("dateClick", handleDateClick2);
    calendarApi3.on("dateClick", handleDateClick3);

    return () => {
      calendarApi1.off("dateClick", handleDateClick1);
      calendarApi2.off("dateClick", handleDateClick2);
      calendarApi3.off("dateClick", handleDateClick3);
    };
  }, []);

  const handleDateClick1 = (info) => {
    handleDateClick(info, setSelectedDates1);
  };

  const handleDateClick2 = (info) => {
    handleDateClick(info, setSelectedDates2);
  };

  const handleDateClick3 = (info) => {
    handleDateClick(info, setSelectedDates3);
  };

  const handleDateClick = (info, setSelectedDates) => {
    const { date } = info;
    setSelectedDates((prevDates) => {
      if (prevDates.includes(date)) {
        return prevDates.filter((d) => d !== date);
      } else {
        if (prevDates.length >= 2) {
          return [date];
        } else {
          return [...prevDates, date];
        }
      }
    });
  };

  return (
    <div className={DocumentCSS}>
      <body>
        <div class="document-container">
          <div class="menu-wrapper">
            <div class="menu-item active">휴가 신청</div>
            <div class="menu-item">휴직 신청</div>
            <div class="menu-item">퇴직 신청</div>
          </div>


          <div class="content">
            <form>
            <div class="title">휴가 신청</div>
            <div class="modi0">
                    신청하기
                </div>
              
        <label htmlFor="name" style={{ marginLeft: "40px",padding: "10px", fontSize: "20px" }}>신청인 이름: 김상엽 </label><br/><br/>
    

        <label htmlFor="reason" style={{ marginLeft: "50px", fontSize: "20px" }}>신청사유:</label><br/><br/>

        <textarea id="reason" name="reason" rows="32" cols="85" required style={{ backgroundColor: "lightgray", border: "none",marginLeft: "40px" }}></textarea><br />
      
      </form>  
      <div class="cal">
      선택한 날짜 1:
        {selectedDates1.length === 1 && (
          <span>{selectedDates1[0].toLocaleDateString()}</span>
        )}
        {selectedDates1.length === 2 && (
          <span>
            {selectedDates1[0].toLocaleDateString()} -{" "}
            {selectedDates1[1].toLocaleDateString()}
          </span>
        )}
      </div>
      <div style={{ width: "400px", height: "500px", position: "relative", left: "800px", top: "-500px" }}>
  <FullCalendar
    ref={calendarRef1}
    plugins={[dayGridPlugin, interactionPlugin]}
    selectable={false}
    height="100%"
    initialView="dayGridMonth"
  />
</div>
          </div>



          <div class="content">
          <form>
            <div class="title">휴직 신청</div>
            <div class="modi0">
                    신청하기
                </div>
              
        <label htmlFor="name" style={{ marginLeft: "40px",padding: "10px", fontSize: "20px" }}>신청인 이름: 김상엽 </label><br/><br/>
    

        <label htmlFor="reason" style={{ marginLeft: "50px", fontSize: "20px" }}>신청사유:</label><br/><br/>

        <textarea id="reason" name="reason" rows="32" cols="85" required style={{ backgroundColor: "lightgray", border: "none",marginLeft: "40px" }}></textarea><br />
      
      </form> 
      <div class="cal">
             선택한 날짜 2:
        {selectedDates2.length === 1 && (
          <span>{selectedDates2[0].toLocaleDateString()}</span>
        )}
        {selectedDates2.length === 2 && (
          <span>
            {selectedDates2[0].toLocaleDateString()} -{" "}
            {selectedDates2[1].toLocaleDateString()}
          </span>
        )}
      </div>

      <div style={{ width: "400px", height: "500px", position: "relative", left: "800px", top: "-500px" }}>
      <FullCalendar
        ref={calendarRef2}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={false}
        height="500px"
        initialView="dayGridMonth"
      /></div>

      <div>
          </div>
          </div>


          <div class="content">
          <form>
            <div class="title">퇴직 신청</div>
            <div class="modi0">
                    신청하기
                </div>
              
        <label htmlFor="name" style={{ marginLeft: "40px",padding: "10px", fontSize: "20px" }}>신청인 이름: 김상엽 </label><br/><br/>
    

        <label htmlFor="reason" style={{ marginLeft: "50px", fontSize: "20px" }}>신청사유:</label><br/><br/>

        <textarea id="reason" name="reason" rows="32" cols="85" required style={{ backgroundColor: "lightgray", border: "none",marginLeft: "40px" }}></textarea><br />
        
      </form>   
             <div class="cal">

             선택한 날짜 3:
{selectedDates3.length === 1 && (
  <span>{selectedDates3[0].toLocaleDateString()}</span>
)}
{selectedDates3.length === 2 && (
  <span>
    {selectedDates3[0].toLocaleDateString()} -{" "}
    {selectedDates3[1].toLocaleDateString()}
  </span>
)}
</div>
<div style={{ width: "400px", height: "500px", position: "relative", left: "800px", top: "-500px" }}>
<FullCalendar
ref={calendarRef3}
plugins={[dayGridPlugin, interactionPlugin]}
selectable={false}
height="500px"
initialView="dayGridMonth"
/>
</div>
          </div>
        </div>


      </body>
    </div>
);
}

export default Document;
