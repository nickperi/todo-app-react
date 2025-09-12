import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TodosByDueDate from "./TodosByDueDate";

function Calendar ({}) {
    const [month, setMonth] = useState(7);
    const [year, setYear] = useState(2025);
    const [numDays, setNumDays] = useState(getNumDays(month, year));
    const [prevNumDays, setPrevNumDays] = useState(getNumDays(month-1, year));
    const [startDay, setStartDay] = useState(getFirstDay(month));
    const [calendarDays, setCalendarDays] = useState(loadCalendar());

    const navigate = useNavigate();

    function getNumDays(month, year) {
        const months = [
            'January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        if(month === 1 && !isLeapYear(year)) {
            return 28;
        }

        else if(month === 1 && isLeapYear(year)) {
            return 29;
        }

        else if(month === 3 || month === 5 || month === 8 || month === 10) {
            return 30;
        }

        else {
            return 31;
        }
    }

    function isLeapYear(year) {
        if(year % 4 === 0) {

            if(year % 100 === 0) {
                return year % 400 === 0;
            }
            return true;
        }
        false;
    }

    function getFirstDay(month) {
        const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const firstDayInMonth = new Date(2025, month, 1);
        return firstDayInMonth.getDay();
    }


    function loadCalendar() {
        const days = [];

        for(let day=(prevNumDays-startDay)+1; day<=prevNumDays; day++) {
            if(month < 9) 
                days.push({day:day, dateDue:`${year}-0${month}-${day}`});
            else if(day < 10) 
                days.push({day:day, dateDue:`${year}-${month}-0${day}`});
            else if(day < 10 && month < 9)
                days.push({day:day, dateDue:`${year}-0${month}-0${day}`});
            else 
                days.push({day:day, dateDue:`${year}-${month}-${day}`});
        }

        for(let day=1; day<=numDays; day++) {
            if(month < 9) 
                days.push({day:day, dateDue:`${year}-0${month+1}-${day}`});
            else if(day < 10) 
                days.push({day:day, dateDue:`${year}-${month+1}-0${day}`});
            else if(day < 10 && month < 9)
                days.push({day:day, dateDue:`${year}-0${month+1}-0${day}`});
            else 
                days.push({day:day, dateDue:`${year}-${month+1}-${day}`});
        }

        return days;
    }

    function CalendarDay({calendarDay}) {
        const [clicked, setClicked] = useState(false);

        useEffect(() => {
            setClicked(false);
        }, []);

        if(clicked) {
            return (
                <div className="date-cell-clicked" onClick={() => setClicked(true)} onDoubleClick={() => navigate(`/todos-due-on/${calendarDay.dateDue}`)}>
                        <span>{calendarDay.day}</span>&nbsp;
                        <Link to={`/todos-due-on/${calendarDay.dateDue}`}>view</Link>
                </div>
        );
        }

        else {
            return (
                <div className="date-cell" onClick={() => setClicked(true)} onDoubleClick={() => navigate(`/todos-due-on/${calendarDay.dateDue}`)}>
                        <span>{calendarDay.day}</span>&nbsp;
                        <Link to={`/todos-due-on/${calendarDay.dateDue}`}>view</Link>
                </div>
        );
        }

        
    }

    function CalendarDays({}) {

        return <div className="calendar-month">
            {calendarDays.map(calendarDay => {
                        return (
                           <CalendarDay calendarDay={calendarDay} />
                    )
                })}
            </div>
    }



    return (<>
        <div className="calendar-container">
            <div className="calendar-weekdays">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
            
            <CalendarDays/>

        </div>
    </>);
}

export default Calendar;