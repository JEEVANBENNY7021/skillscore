import React from 'react';
import { Link } from 'react-router-dom';

function Hometeacher() {
  const buttonStyle = {
    width: '100%', // Full width of the grid cell
    height: '270px',
    fontSize: '35px',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonContainerStyle = {
    display: 'grid',
    gap: '30px',
    maxWidth: '1200px',
    margin: 'auto',
    padding: '40px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Responsive columns
  };

  return (
    <div style={buttonContainerStyle}>
      <Link to="/Addstudent">
        <button style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}>
          ADD STUDENT
        </button>
      </Link>
      <Link to="/Attendancestudents">
        <button style={{ ...buttonStyle, backgroundColor: '#2196F3' }}>
          ATTENDANCE
        </button>
      </Link>
      <Link to="/Markstudent">
        <button style={{ ...buttonStyle, backgroundColor: '#FF5722' }}>
          MARKS
        </button>
      </Link>
      <Link to="/Course">
        <button style={{ ...buttonStyle, backgroundColor: '#FFC107' }}>
          STUDY MATERIALS
        </button>
      </Link>
      <Link to="/TTTeacher">
        <button style={{ ...buttonStyle, backgroundColor: 'blue' }}>
          TIMETABLE
        </button>
      </Link>
      <Link to="/SomeOtherRoute">
        <button style={{ ...buttonStyle, backgroundColor: '#673AB7' }}>
          OTHER
        </button>
      </Link>
    </div>
  );
}

export default Hometeacher;
