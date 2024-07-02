import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isEmail } from "../Helpers/regexMatch";
import axiosInstance from "../Helpers/axiosInstance";

function ContactUs(){


    const [userInput, setUserInput] = useState({
        name:'',
        email:'',
        message:''
    });

    function handleInputChange(e){
        const {name,value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error('All feilds are mandatory')
            return;
        }

        if(!isEmail(userInput.email)){
            toast.error('Invalid email-id');
            return;
        }

        try {
           const response = axiosInstance.post('/contact',userInput);
           toast.promise(response,{
            loading:'Submitting your message..',
            success:'Form submitted',
            error:'Failed to submit form'
           }) 
           const contactResponse = await response;
           if(contactResponse?.data?.success){
            setUserInput({
                name:'',
                email:'',
                message:''
            })
           }
        } catch (error) {
            toast.error('Operation failed')
        }

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem] ">
                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-lg font-semibold">Name</label>
                        <input 
                        type="text"
                        id="name"
                        name="name" 
                        placeholder="Enter your name"
                        onChange={handleInputChange}
                        value={userInput.name}
                        className="bg-transparent border px-2 py-1 rounded-sm" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-lg font-semibold">Email</label>
                        <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        value={userInput.email}
                        className="bg-transparent border px-2 py-1 rounded-sm" />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-lg font-semibold">Message</label>
                        <textarea 
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        onChange={handleInputChange}
                        value={userInput.message}
                        className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40" />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded md font-semibold text-lg cursor-pointer py-2 mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}


export default ContactUs;