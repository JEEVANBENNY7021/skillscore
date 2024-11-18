import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';

function Course() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [formData, setFormData] = useState({
    caption: '',
    description: '',
    imgUrl: '',
    link: ''
  });
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Coursevedio');
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleShowForm = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setActiveVideoUrl('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getEmbedLink = (e) => {
    const { value } = e.target;
    const videoCode = value.split('v=')[1] || value.split('/').pop();
    const embedUrl = `https://www.youtube.com/embed/${videoCode}`;
    setFormData({ ...formData, link: embedUrl });
  };

  const handleAddVideo = async () => {
    const { caption, imgUrl, link } = formData;
    if (!caption || !imgUrl || !link) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all the fields',
        icon: 'error',
        confirmButtonText: 'Back'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/Coursevedio', formData);
      setCourseData([...courseData, response.data]);
      handleClose();
      setFormData({ caption: '', description: '', imgUrl: '', link: '' });
      Swal.fire({
        title: 'Success!',
        text: 'Video added successfully',
        icon: 'success',
        confirmButtonText: 'Back'
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to upload video',
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }
  };

  const openVideoModal = (url) => {
    setActiveVideoUrl(url);
    setIsModalOpen(true);
  };

  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Coursevedio/${id}`);
      setCourseData(courseData.filter(course => course.id !== id));
      Swal.fire({
        title: 'Deleted!',
        text: 'Video removed successfully',
        icon: 'success',
        confirmButtonText: 'Back'
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete video',
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }
  };

  return (
    <div>
      {/* Upload Video Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '30px',
        margin: '40px',
        color: 'black',
        width: '320px',
        height: '100px',
        backgroundColor: 'white',
      }}>
        <h1 style={{ marginRight: '10px', fontSize: '30px' }}>Upload Video</h1>
        <FaCloudUploadAlt
          style={{ color: 'black', cursor: 'pointer', fontSize: '50px' }}
          onClick={handleShowForm}
        />
      </div>

      {/* Modal for Adding Course */}
      {isModalOpen && !activeVideoUrl && (
        <Modal show={isModalOpen} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="text"
                name="caption"
                placeholder="Video Caption"
                className="form-control mb-3"
                value={formData.caption}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Video Description"
                className="form-control mb-3"
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="text"
                name="imgUrl"
                placeholder="Image URL"
                className="form-control mb-3"
                value={formData.imgUrl}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="YouTube URL"
                className="form-control mb-3"
                onChange={getEmbedLink}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>Close</Button>
            <Button variant="danger" onClick={handleAddVideo}>Upload</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for Displaying YouTube Video */}
      {isModalOpen && activeVideoUrl && (
        <Modal show={isModalOpen} onHide={handleClose} centered>
          <Modal.Body>
            <iframe
              width="100%"
              height="400"
              src={activeVideoUrl}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Modal.Body>
        </Modal>
      )}

      {/* Course Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {courseData.map((course, index) => (
          <div key={index} style={{
            width: '300px',
            padding: '15px',
            margin: '50px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <h3>{course.caption}</h3>
            <p style={{color:"white"}}>{course.description}</p>
            {course.imgUrl && (
              <img
                src={course.imgUrl}
                alt="Course Thumbnail"
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => openVideoModal(course.link)}
              />
            )}
            {/* Delete Button */}
            <button
              style={{
                width: '100%',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={() => handleDeleteVideo(course.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
