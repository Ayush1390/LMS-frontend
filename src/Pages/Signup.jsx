import HomeLayout from "../Layouts/HomeLayout"
import billGates from '../Assets/Images/billGates.png';
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatch";

function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState('');

    const [signupData, setSignupData] = useState({
        fullName:'',
        email:'',
        password:'',
        avatar:''

    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    function getImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        
        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar:uploadedImage
            })
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load',function(){
            console.log(this.result);
            setPreviewImage(this.result);
        })
    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar ){
            toast.error('Please fill all the details');
            return;
        }

        if(signupData.fullName.length < 5){
            toast.error('Name must be of atleast 5 characters');
            return;
        }

       if(!isValidPassword(signupData.password)){
            toast.error('Password must br 5-15 characters long with atleat a number and special character');
            return
       }
        
        if(!isEmail(signupData.email)){
            toast.error('Invalid email id');
            return;
        }

        const formData = new FormData();
        formData.append('fullName',signupData.fullName);
        formData.append('email',signupData.email);
        formData.append('password',signupData.password);
        formData.append('avatar',signupData.avatar);

        const response = await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.sucess){
            navigate('/');
        }

        setSignupData({
            fullName:'',
            email:'',
            password:'',
            avatar:''
        });

        setPreviewImage('');
    }

    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
                    <h1 className="text-center text-2xl font-bold">
                        Registration Page
                    </h1>
                    <label htmlFor="image_upload" className="cursor-pointer ">
                        {previewImage ? (
                            <img src={previewImage} className="h-24 w-24 rounded-full m-auto"/>
                        ): (
                            <BsPersonCircle className="h-24 w-24 rounded-full m-auto"/>
                        )}
                    </label>
                    <input className="hidden" type="file" id="image_upload" accept=".jpg, .jpeg, .png, .svg"
                    onChange={getImage}
                    />

                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="fullName" className="font-semibold">Name</label>
                            <input 
                            type="text" 
                            id="fullName"
                            required
                            name="fullName"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                            placeholder="Enter your name"
                            className="bg-transparent px-2 py-1 border "/>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                        type="email" 
                        id="email"
                        required
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleUserInput}
                        value={signupData.email}
                        className="bg-transparent px-2 py-1 border "/>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                        type="password" 
                        id="password"
                        required
                        name="password"
                        placeholder="Enter password"
                        onChange={handleUserInput}
                        value={signupData.password}
                        className="bg-transparent px-2 py-1 border "/>
                    </div>

                    <button className="w-full rounded-md border border-white py-1 bg-blue-500 mt-6 font-semibold hover:shadow-[0_0_10px_blue] hover:bg-blue-700 transition-all ease-in-out duration-300" type="submit">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account? <Link to="/login" className="link text-accent">Login</Link>
                    </p>
                    
                </form>
            </div>
        </HomeLayout>
    )
}


export default Signup