import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

function ResetPassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {resetToken} = useParams();

    console.log(resetToken);

    const [userPasswordData, setUserPasswordData] = useState({
        password:'',
        resetToken
    })

    function handleInput(e){
        e.preventDefault();
        const {name, value} = e.target;
        setUserPasswordData({
            ...userPasswordData,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userPasswordData.password){
            toast.error('All feilds are mandatory');
            return;
        }

        const response = await dispatch(resetPassword(userPasswordData));

        if(response?.payload?.success){
            navigate('/login');
            setUserPasswordData({
                password:'',
                resetToken:''
            })
        }
    }

    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh]">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
                    <h1 className="text-center text-2xl font-bold">
                        Reset Password
                    </h1>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="password" className="font-semibold">New Password :</label>
                        <input 
                        type="password" 
                        id="password"
                        required
                        name="password"
                        placeholder="Enter your new password"
                        onChange={handleInput}
                        value={userPasswordData.password}
                        className="bg-transparent px-2 py-1 border "/>
                    </div>

                    <button className="w-full rounded-md border border-white py-1 bg-blue-500 mt-6 font-semibold hover:shadow-[0_0_10px_blue] hover:bg-blue-700 transition-all ease-in-out duration-300" type="submit">
                        Submit
                    </button>

                </form>
            </div>
        </HomeLayout>
    )
}


export default ResetPassword;