import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";

function ForgotPassword(){

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email:''
    });

    function handleInput(e){
        e.preventDefault();
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userData.email){
            toast.error('All feilds are mandatory');
            return;
        }

        const response = await dispatch(forgotPassword(userData));

        if(response?.payload?.success){
            setUserData({
                email:''
            })
        }

    }
    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh]">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
                    <h1 className="text-center text-2xl font-bold">
                        Password Recovery
                    </h1>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-semibold">Email :</label>
                        <input 
                        type="email" 
                        id="email"
                        required
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleInput}
                        value={userData.email}
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


export default ForgotPassword;