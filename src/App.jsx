import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import ContactUs from './Pages/ContactUs'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
// import Checkout from './Pages/Payment/Checkout'



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='/contact' element={<ContactUs/>}></Route>
        <Route path='/denied' element={<Denied/>}></Route>
        <Route path='/course/description/' element={<CourseDescription/>}></Route>
        <Route path='/course/displaylectures' element={<DisplayLectures/>}></Route>
        
        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>} >
          <Route path='/course/create' element={<CreateCourse/>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>} >
          <Route path='/user/profile' element={<Profile/>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>} >
          <Route path='/user/editprofile' element={<EditProfile/>}></Route>
        </Route>


        {/* <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>} >
          <Route path='/checkout' element={<Checkout/>}></Route>
        </Route> */}


        <Route path='*' element={<NotFound/>}></Route>
        


      </Routes>
    </>
  )
}

export default App
