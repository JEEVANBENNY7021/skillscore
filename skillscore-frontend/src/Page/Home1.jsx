import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'; // Import Card component
import Carousel from 'react-bootstrap/Carousel'; // Import Carousel component
import logo from '../assets/about1.jpg';
import image1 from '../assets/banner3.jpg'; // Replace with your actual image paths
import image2 from '../assets/banner2.jpg'; // Replace with your actual image paths
import image3 from '../assets/banner1.jpg'; // Replace with your actual image paths
import './Home1.css'; // Import the CSS file
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

function Home1() {
  return (
    <>
      {/* Carousel Section */}
<Container>
  <Carousel interval={2000} fade> {/* Auto slide every 3 seconds */}
    <Carousel.Item>
      <img
        className="d-block w-100 carousel-image" // Full width image
        src={image1} // First image
        alt="First slide"
      />
      <Carousel.Caption>
        <div className="carousel-box"> {/* Left-side box */}
          <h3>📢 Announcement</h3>
          <ul>
            <li>🎉 School Spirit Week Begins Next Monday!</li>
            <li>🗓️ Upcoming Parent-Teacher Conferences</li>
            <li>📝 Reminder: Homework and Assignments Deadline Approaching!</li>
            <li>📚 Important: Semester Exams Coming Up!</li>
          </ul>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
    
    <Carousel.Item>
      <img
        className="d-block w-100 carousel-image" // Full width image
        src={image2} // Second image
        alt="Second slide"
      />
      <Carousel.Caption>
        <div className="carousel-box">
        <h3>📢 Announcement</h3>
          <ul>
            <li>🎉 School Spirit Week Begins Next Monday!</li>
            <li>🗓️ Upcoming Parent-Teacher Conferences</li>
            <li>📝 Reminder: Homework and Assignments Deadline Approaching!</li>
            <li>📚 Important: Semester Exams Coming Up!</li>
          </ul>
        </div>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100 carousel-image" // Full width image
        src={image3} // Third image
        alt="Third slide"
      />
      <Carousel.Caption>
        <div className="carousel-box">
        <h3>📢 Announcement</h3>
          <ul>
            <li>🎉 School Spirit Week Begins Next Monday!</li>
            <li>🗓️ Upcoming Parent-Teacher Conferences</li>
            <li>📝 Reminder: Homework and Assignments Deadline Approaching!</li>
            <li>📚 Important: Semester Exams Coming Up!</li>
          </ul>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
</Container>


      {/* About Section */}
      <Container className="about-container">
        <Row className="about-row">
          <Col md={6} className="about-image-col">
            <img alt="about" src={logo} className="custom-about" />
          </Col>
          <Col md={6} className="about-text-col">
            <h1 className="about-title">About SKIL SCORE</h1>
            <p className="about-description">
              Welcome to SkillScore, your dedicated platform designed to transform the educational landscape for both students and teachers. In today’s fast-paced learning environment, effective communication and performance evaluation are essential. At SkillScore, we recognize that education is not just about grades but about cultivating skills and fostering personal growth. Our innovative Educational Performance Review (EPR) system offers a comprehensive framework that empowers students and enhances teaching strategies.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Mission Section */}
      <Container className="mission-container">
        <section className="mission">
          <h1>Our Mission</h1>
          <p>
            At SkillScore, our mission is clear: to bridge the gap between students and educators by fostering a culture of continuous improvement and mutual understanding. We believe that every student has the potential to succeed, and we are committed to providing the tools and resources necessary for both students and teachers to thrive. Our goal is to create a supportive educational ecosystem that nurtures growth, engagement, and achievement.
          </p>
        </section>
      </Container>

      {/* Key Features Section */}
      <Container className='keyfeatures'>
        <h1>Key Features</h1>
        <h3>Students</h3>
        <Row>
          {/* Column 1 */}
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Attendances View</Card.Title>
                <Card.Text>
                  Skill Score provides students with a streamlined attendance tracking feature that allows them to easily monitor their attendance records. Students can view their daily, weekly, or monthly attendance statistics, ensuring they stay informed about their participation in classes. This feature encourages accountability and helps students recognize patterns in their attendance, motivating them to maintain consistent engagement in their studies.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Column 2 */}
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Course Details & Study Materials</Card.Title>
                <Card.Text>
                  With Skill Score, students have easy access to comprehensive course details for each subject they are enrolled in. This includes course descriptions, learning objectives, prerequisites, and assessment criteria. By having this information at their fingertips, students can better understand what to expect from each course, helping them manage their study time effectively and focus on the areas that require more attention.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Column 3 */}
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>View Timetable</Card.Title>
                <Card.Text>
                  The Skill Score portal includes a user-friendly timetable management system that allows students to view their class schedules at a glance. This feature not only displays the timings and locations of classes but also allows students to keep track of any upcoming assignments, exams, or important events. By having an organized timetable, students can optimize their study routines and ensure they are well-prepared for their classes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h3>Teachers</h3>
        <Row>
          {/* Column 1 */}
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Student Detail Management</Card.Title>
                <Card.Text>
                  Teachers have the capability to add, edit, and delete student details within the Skill Score portal. This feature provides educators with a comprehensive view of their students, allowing them to maintain up-to-date records, including contact information, academic performance, and special needs. By managing student profiles efficiently, teachers can tailor their support to meet individual student needs and ensure that all relevant information is readily accessible.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Column 2 */}
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Timetable Management</Card.Title>
                <Card.Text>
                  The Skill Score portal includes a flexible timetable management system that allows teachers to add, edit, and adjust class schedules based on faculty availability. Educators can create and customize their timetables, ensuring that classes are scheduled efficiently and that all faculty members are assigned to their appropriate subjects. This feature simplifies the process of organizing class schedules, reducing conflicts and improving overall coordination among teachers and students.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Column 3 */}
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Attendance Management</Card.Title>
                <Card.Text>
                  Teachers can easily mark and manage student attendance through the Skill Score portal. This feature allows educators to quickly record attendance during each class session, providing an accurate and up-to-date attendance record for every student. Teachers can generate detailed attendance reports to track patterns and identify students who may be at risk due to frequent absences.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      <MDBFooter className='bg-light text-center text-white'>
    <MDBContainer className='p-4 pb-0'>
      <section className='mb-4'>
        <MDBBtn
          floating
          className='m-1'
          style={{ backgroundColor: '#3b5998' }}
          href='#!'
          role='button'
        >
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          style={{ backgroundColor: '#55acee' }}
          href='#!'
          role='button'
        >
          <MDBIcon fab icon='twitter' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          style={{ backgroundColor: '#dd4b39' }}
          href='#!'
          role='button'
        >
          <MDBIcon fab icon='google' />
        </MDBBtn>
        <MDBBtn
          floating
          className='m-1'
          style={{ backgroundColor: '#ac2bac' }}
          href='#!'
          role='button'
        >
          <MDBIcon fab icon='instagram' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          style={{ backgroundColor: '#0082ca' }}
          href='#!'
          role='button'
        >
          <MDBIcon fab icon='linkedin-in' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          style={{ backgroundColor: '#333333' }}
          href='#!'
          role='button'
        >
          <MDBIcon fab icon='github' />
        </MDBBtn>
      </section>
    </MDBContainer>

    <div className='text-center text-black p-3' style={{ backgroundColor: '#c3cac4' }}>
      © 2024 Copyright:
      <a className='text-black' href='https://mdbootstrap.com/'>
        SkillScore
      </a>
    </div>
  </MDBFooter>

      
    </>
  );
}

export default Home1;
