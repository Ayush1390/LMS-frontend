import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { changePassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function ChangePassword(){


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        oldPassword:'',
        newPassword:''

    })

    function handleInput(e){
        e.preventDefault();
        const {name, value} = e.target
        setUserData({
            ...userData,
            [name]:value
            
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userData.oldPassword || !userData.newPassword){
            toast.error('All feilds are mandatory');
            return;
        }
        const res = await dispatch(changePassword(userData));
        if(res?.payload?.success){
            navigate('/user/profile');
            setUserData({
                oldPassword:'',
                newPassword:''
            })
        }

    }

    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh]">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center   gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] relative">

                    <Link className="absolute top-5 text-2xl link text-accent cursor-pointer " onClick={()=>navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </Link>
                    
                
                    <h1 className="text-center text-2xl font-bold">
                        Change Password
                    </h1>
                   

                    <div className="flex flex-col gap-1 w-full mt-5">
                        <label htmlFor="oldPassword" className="font-semibold">Old password :</label>
                        <input 
                        type="text" 
                        id="oldPassword"
                        required
                        name="oldPassword"
                        placeholder="Enter old password"
                        onChange={handleInput}
                        value={userData.oldPassword}
                        className="bg-transparent px-2 py-1 border "/>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="newPassword" className="font-semibold">New password :</label>
                        <input 
                        type="password" 
                        id="newPassword"
                        required
                        name="newPassword"
                        placeholder="Enter new password"
                        onChange={handleInput}
                        value={userData.newPassword}
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


export default ChangePassword;