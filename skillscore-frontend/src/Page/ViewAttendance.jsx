import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ViewAttendance() {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/addstudent');
            const data = await response.json();
            if (Array.isArray(data)) {
                setStudents(data);
                fetchAttendanceData(data);
            } else {
                console.error("Expected an array but got:", data);
                setStudents([]);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents([]);
        }
    };

    const fetchAttendanceData = async (students) => {
        const savedAttendance = localStorage.getItem(`attendance-${currentMonth}`);
        if (savedAttendance) {
            setAttendance(JSON.parse(savedAttendance));
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/attendance?month=${currentMonth}`);
            const data = await response.json();
            if (data && data.attendance) {
                setAttendance(data.attendance);
            } else {
                initializeAttendance(students);
            }
        } catch (error) {
            console.error("Error fetching attendance data:", error);
            initializeAttendance(students);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [currentMonth]);

    const initializeAttendance = (students) => {
        const initialAttendance = {};
        students.forEach(student => {
            initialAttendance[student.id] = {};
        });
        setAttendance(initialAttendance);
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const calculateAbsentDays = (studentId) => {
        const studentAttendance = attendance[studentId] || {};
        const daysInMonth = getDaysInMonth(currentMonth, new Date().getFullYear());
        let absentCount = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            if (!studentAttendance[day]) {
                absentCount++;
            }
        }
        
        return absentCount;
    };

    const calculateAttendedDays = (studentId) => {
        const studentAttendance = attendance[studentId] || {};
        return Object.values(studentAttendance).filter(value => value).length;
    };

    const handleMonthChange = (event) => {
        setCurrentMonth(parseInt(event.target.value));
    };

    return (
        <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '2vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'black'
        }}>
            <h2 style={{
                fontSize: '1.5em',
                textAlign: 'center',
                color: 'white',
                marginBottom: '1.5vw'
            }}>Attendance Records - {new Date(0, currentMonth - 1).toLocaleString('default', { month: 'long' })}</h2>

            <div style={{
                marginBottom: '2vw',
                display: 'flex',
                color:'white',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <label htmlFor="month" style={{ fontSize: '1em', marginBottom: '0.5vw' }}>Select Month:</label>
                <select
                    id="month"
                    value={currentMonth}
                    onChange={handleMonthChange}
                    style={{
                        padding: '0.5vw 1vw',
                        fontSize: '1em',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <table style={{
                width: '100%',
                maxWidth: '100%',
                borderCollapse: 'collapse',
                fontSize: '1em',
                textAlign: 'center',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '1vw', fontWeight: '600', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '1vw', fontWeight: '600', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '1vw', fontWeight: '600', border: '1px solid #ddd' }}>Class</th>
                        <th style={{ padding: '1vw', fontWeight: '600', border: '1px solid #ddd' }}>Attended</th>
                        <th style={{ padding: '1vw', fontWeight: '600', border: '1px solid #ddd' }}>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} style={{ backgroundColor: student.id % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                            <td style={{ padding: '0.8vw', border: '1px solid #ddd' }}>{student.id}</td>
                            <td style={{ padding: '0.8vw', border: '1px solid #ddd' }}>{student.name}</td>
                            <td style={{ padding: '0.8vw', border: '1px solid #ddd' }}>{student.Class}</td>
                            <td style={{ padding: '0.8vw', border: '1px solid #ddd', fontWeight: '600' }}>{calculateAttendedDays(student.id)}</td>
                            <td style={{ padding: '0.8vw', border: '1px solid #ddd', fontWeight: '600' }}>{calculateAbsentDays(student.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAttendance;
