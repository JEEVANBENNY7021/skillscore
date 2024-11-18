import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../assets/SSlogo.png';
import './Header.css';
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { Link } from 'react-router-dom'; // Import Link for navigation

function Header() {
  return (
    <Navbar className="custom-navbar" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            src={logo}
            className="custom-logo"
          />
          <span className="custom-brand-text">
            <span className="text-black">SKILL</span>{' '}
            <span className="text-red">SCORE</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">


        <Link to='./Home1'> {/* Add Link for Home button */}
            <Button
              className="m-2"
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'red')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'black')}
            >
              Home
              <GiTeacher style={{ marginLeft: '8px', fontSize: '1.5em' }} />
            </Button>
          </Link>
          <Link to='./Loginstudent'>
            <Button
              className="m-2"
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'red')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'black')}
            >
              Student
              <PiStudentFill style={{ marginLeft: '8px', fontSize: '1.5em' }} />
            </Button>
          </Link>

          <Link to='./Loginteacher'> {/* Add Link for Teacher button */}
            <Button
              className="m-2"
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'red')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'black')}
            >
              Teacher
              <GiTeacher style={{ marginLeft: '8px', fontSize: '1.5em' }} />
            </Button>
          </Link>



          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
