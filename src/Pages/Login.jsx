import HomeLayout from "../Layouts/HomeLayout"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { login } from "../Redux/Slices/AuthSlice";

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [loginData, setLoginData] = useState({
        email:'',
        password:'',
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }


    async function onLogin(e){
        e.preventDefault();
        if(!loginData.email || !loginData.password){
            toast.error('Please fill all the details');
            return;
        }

        const response = await dispatch(login(loginData));
        console.log(response);

        if(response?.payload?.sucess){
            navigate('/');
        }

        setLoginData({
            email:'',
            password:''
        });
    }

    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh]">
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
                    <h1 className="text-center text-2xl font-bold">
                        Login Page
                    </h1>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                        type="email" 
                        id="email"
                        required
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleUserInput}
                        value={loginData.email}
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
                        value={loginData.password}
                        className="bg-transparent px-2 py-1 border "/>
                    </div>

                    <div className="w-full flex justify-end">
                        <Link to="/forgotpassword" className="link text-accent">Forgot password?</Link>
                    </div>

                    <button className="w-full rounded-md border border-white py-1 bg-blue-500 mt-6 font-semibold hover:shadow-[0_0_10px_blue] hover:bg-blue-700 transition-all ease-in-out duration-300" type="submit">
                        Login
                    </button>

                    <p className="text-center">
                        Don't have an account? <Link to="/signup" className="link text-accent">Register</Link>
                    </p>
                    
                </form>
            </div>
        </HomeLayout>
    )
}


export default Login;