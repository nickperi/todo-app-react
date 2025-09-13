import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TodosByDueDate from "./TodosByDueDate";

function Calendar ({token}) {
    const [month, setMonth] = useState(7);
    const [year, setYear] = useState(2025);
    const [numDays, setNumDays] = useState(getNumDays(month, year));
    const [prevNumDays, setPrevNumDays] = useState(getNumDays(month-1, year));
    const [startDay, setStartDay] = useState(getFirstDay(month));
    const [tasks, setTasks] = useState(new Map());
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


 useEffect(() => {
   fetch(`https://projectflaskmvc.onrender.com/todos/${year}/${month+1}`, {headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
            "Authorization": `Bearer ${token}`}}
          )
          .then(response => {
          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          //console.log(data);
          setTasks(separateTasksByDate(data));
          //separateTasksByDate(data);
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);


    function separateTasksByDate(tasks) {
        const groupedTasks = new Map();

        tasks.forEach((task) => {
            const dateDue = task.date_due;
            groupedTasks.set(
                dateDue,
                (groupedTasks.get(dateDue) || []).concat(task)
            );
        });

        //console.log(groupedTasks);
        return groupedTasks;
    }


    function loadCalendar() {
        const days = [];

        for(let day=(prevNumDays-startDay)+1; day<=prevNumDays; day++) {
            if(month < 9) 
                days.push({day:day, dateDue:`${year}-0${month}-${day}`, clicked:false});
            else if(day < 10) 
                days.push({day:day, dateDue:`${year}-${month}-0${day}`, clicked:false});
            else if(day < 10 && month < 9)
                days.push({day:day, dateDue:`${year}-0${month}-0${day}`, clicked:false});
            else 
                days.push({day:day, dateDue:`${year}-${month}-${day}`, clicked:false});
        }

        for(let day=1; day<=numDays; day++) {
            if(month < 9) 
                days.push({day:day, dateDue:`${year}-0${month+1}-${day}`, clicked:false});
            else if(day < 10) 
                days.push({day:day, dateDue:`${year}-${month+1}-0${day}`, clicked:false});
            else if(day < 10 && month < 9)
                days.push({day:day, dateDue:`${year}-0${month+1}-0${day}`, clicked:false});
            else 
                days.push({day:day, dateDue:`${year}-${month+1}-${day}`, clicked:false});
        }

        return days;
    }

    function CalendarDay({calendarDay}) {  
        
        const categoryColors = {
            work:'#0D6EFD', 
            personal:'#198754', 
            urgent:'#DC3545', 
            reminder:'#ff6600ef', 
            school: "#a3118bff",
            shopping: "#E91E63", 
            'job application': "#4837B5",
            other: "#9E9E9E"
        };

        let tasksDue = [];
        let tasksList = null;
        if(tasks.has(`${calendarDay.dateDue}`)) {
            tasksDue = tasks.get(`${calendarDay.dateDue}`);

           tasksList = tasksDue.map(task => (
            <li key={task.id}><span className="badge" style={{backgroundColor:`${categoryColors[task.category]}`}}>{task.category}</span></li>
           )
           );
        }

        function activateDateCell(dateDue) {
            const calendar = [...calendarDays];
             calendar.map(cell => {
                cell.clicked = false;
            });
            setCalendarDays(calendar);

            const resetCalendar = [...calendarDays];
            const day = resetCalendar.find(cell => cell.dateDue === dateDue);
            day.clicked = true;
            setCalendarDays(resetCalendar);
        }

        if(calendarDay.clicked) {
            return (
                <div className="date-cell-clicked" onClick={() => navigate(`/todos-due-on/${calendarDay.dateDue}`)}>
                    <span>{calendarDay.day}</span>
                    <ul>{tasksList}</ul>
                </div>
            );
        }

        else {
            return (
                <div className="date-cell" onClick={() => activateDateCell(calendarDay.dateDue)} onDoubleClick={() => navigate(`/todos-due-on/${calendarDay.dateDue}`)}>
                    <span>{calendarDay.day}</span>
                    <ul>{tasksList}</ul>
                </div>
            );
        }

        
    }

    function CalendarDays({calendarDays}) {

        return <div className="calendar-month">
            {calendarDays.map(calendarDay => {
                    return (
                        <CalendarDay key={calendarDay.dateDue} calendarDay={calendarDay} />
                    )
                }
            )
            }
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
            
            <CalendarDays calendarDays={calendarDays}/>

        </div>
    </>);
}

export default Calendar;