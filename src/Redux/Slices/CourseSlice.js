import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk('/course/get',async()=>{
    try {
        const response = axiosInstance.get('course/');
        toast.promise(response,{
            loading:'Loading course data',
            success:'Courses loaded sucessfully',
            error:'Failed to get the courses'
        })
    return (await response).data.courses;
    } catch (error) {
        toast.error(error.message);
    }
})

export const createNewCourse = createAsyncThunk('/create',async(data)=>{
    try {

        let formData = new FormData();
        formData.append('title',data?.title)
        formData.append('description',data?.description)
        formData.append('category',data?.category)
        formData.append('createdBy',data?.createdBy)
        formData.append('thumbnail',data?.thumbnail)


        const response =  axiosInstance.post('/course',formData);
        toast.promise(response,{
            loading:'Creating course',
            success:'Course created',
            error:'Failed to create course'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action?.payload){
                console.log(action.payload);
                state.courseData = [...action.payload];
            }
        })
    }
})

export default courseSlice.reducer ;
export const {} = courseSlice.actions;