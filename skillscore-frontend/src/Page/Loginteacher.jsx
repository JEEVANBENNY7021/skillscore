import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Loginstudent.css';
import { loginTeacherAPI } from '../../services/allAPI'; // API call
import Swal from 'sweetalert2';

function LoginTeacher() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.staffId) {
      newErrors.staffId = 'Staff ID is required.';
    }
    if (!formData.staffName) {
      newErrors.staffName = 'Staff Name is required.';
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

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginTeacherAPI(); // Fetch all registered teachers
        const registeredTeachers = response.data;

        const matchingTeacher = registeredTeachers.find(
          (teacher) =>
            teacher.staffId === formData.staffId &&
            teacher.staffName === formData.staffName &&
            teacher.password === formData.password
        );

        if (matchingTeacher) {
          setSubmitted(true);
          setErrorMessage('');
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/Hometeacher'); // Navigate to HomeTeacher on successful login
          });
        } else {
          setErrorMessage('Invalid credentials. Please try again.');
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
        <h2 className="form-header">TEACHERS LOGIN</h2>

        {submitted && <Alert variant="success">Login successful!</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupStaffId">
            <Form.Label>Staff ID</Form.Label>
            <Form.Control
              type="text"
              name="staffId"
              placeholder="Enter your Staff ID"
              onChange={handleChange}
              isInvalid={!!errors.staffId}
            />
            <Form.Control.Feedback type="invalid">{errors.staffId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupStaffName">
            <Form.Label>Staff Name</Form.Label>
            <Form.Control
              type="text"
              name="staffName"
              placeholder="Enter your Name"
              onChange={handleChange}
              isInvalid={!!errors.staffName}
            />
            <Form.Control.Feedback type="invalid">{errors.staffName}</Form.Control.Feedback>
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
            Login
          </Button>

          <div className="mt-3 text-center">
            If you don't have an account,{' '}
            <Link to="/Registerteacher" className="link-button">
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginTeacher;
