import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ViewMark() {
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const subjects = ['MATHS(25)', 'PHYSICS(25)', 'CHEMISTRY(25)', 'PYTHON(25)'];

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/addstudent');
            const data = await response.json();
            if (Array.isArray(data)) {
                setStudents(data);
                fetchMarksData(data);
            } else {
                console.error("Expected an array but got:", data);
                setStudents([]);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents([]);
        }
    };

    const fetchMarksData = async (students) => {
        const savedMarks = localStorage.getItem('marks');
        if (savedMarks) {
            setMarks(JSON.parse(savedMarks));
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/marks');
            const data = await response.json();
            if (data && data.marks) {
                const initializedMarks = {};
                students.forEach(student => {
                    initializedMarks[student.id] = data.marks[student.id] || {};
                    subjects.forEach(subject => {
                        if (initializedMarks[student.id][subject] === undefined) {
                            initializedMarks[student.id][subject] = 0; // Default to 0 marks
                        }
                    });
                });
                setMarks(initializedMarks);
            } else {
                initializeMarks(students);
            }
        } catch (error) {
            console.error("Error fetching marks data:", error);
            initializeMarks(students);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const initializeMarks = (students) => {
        const initialMarks = {};
        students.forEach(student => {
            initialMarks[student.id] = {};
            subjects.forEach(subject => {
                initialMarks[student.id][subject] = 0; // Default to 0 marks
            });
        });
        setMarks(initialMarks);
    };

    const calculateTotalMarks = (studentId) => {
        const studentMarks = marks[studentId] || {};
        return subjects.reduce((total, subject) => total + (studentMarks[subject] || 0), 0);
    };

    const determinePassFail = (studentId) => {
        const totalMarks = calculateTotalMarks(studentId);
        return totalMarks >= 40 ? 'Pass' : 'Fail'; // Pass/Fail logic based on total marks
    };

    return (
        <div style={{
            maxWidth: '100%', 
            margin: '20px auto', 
            padding: '20px', 
            backgroundColor: '#ffffff', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px',
            overflowX: 'auto',
            width: '95%'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '1.5em' }}>View Marks</h2>
            <table style={{
                width: '100%', 
                borderCollapse: 'collapse', 
                marginTop: '20px', 
                color: '#333',
                minWidth: '600px'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: '600', fontSize: '1em' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: '600', fontSize: '1em' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: '600', fontSize: '1em' }}>Class</th>
                        {subjects.map(subject => (
                            <th key={subject} style={{ border: '1px solid #ddd', padding: '12px', fontWeight: '600', fontSize: '1em' }}>{subject}</th>
                        ))}
                        <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: '600', fontSize: '1em' }}>Total Marks (100)</th>
                        <th style={{ border: '1px solid #ddd', padding: '12px', fontWeight: '600', fontSize: '1em' }}>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} style={{ backgroundColor: student.id % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{student.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{student.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{student.Class}</td>
                            {subjects.map(subject => (
                                <td key={subject} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {marks[student.id]?.[subject] || 0}
                                </td>
                            ))}
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: '600' }}>{calculateTotalMarks(student.id)}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: '600' }}>{determinePassFail(student.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewMark;
