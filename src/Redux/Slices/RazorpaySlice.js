import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key:'',
    subscription_id:'',
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId',async()=>{
    try {
        const res = await axiosInstance.get('/payments/razorpay-key');
        return res.data;
    } catch (error) {
        toast.error('Failed to load data')
    }
})

export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse',async()=>{
    try {
        const res = await axiosInstance.get('/payments/subscribe');
        return res.data;
    } catch (error) {
        toast.error('Failed to load data')
    }
})

export const cancelCourseBundle = createAsyncThunk('/payments/cancel',async()=>{
    try {
        const res = axiosInstance.post('/payments/unsubscribe');
        toast.promise(res,{
            loading:'',
            success:'',
            error:''
        })
        return (await res).data;
    } catch (error) {
        toast.error('Failed to load data')
    }
})

export const verifyUserPayment = createAsyncThunk('/payments/verify',async(data)=>{
    try {
        const res = await axiosInstance.post('/payments/verify',{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return res.data;
    } catch (error) {
        toast.error('Failed to load data')
    }
})

export const getPaymentRecord = createAsyncThunk('/payments/record',async(data)=>{
    try {
        const res = axiosInstance.get('/payments?count=100');
        toast.promise(res,{
            loading:'Getting payment records',
            success:'',
            error:'Failed to get payment records'
        })
        return (await res).data;
    } catch (error) {
        toast.error('Failed to load data')
    }
})

const razorpaySlice = createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorpayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.verifyUserPayment
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.verifyUserPayment
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.allPayments
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord
        })
    }
})

export default razorpaySlice.reducer;

