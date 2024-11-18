import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewCourse() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Coursevedio');
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px',color:"white" }}> PLUSTWO SUBJECTS VIDEOS</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {courseData.map((course, index) => (
          <div key={index} style={{
            width: '300px',
            padding: '15px',
            margin: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <h3>{course.caption}</h3>
            <p>{course.description}</p>
            {course.imgUrl && (
              <img
                src={course.imgUrl}
                alt="Course Thumbnail"
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '10px',
                }}
              />
            )}
            {course.link && (
              <button
                onClick={() => window.open(course.link, '_blank')}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '10px',
                  backgroundColor: 'white',
                  color: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Watch Video
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCourse;
