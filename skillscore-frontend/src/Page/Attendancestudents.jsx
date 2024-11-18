import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Attendancestudent.css';
import Swal from 'sweetalert2'; 
function Attendance() {
    const [students, setStudents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [daysInMonth, setDaysInMonth] = useState(31);
    const [attendance, setAttendance] = useState({});

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
                const initializedAttendance = {};
                students.forEach(student => {
                    initializedAttendance[student.id] = data.attendance[student.id] || {};
                    for (let i = 1; i <= daysInMonth; i++) {
                        if (initializedAttendance[student.id][i] === undefined) {
                            initializedAttendance[student.id][i] = false; // Default to absent
                        }
                    }
                });
                setAttendance(initializedAttendance);
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
        updateDaysInMonth(currentMonth);
    }, [currentMonth]);

    const updateDaysInMonth = (month) => {
        const year = new Date().getFullYear();
        const days = new Date(year, month, 0).getDate();
        setDaysInMonth(days);
    };

    const initializeAttendance = (students) => {
        const initialAttendance = {};
        students.forEach(student => {
            initialAttendance[student.id] = {};
            for (let i = 1; i <= daysInMonth; i++) {
                initialAttendance[student.id][i] = false; // Default to absent
            }
        });
        setAttendance(initialAttendance);
    };

    const handleAttendanceChange = (studentId, day) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [day]: !prev[studentId]?.[day],
            },
        }));
    };

    const calculateAbsentDays = (studentId) => {
        const studentAttendance = attendance[studentId] || {};
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
        return Object.values(studentAttendance).filter(value => value).length; // Count attendances
    };

    const handleMonthChange = (event) => {
        setCurrentMonth(parseInt(event.target.value));
    };

    const handleSaveAttendance = async () => {
        try {
            const response = await fetch('http://localhost:3000/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month: currentMonth,
                    attendance,
                }),
            });
            if (response.ok) {
                localStorage.setItem(`attendance-${currentMonth}`, JSON.stringify(attendance));
                Swal.fire({
                    title: 'Success!',
                    text: 'Attendance aa successful!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

            } else {
                console.error('Failed to save attendance.');
            }
        } catch (error) {
            console.error('Error saving attendance:', error);
        }
    };

    return (
        <div className="attendance-container">
            <h2>Attendance Sheet - {new Date(0, currentMonth - 1).toLocaleString('default', { month: 'long' })}</h2>

            <div className="month-selector">
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={currentMonth} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Attended</th>
                        {Array.from({ length: daysInMonth }, (_, i) => (
                            <th key={i + 1}>{i + 1}</th>
                        ))}
                        <th>Total Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.Class}</td>
                            <td className="attended-cell">{calculateAttendedDays(student.id)}</td>
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <td key={i + 1}>
                                    <input
                                        type="checkbox"
                                        checked={attendance[student.id]?.[i + 1] || false}
                                        onChange={() => handleAttendanceChange(student.id, i + 1)}
                                    />
                                </td>
                            ))}
                            <td>{calculateAbsentDays(student.id)}</td> {/* Ensure this reflects the updated attendance */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="save-button" onClick={handleSaveAttendance}>
                Save Attendance
            </button>
        </div>
    );
}

export default Attendance;
