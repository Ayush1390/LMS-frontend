// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice.js";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import HomeLayout from "../../Layouts/HomeLayout.jsx";
// import {BiRupee} from 'react-icons/bi'

// function Checkout(){

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const razorpayKey = useSelector((state)=>state?.razorpay?.key)
//     const subscription_id = useSelector((state)=>state?.razorpay?.subscription_id)
//     const isPaymentVerified = useSelector((state)=>state?.razorpay?.isPaymentVerified)
//     const userData = useSelector((state)=>state?.auth?.data)

//     const paymentDetails = {
//         razorpay_payment_id:'',
//         razorpay_subscription_id:'',
//         razorpay_signature:''
//     }

//     async function handleSubscription(e){
//         e.preventDefault();

//         if(!razorpayKey || !subscription_id){
//             toast.error('Something went wrong');
//             return;
//         }

//         const options = {
//             key:razorpayKey,
//             subscription_id:subscription_id,
//             name:'coursify pvt ltd',
//             description:'Subscription',
//             theme:{
//                 color:'#F37254'
//             },
//             prefill:{
//                 email:userData.email,
//                 name:userData.fullName
//             },
//             handler:async function(response){
//                 paymentDetails.razorpay_payment_id=response.razorpay_payment_id
//                 paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id
//                 paymentDetails.razorpay_signature=response.razorpay_signature

//                 toast.success('payment sucessfull');

//                 await dispatch(verifyUserPayment(paymentDetails));
                
//                 isPaymentVerified? navigate('/checkout/success'):navigate('/checkout/fail')
//             }
//         }

//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     }

//     async function load(){
//         await dispatch(purchaseCourseBundle());
//         await dispatch(getRazorpayId());
        
//     }

//     useEffect(()=>{
//         load();
//     },[])

//     return(
//         <HomeLayout>
//             <form onSubmit={handleSubscription} className="min-h-[90vh] flex items-center justify-center text-white">
//                 <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
//                     <h1 className="bg-yellow-500 absolute top-0 text-center text-2xl w-full py-4 font-bold rounded-tl-lg rounded-tr-lg">
//                         Subscription bundle
//                     </h1>
//                     <div className="px-4 space-y-5 text-center">
//                         <p className="text-[17px] ">
//                             This paurchase will allow youto access all available courses of our platform for {" "}
//                             <span className="text-yellow-500 font-bold">
//                                 {/* <br /> */}
//                                 1 year duration &nbsp;
//                             </span>
//                             All the existing and new courses will also be available
//                         </p>
//                         <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
//                             <BiRupee/> <span>499</span> only
//                         </p>
//                         <div className="text-gray-200">
//                             <p>
//                                 100% refund on cancellation
//                             </p>
//                             <p>
//                                 * Terms and conditions applied *
//                             </p>
//                         </div>
//                         <button className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2" type="submit">
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </HomeLayout>
//     )
// }




// export default Checkout;