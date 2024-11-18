
import { commonAPI } from "./commonAPI"
import Attendance from "../src/Page/Attendancestudents";



 //teacher registeration 

 export const  registerTeacherAPI=async(reqBody)=>{
   return await commonAPI('post',`http://localhost:3000/teacherdata`,
   reqBody)
}

// teacher  loginpage
export const loginTeacherAPI = async () => {
   return await commonAPI('get', 'http://localhost:3000/teacherdata');
 };

 // Add Student
export const addStudentAPI = async (reqBody) => {
   return await commonAPI('post', 'http://localhost:3000/addstudent', reqBody);
}


// Edit Student
export const editStudentAPI = async (reqBody) => {
   return await commonAPI('put', `http://localhost:3000/addstudent/${reqBody.id}`, reqBody); // Ensure this endpoint is correct
}

// Delete Student
export const deleteStudentAPI = async (id) => {
   return await commonAPI('delete', `http://localhost:3000/addstudent/${id}`); // Ensure this endpoint is correct
}

// view student
export const viewStudentAPI = async () => {
   return await commonAPI('get', 'http://localhost:3000/addstudent');
}

// student  loginpage
export const loginStudentAPI = async () => {
   return await commonAPI('get', 'http://localhost:3000/addstudent');
 };


//attendance 
export const  addAttendanceAPI = async (reqBody) => {
   return await commonAPI('post', 'http://localhost:3000/attendance', reqBody
      );
      }
      
// mark
export const  markAPI=async(reqBody)=>{
   return await commonAPI('post','http://localhost:3000/marks',reqBody)
}

// timetable API for saving the timetable data
export const timetableAPI = async (timetableData) => {
   return await commonAPI('post', 'http://localhost:3000/timetable', timetableData);
};


// timetable viewstudent
export const timetableViewStudentAPI = async () => {
   return await commonAPI('get', 'http://localhost:3000/timetable');
};


// addvideo in localhost
export const addVideoAPI = async (reqBody) => {
   return await commonAPI('post', 'http://localhost:3000/Coursevedio', reqBody);
 };
 