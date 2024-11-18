import React, { useEffect, useState } from 'react';
import { loginTeacherAPI, timetableAPI } from '../../services/allAPI';
import Swal from 'sweetalert2'; 

function TTStudent() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = ["Period 1", "Period 2", "Break", "Period 3", "Break", "Period 4", "Period 5", "Break", "Period 6"];

  const [teacherData, setTeacherData] = useState([]);
  const [shuffledTimetable, setShuffledTimetable] = useState([]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    // Fetch teacher data when the component mounts
    const fetchData = async () => {
      try {
        const response = await loginTeacherAPI();
        const shuffledData = shuffleArray(response.data); // Shuffle teacher data
        setTeacherData(shuffledData);
        generateShuffledTimetable(shuffledData);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };
    fetchData();
  }, []);

  const generateShuffledTimetable = (teachers) => {
    const timetable = days.map(() =>
      periods.map((period) =>
        period === "Break" ? { type: "Break" } : teachers[Math.floor(Math.random() * teachers.length)]
      )
    );
    setShuffledTimetable(timetable);
  };

  const handleSaveClick = async () => {
    if (shuffledTimetable.length === 0 || !shuffledTimetable.some(row => row.some(cell => cell && cell.staffName))) {
      Swal.fire({
        title: 'Error!',
        text: 'Error! Please check the Timetable',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      await timetableAPI(shuffledTimetable); // Pass the shuffledTimetable data to the API
      Swal.fire({
        title: 'Success!',
        text: 'Timetable added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error saving timetable:', error);
      alert('Error: Failed to save the timetable.');
    }
  };

  return (
    <div style={styles.timetableContainer}>
      <h2>Weekly Timetable</h2>
     
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Day</th>
              {periods.map((period, index) => (
                <th key={index} style={styles.headerCell}>{period}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr key={dayIndex}>
                <td style={styles.dayCell}>{day}</td>
                {periods.map((period, periodIndex) => {
                  const entry = shuffledTimetable[dayIndex]?.[periodIndex];
                  if (entry?.type === "Break") {
                    return (
                      <td key={periodIndex} style={styles.breakCell}>
                        Break
                      </td>
                    );
                  } else {
                    return (
                      <td key={periodIndex} style={styles.periodCell}>
                        <strong>{entry?.staffName || "TBA"}</strong>
                        <br />
                        <span>{entry?.staffSubject || "TBA"}</span>
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  timetableContainer: {
    textAlign: 'center',
    margin: '20px auto',
    width: '90%',
    maxWidth: '1200px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  headerCell: {
    padding: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  dayCell: {
    padding: '8px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    backgroundColor: '#e9f5ff',
  },
  periodCell: {
    padding: '8px',
    color: 'white',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  breakCell: {
    padding: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#ffe6e6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Media query for smaller screens
  '@media (max-width: 768px)': {
    table: {
      fontSize: '12px',
    },
    headerCell: {
      padding: '6px',
    },
    dayCell: {
      padding: '6px',
    },
    periodCell: {
      padding: '6px',
    },
    breakCell: {
      padding: '6px',
    },
  },
};

export default TTStudent;
