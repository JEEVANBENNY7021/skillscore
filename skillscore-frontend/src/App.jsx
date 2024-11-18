import './App.css';
import Header from './Components/Header';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Route, Routes } from 'react-router-dom'; // Import Routes and Route
import Home1 from './Page/Home1';
import Footer from './Components/Footer';
import Loginstudent from './Page/Loginstudent';
import Loginteacher from './Page/Loginteacher';
import Registerteacher from './Page/Registerteacher';
import Homestudent from './Page/Homestudent';
import Hometeacher from './Page/Hometeacher';
import Addstudent from'./Page/Addstudent';
import Attendancestudents from'./Page/Attendancestudents';
import Markstudent from'./Page/Markstudent';
import Teacherdetails from './Page/Teacherdetails';
import ViewAttendance from './Page/ViewAttendance';
import Viewmark from './Page/Viewmark';
import Course from './Page/Course';
import TTTeacher from './Page/TTTeacher';
import TTStudent from './Page/TTStudent';
import ViewCourse from './Page/ViewCourse';
function App() {
  return (
    <>
      <Header />
      <Routes>
       <Route path='/' element={<Home1 />} />
        <Route path='/Home1' element={<Home1 />} />
        <Route path='/Loginstudent' element={<Loginstudent />} />
        <Route path='/Loginteacher' element={<Loginteacher />} />
        <Route path='/Registerteacher' element={<Registerteacher/>}/>
        <Route path='/Homestudent' element={<Homestudent/>}/>
        <Route path='/Hometeacher' element={<Hometeacher/>}/>
        <Route path='/Addstudent' element={<Addstudent/>}/>
        <Route path='/Attendancestudents' element={<Attendancestudents/>}/>
        <Route path='/Markstudent'element={<Markstudent/>}/>
        <Route path='/Teacherdetails' element={<Teacherdetails />} />
        <Route path='/ViewAttendance' element={<ViewAttendance/>}/>
        <Route path='/Viewmark'element={<Viewmark/>}/>
        <Route path='/Course' element={<Course/>}/>
        <Route path='/TTTeacher' element={<TTTeacher/>}/>
        <Route path='/TTStudent' element={<TTStudent/>}/>
        <Route path='/ViewCourse' element={<ViewCourse/>}/>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
