import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Cal() {
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);
  
    useEffect(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.on("select", handleDateSelect);
      }
    }, []);
  
    const handleDateSelect = (arg) => {
      const startDate = arg.start;
      const endDate = arg.end;
  
      if (startDate && endDate) {
        setSelectedDate(startDate);
      }
    };
  
    return (
      <div>
        <div className="cal">휴가 날짜: {selectedDate ? selectedDate.toLocaleDateString() : ""}</div>
        <div className="docuCal">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            height={470}
            selectable={true}
            select={handleDateSelect}
            ref={calendarRef}
          />
        </div>
      </div>
    );
  }


export default Cal;
