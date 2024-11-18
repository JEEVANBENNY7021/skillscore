import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { loginTeacherAPI } from '../../services/allAPI';

function Teacherdetails() {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    // Fetch teacher data when the component mounts
    const fetchData = async () => {
      try {
        const response = await loginTeacherAPI();
        setTeacherData(response.data);  // assuming response.data is an array of teacher objects
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {teacherData.map((teacher) => (
        <Card
          key={teacher.staffId}
          style={{
            width: '300px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            transition: 'transform 0.3s',
            marginBottom: '20px',
          }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{teacher.staffName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1rem' }}>{teacher.staffSubject}</Card.Subtitle>
            <Card.Text style={{ fontSize: '0.9rem' }}>Email: {teacher.email}</Card.Text>
            <Card.Text style={{ fontSize: '0.9rem' }}>Phone: {teacher.phone}</Card.Text>
            <Button variant="primary" style={{ width: '100%' }}>More Details</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Teacherdetails;
