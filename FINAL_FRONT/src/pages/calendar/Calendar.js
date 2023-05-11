import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarCss from '../../components/calendar/Calendar.css';

function Calendar(){

    return(

    <div className={CalendarCss} id="Calendar">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        height={800}
        
      />
    </div>
  );
}

export default Calendar;