import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from "./Slices/CourseSlice";
// import RazorpaySliceReducer from './Slices/RazorpaySlice'
import lecturSliceReducer from './Slices/LectureSlice'


const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course:courseSliceReducer,
        // razorpay:RazorpaySliceReducer
        lecture: lecturSliceReducer
        

    },
    devTools: true
});


export default store;