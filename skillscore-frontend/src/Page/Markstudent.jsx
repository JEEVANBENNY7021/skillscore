import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function MarkList() {
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const subjects = ['MATHS(25)', 'PHYSICS(25)', 'CHEMISTRY(25)', 'PYTHON(25)']; // List of subjects

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

    const handleMarksChange = (studentId, subject, value) => {
        setMarks(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [subject]: value,
            },
        }));
    };

    const calculateTotalMarks = (studentId) => {
        const studentMarks = marks[studentId] || {};
        return subjects.reduce((total, subject) => total + (studentMarks[subject] || 0), 0);
    };

    const handleSaveMarks = async () => {
        try {
            const response = await fetch('http://localhost:3000/marks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    marks,
                }),
            });
            if (response.ok) {
                localStorage.setItem('marks', JSON.stringify(marks));
                Swal.fire({
                    title: 'Success!',
                    text: 'Marks added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                console.error('Failed to save marks.');
            }
        } catch (error) {
            console.error('Error saving marks:', error);
        }
    };

    return (
        <div style={{
            maxWidth: '1200px',
            color: 'white',
            margin: '30px ',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            overflowX: 'auto' // Add horizontal scroll for small screens
        }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '20px'
            }}>Mark List</h2>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px'
            }}>
                <thead>
                    <tr>
                        <th style={{
                            border: '1px solid #ddd',
                            padding: '8px',
                            textAlign: 'left'
                        }}>ID</th>
                        <th style={{
                            border: '1px solid #ddd',
                            padding: '8px',
                            textAlign: 'left'
                        }}>Name</th>
                        <th style={{
                            border: '1px solid #ddd',
                            padding: '8px',
                            textAlign: 'left'
                        }}>Class</th>
                        {subjects.map(subject => (
                            <th key={subject} style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>{subject}</th>
                        ))}
                        <th style={{
                            border: '1px solid #ddd',
                            padding: '8px',
                            textAlign: 'center'
                        }}>Total Marks(100)</th>
                        <th style={{
                            border: '1px solid #ddd',
                            padding: '8px',
                            textAlign: 'center'
                        }}>Result</th> {/* Changed header from Average Marks to Result */}
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td style={{
                                border: '1px solid #ddd',
                                padding: '8px'
                            }}>{student.id}</td>
                            <td style={{
                                border: '1px solid #ddd',
                                padding: '8px'
                            }}>{student.name}</td>
                            <td style={{
                                border: '1px solid #ddd',
                                padding: '8px'
                            }}>{student.Class}</td>
                            {subjects.map(subject => (
                                <td key={subject} style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'center'
                                }}>
                                    <input
                                        type="text"
                                        value={marks[student.id]?.[subject] || 0}
                                        onChange={(e) => handleMarksChange(student.id, subject, Math.max(0, parseInt(e.target.value)) || 0)}
                                        min="0"
                                        max="25" // Assuming the max marks per subject is 25
                                        style={{
                                            width: '60px',
                                            textAlign: 'center',
                                            padding: '4px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }} // Style for input fields
                                        required
                                    />
                                </td>
                            ))}
                            <td style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>{calculateTotalMarks(student.id)}</td>
                            <td style={{
                                border: '1px solid #ddd',
                                padding: '8px',
                                textAlign: 'center'
                            }}>
                                {calculateTotalMarks(student.id) >= 40 ? 'Pass' : 'Fail'} {/* Pass/Fail logic */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleSaveMarks} style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                Save Marks
            </button>
        </div>
    );
}

export default MarkList;
