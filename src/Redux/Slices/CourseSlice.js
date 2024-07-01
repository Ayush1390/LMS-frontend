import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk('/courses/get',async()=>{
    try {
        const res = axiosInstance.get('course/');
        toast.promise(res,{
            loading:'Wait !! Loading courses data..',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to get the courses'
        })

        return (await res).data.courses;
    } catch (error) {
        toast.error(error.message)
    }
})

const courseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
    }
})

export const {} = courseSlice.actions;
export default courseSlice.reducer;