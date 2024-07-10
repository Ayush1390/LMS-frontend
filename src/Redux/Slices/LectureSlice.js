import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    lectures:[]
}

export const getCourseLecture = createAsyncThunk('/course/lecture/get',async(cid)=>{
    try {
        const res = axiosInstance.get(`/course/${cid}`);
        toast.promise(res,{
            loading:'Fetching course lectures',
            success:'Lectures fetched successfully',
            error:'Failed to load lectures'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error.message);   
    }
})

export const addCourseLecture = createAsyncThunk('/course/lecture/add',async(data)=>{
    try {

        const formData = new FormData();
        formData.append('lecture',data.lecture);
        formData.append('title',data.title);
        formData.append('description',data.description)

        const res = axiosInstance.post(`/course/${data.id}`,formData);
        toast.promise(res,{
            loading:'Adding lecture to course',
            success:'Lecture added successfully',
            error:'Failed to add lecture'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error.message);   
    }
})

export const deleteCourseLecture = createAsyncThunk('/course/lecture/delete',async(data)=>{
    try {

        const res = axiosInstance.delete(`/course>courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(res,{
            loading:'Deleting lecture to course',
            success:'Lecture deleted successfully',
            error:'Failed to delete lecture'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error.message);   
    }
})

const letureSlice = createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLecture.fulfilled,(state,action)=>{
            console.log(action);
            state.lectures = action?.payload?.lectures
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            console.log(action);
            state.lectures = action?.payload?.course?.lectures

        })
    }
})


export default letureSlice.reducer;