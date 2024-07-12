import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../Helpers/axiosInstance'


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || '',
    data:localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
}

export const createAccount = createAsyncThunk('/auth/signup', async(data)=>{
    try {
        const res = axiosInstance.post('user/register',data);
        toast.promise(res,{
            loading:'Wait !! Creating your account',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Oops ! Failed to create account '
        })
        return (await res).data
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk('/auth/login', async(data)=>{
    try {
        const res = axiosInstance.post('user/login',data);
        toast.promise(res,{
            loading:'Wait !! Authentication in progress',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Oops ! Failed to login'
        })
        return (await res).data
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk('/auth/logout', async()=>{
    try {
        const res = axiosInstance.get('user/logout');
        toast.promise(res,{
            loading:'Wait !! Logout in progress',
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Oops ! Failed to logout'
        })
        return (await res).data
        
    } catch (error) {
        toast.error(error.message);
    }
})

export const editProfile = createAsyncThunk('/user/editprofile',async(data)=>{
    try {
        // console.log('thunk id',id);
        const res = axiosInstance.put(`/user/update/${data[0]}`,data[1]);
        console.log('res',res);
        toast.promise(res,{
            loading:'Wait ! Updating your profile',
            success:'Profile updated sucessfully',
            error:'Failed to update profile'
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const getUserData = createAsyncThunk('/user/details',async()=>{
    try {
        const res = axiosInstance.get(`/user/profile`);
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const changePassword = createAsyncThunk('/user/changepassword',async(data)=>{
    try {
        // console.log('thunk id',id);
        const res = axiosInstance.post('/user/change-password',data);
        console.log('res',res);
        toast.promise(res,{
            loading:'Wait ! changing your password',
            success:'Password changed sucessfully',
            error:'Failed to change password'
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const forgotPassword = createAsyncThunk('/user/forgotpassword',async(data)=>{
    try {
        const res = axiosInstance.post('/user/reset',data);
        toast.promise(res,{
            loading:'Genrating token',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Something went wrong !! Try again'
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)   
    }

})

export const resetPassword = createAsyncThunk('/user/resetpassword',async(data)=>{
    try {
        const res = axiosInstance.post(`/user/reset/${data.resetToken}`,{password:data.password});
        console.log(data.resetToken);
        toast.promise(res,{
            loading:'Resetting password',
            success:'password reset successfull',
            error:(error)=>{
                return error?.response?.data?.message
            }
        })
    return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled, (state,action)=>{
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('role',action?.payload?.user?.role)
            state.isLoggedIn=true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        }) 
        .addCase(createAccount.fulfilled,(state,action)=>{
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('role',action?.payload?.user?.role)
            state.isLoggedIn=true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.data = {};
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            if(action?.payload?.user)
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('role',action?.payload?.user?.role)
            state.isLoggedIn=true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});

export const {} = authSlice.actions
export default authSlice.reducer