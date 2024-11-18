import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { registerTeacherAPI } from '../../services/allAPI';

function RegisterTeacher() {
  const [formData, setFormData] = useState({
    staffId: '',
    staffName: '',
    staffSubject: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.staffId || !/^[a-zA-Z0-9]+$/.test(formData.staffId)) {
      newErrors.staffId = 'Staff ID is required and should be alphanumeric.';
    }

    if (!formData.staffName || !/^[a-zA-Z\s]+$/.test(formData.staffName)) {
      newErrors.staffName = 'Staff Name is required and should contain only letters.';
    }

    if (!formData.staffSubject) {
      newErrors.staffSubject = 'Staff Subject is required.';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is required and should be 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await registerTeacherAPI(formData);
        console.log('Form submitted:', formData);

        Swal.fire({
          title: 'Success!',
          text: 'Registration successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setFormData({
          staffId: '',
          staffName: '',
          staffSubject: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Registration error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred during registration. Please try again.',
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

  return (
    <div className="container" style={{padding:'40px'}}>
      <div className="form-container" style={{ maxWidth: '800px', margin: 'auto', }}>
        <h2 className="form-header text-center mb-4">TEACHER REGISTRATION</h2>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupStaffId">
                <Form.Label>Staff ID</Form.Label>
                <Form.Control
                  type="text"
                  name="staffId"
                  placeholder="Enter your Staff ID"
                  value={formData.staffId}
                  onChange={handleChange}
                  isInvalid={!!errors.staffId}
                />
                <Form.Control.Feedback type="invalid">{errors.staffId}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Staff Name</Form.Label>
                <Form.Control
                  type="text"
                  name="staffName"
                  placeholder="Enter your Name"
                  value={formData.staffName}
                  onChange={handleChange}
                  isInvalid={!!errors.staffName}
                />
                <Form.Control.Feedback type="invalid">{errors.staffName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupSubject">
                <Form.Label>Staff Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="staffSubject"
                  placeholder="Enter your Subject"
                  value={formData.staffSubject}
                  onChange={handleChange}
                  isInvalid={!!errors.staffSubject}
                />
                <Form.Control.Feedback type="invalid">{errors.staffSubject}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100 custom-button">
            Register
          </Button>

          <div className="mt-3 text-center">
            Already have an account?{' '}
            <Link to="/Loginteacher" className="link-button">
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterTeacher;
