import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/ReactToastify.min.css'
// import Car from './components/Car'
// import Bike from './components/bike'
// import Football from './components/Football'
// import IfCondition from './components/IfCondition'
// import GroceryList from './components/GroceryList'
// import Myform from './components/Myform';
// import From1 from './components/From1';
// import Froom2 from './components/Froom2';
// import SubmitingForm from './components/SubmitingForm';
// import Multiplevaluesf from './components/Multiplevaluesf';
// import UseState from './components/UseState';
// import ChangeUseStateO from './components/ChangeUseStateO';

import Login from './component1/Login';
import Home from './component1/Home';
import Students from './component1/Students';
import CourseList from './component1/CourseList';
import CourseByStudents from './component1/CourseByStudents';
import CourseByStudentDetails from './component1/CourseByStudentDetails';
import StudentByCourse from './component1/StudentByCourse';
import StudentByCourseDetails from './component1/StudentByCourseDetails';
import CreateStudentAccount from './component1/CreateStudentAccount';
import LogOut from './component1/LogOut';
// import { Link } from 'react-router-dom';
// import ProductList from './component2/ProductList';
// import SearchingProduct from './component2/SearchingProduct';
import UploadImage from './component1/UploadImage';
import ShowImage from './component1/ShowImage';
import Excelsheet from './component1/Excelsheet';
import QuestionDetail from './component1/QuestionDetail';
import Subject from './component1/Subject';
import Topics from './component1/Topic';
import SelectSubject from './component1/Selectsubject';
import Topicsbysubjectid from './component1/Topicsbysubjectid';
import Questionsbytopicid from './component1/Questionsbytopicid';
// import MultiLevelSelect from './component1/MultiLevelSelect';
// import GetAllStudent from './component1/GetAllStudent';
// import GetAllStudent from './component1/GetAllStudent';






// import Ab from './components/Ab'
// import Asd from './components/Asd'

function App() {
  // const [count, setCount] = useState(1)
  // const cars = ["a","b"];
  // console.log("sdfgh")
  // const veg = [
  //   {id: 1, name: 'bread'},
  //   {id: 2, name: 'milk'},
  //   {id: 3, name: 'eggs'}
  // ];
  return (
    < >
    
    {/* <h2>dfghj</h2> */}
      {/* <Car brand= "sdfg" color= "green" /> <br/>
       <Bike brand= "njknkm" color = "pink" />
      <Car brand= "sdfg" color= "green" /><br/>
       <Bike brand= "njknkm" color = "pink" />
       <Football /><br /> */}
       {/* <IfCondition isGoal = {true} /> <br /> */}
     {/* <Asd cars={cars}/> */}

     {/* <GroceryList items={veg} />  */}
     {/* <Myform /> */}
     {/* <From1 /> */}
     {/* <Froom2 /> */}

     {/* <SubmitingForm /> */}

     {/* <Multiplevaluesf /> */}

     {/* <UseState /> */}
     {/* <ChangeUseStateO /> */}

      


     {/* <SignUp /> */}

     {/* <ProductList />
     <SearchingProduct /> */}
     <Router>
     {/* <Home /> */}
            <Routes>

           

                {/* Route for the login page */}
                <Route path="/" element={<Login />} />

                {/* Route for the home page ("/") */}
                <Route path="/Home" element={<Home />} />

                <Route path = "/createnewaccount" element={<CreateStudentAccount />} />

                {/* Route for Student Details */}
                <Route path="/studentdetails" element={<Students />} />  

                {/* Route for Course Details */}
                <Route path="/coursedetails" element={<CourseList />} />

                  {/* Route for Course By Students (List of courses with a button to view students) */}
                    <Route path="/coursebystudents" element={<CourseByStudents />} />

                {/* Correct route to show students enrolled in a specific course */}
                <Route path="/StudentsByCourse/:id" element={<CourseByStudentDetails />} />

                   {/* Route for the new StudentByCourse component */}
               <Route path="/studentsbycourse" element={<StudentByCourse />} />

               {/* Route for viewing courses by student */}
              <Route path="/CourseByStudent/:id" element={<StudentByCourseDetails />} />

               {/* Route for viewing courses by student */}

              {/* <Route path="/GetAllStudent" element={<GetAllStudent />} /> */}
              <Route path="/UploadImage" element={<UploadImage />} />

              <Route path="/ShowImage" element={<ShowImage  />} />


              {/* <Route path="/uploadexcel" element={<Excelsheet />} /> */}
          {/* <Route path="/quizstart" element={<question />} /> */}
          <Route path="/id" element={<QuestionDetail />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/selectsubject" element={<SelectSubject />} />
          <Route path="/topics/:subjectId" element={<Topicsbysubjectid />} />
          <Route path="/questions/:topicId" element={<Questionsbytopicid />} />
          {/* <Route path="/MultiLevelSelect" element={<MultiLevelSelect />} /> */}

              
               
                  {/* Route for logout */}
                  <Route path="/logout" element={<LogOut />} />

            </Routes>
        </Router>
    </>
  )
}

export default App
