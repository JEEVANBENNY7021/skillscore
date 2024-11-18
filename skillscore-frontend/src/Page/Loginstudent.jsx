import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Loginstudent.css';
import { loginStudentAPI } from '../../services/allAPI';
import Swal from 'sweetalert2';

function Loginstudents() {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Create an instance of the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`Field changed: ${name} = ${value}`); // Log field changes
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentId) {
      newErrors.studentId = 'Student ID is required.';
    }
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const errorDetails = Object.values(newErrors).join('\n');
      Swal.fire({
        title: 'Error!',
        text: `Please fill out the form correctly:\n\n${errorDetails}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    
    console.log('Validation errors:', newErrors); // Log validation errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // Log form data on submit
    if (validateForm()) {
      try {
        const response = await loginStudentAPI(); // Fetch all registered students
        console.log('API response:', response); // Log API response
        const registeredStudents = response.data;

        const matchingStudent = registeredStudents.find(
          (student) =>
            student.id === formData.studentId &&
            student.name === formData.fullName &&
            student.password === formData.password
        );

        if (matchingStudent) {
          setSubmitted(true);
          setErrorMessage('');
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/Homestudent'); // Redirect to Homestudent page
          });
        } else {
          setErrorMessage('Invalid credentials. Please try again.');
          console.log('No matching student found.'); // Log if no match found
          Swal.fire({
            title: 'Error!',
            text: 'Invalid credentials. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        setErrorMessage('An error occurred during login.');
        console.error('Login error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-header">STUDENT LOGIN</h2>

        {submitted && <Alert variant="success">Login successful!</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupStudentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              name="studentId"
              placeholder="Enter your Student ID"
              onChange={handleChange}
              isInvalid={!!errors.studentId}
            />
            <Form.Control.Feedback type="invalid">{errors.studentId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 custom-button">
            Login Now
          </Button>

          <div className="mt-3 text-center">
            If you don't have an account, contact the admin at <a href="mailto:admin@gmail.com">admin@gmail.com</a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Loginstudents;
