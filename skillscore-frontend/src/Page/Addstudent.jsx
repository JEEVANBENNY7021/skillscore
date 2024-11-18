import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import { addStudentAPI, editStudentAPI, deleteStudentAPI, viewStudentAPI } from '../../services/allAPI'; // Ensure these API functions are defined
import './Addstudent.css';

function AddStudent() {
    const [student, setStudent] = useState({
        id: '',
        name: '',
        email: '',
        parentsPhone: '',
        password: '',
        Class: '', 
    });

    const [studentsList, setStudentsList] = useState([]);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(null);

    // Fetch students on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await viewStudentAPI(); 
                setStudentsList(response.data); // data is an array
            } catch (error) {
                console.error('Failed to fetch students:', error);
                setStudentsList([]); // Reset on error
            }
        };

        fetchStudents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!student.id) newErrors.id = 'Student ID is required.';
        if (!student.name) newErrors.name = 'Student Name is required.';
        if (!student.email) newErrors.email = 'Email is required.';
        if (!student.parentsPhone) newErrors.parentsPhone = 'Parent\'s Phone Number is required.';
        if (!student.password) newErrors.password = 'Password is required.';
        if (!student.Class) newErrors.Class = 'Class is required.'; // Validate Class
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (isEditing) {
                    
                    await editStudentAPI(student); 
                    const updatedStudents = studentsList.map((s, index) =>
                        index === currentStudentIndex ? student : s
                    );
                    setStudentsList(updatedStudents);
                    setIsEditing(false);
                    setCurrentStudentIndex(null);
                } else {
                    // Add a new student
                    await addStudentAPI(student);
                    setStudentsList([...studentsList, student]);
                }

                Swal.fire({
                    title: 'Success!',
                    text: 'Operation successful!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                // Reset the form fields after successful operation
                setStudent({
                    id: '',
                    name: '',
                    email: '',
                    parentsPhone: '',
                    password: '',
                    Class: '', // Reset Class
                });
                setErrors({});
            } catch (error) {
                console.error('Operation error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: error.message || 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Back',
                });
            }
        } else {
            const errorDetails = Object.values(errors).join('\n');

            Swal.fire({
                title: 'Error!',
                text: `Please fill out the form correctly:\n\n${errorDetails}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleEdit = (index) => {
        setStudent(studentsList[index]);
        setIsEditing(true);
        setCurrentStudentIndex(index);
    };

    const handleDelete = async (index) => {
        const studentToDelete = studentsList[index];
        try {
            await deleteStudentAPI(studentToDelete.id); // Call to delete student API
            const updatedStudents = studentsList.filter((_, i) => i !== index);
            setStudentsList(updatedStudents);
            Swal.fire({
                title: 'Deleted!',
                text: 'Student has been deleted.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error('Deletion error:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Failed to delete student!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="add-student-form">
            <h2>{isEditing ? 'Edit Student' : 'Student Registeration '}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    placeholder="Student ID"
                    value={student.id}
                    onChange={handleChange}
                    required
                />
                {errors.id && <p className="error-message">{errors.id}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="error-message">{errors.name}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <input
                    type="text"
                    name="parentsPhone"
                    placeholder="Parent's Phone Number"
                    value={student.parentsPhone}
                    onChange={handleChange}
                    required
                />
                {errors.parentsPhone && <p className="error-message">{errors.parentsPhone}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={student.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p className="error-message">{errors.password}</p>}

                <input
                    type="text"
                    name="Class"
                    placeholder="Class"
                    value={student.Class}
                    onChange={handleChange}
                    required
                />
                {errors.Class && <p className="error-message">{errors.Class}</p>}

                <button type="submit" className='button-popup'>{isEditing ? 'Update Student' : 'Add Student'}</button>
            </form>

            <h2>Students List</h2>
            {studentsList.length > 0 ? (
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Parent's Phone Number</th>
                            <th>Password</th>
                            <th>Class</th> {/* Add Class header */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsList.map((s, index) => (
                            <tr key={index}>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.parentsPhone}</td>
                                <td>{s.password}</td>
                                <td>{s.Class}</td> {/* Display Class */}
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students added yet.</p>
            )}
        </div>
    );
}

export default AddStudent;
