import {FaClipboardList} from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { useNavigate, Navigate } from "react-router-dom";
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement, 
    Title,
    Tooltip,
    Legend
);



function TodoStats({tasks}) {
    const navigate = useNavigate();
    const numSchool = tasks.filter(task => task.category === 'school').length;
    const numPersonal = tasks.filter(task => task.category === 'personal').length;
    const numWork = tasks.filter(task => task.category === 'work').length;
    const numOther = tasks.filter(task => task.category === 'other').length;
    const numShopping = tasks.filter(task => task.category === 'shopping').length;
    const numReminder = tasks.filter(task => task.category === 'reminder').length;
    const numJobApp = tasks.filter(task => task.category === 'job application').length;
    const numUrgent = tasks.filter(task => task.category === 'urgent').length;

    console.log(numSchool, numPersonal, numWork, numOther, numShopping, numReminder, numUrgent);

    const data = {
        labels: ['Work', 'Personal', 'Urgent', 'Reminder', 'School', 'Shopping', 'Job Application', 'Other'],
        datasets: [
            {
                label: 'Number of Tasks',
                data: [numWork, numPersonal, numUrgent, numReminder, numSchool, numShopping, numJobApp, numOther],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 95, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(207, 102, 255, 0.2)',
                    'rgba(255, 64, 125, 0.2)',
                    'rgba(147, 64, 255, 0.2)',
                    'rgba(199, 199, 199, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 80, 85, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(185, 95, 255, 1)',
                    'rgba(255, 99, 150, 1)',
                    'rgba(125, 50, 255, 1)',
                    'rgba(199, 199, 199, 1)'
                ],
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.5,
                categoryPercentage: 0.5
            }
        ]
    };


    return (<>
                <button className='option' onClick={() => navigate('/')}>View To-do  <FaClipboardList /></button> &nbsp;
                <button className='option' onClick={() => navigate('/todos-calendar')}>My Calendar  <FaCalendarDay /></button>
                <Bar data={data}></Bar>
            </>);
}

export default TodoStats;