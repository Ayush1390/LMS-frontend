// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription(){

    const {state} = useLocation();
    const {role,data} = useSelector((state)=> state.auth)

    const navigate = useNavigate();

    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col justify-center items-center text-white">
                <div className="grid grid-cols-2 relative py-10 gap-10">
                    <div className="space-y-5">
                        <img src={state?.thumbnail.secure_url} alt="thumbnail" 
                        className="w-full h-64"
                        />
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">
                                <p>
                                    <span className="text-yellow-500 font-bold">
                                        Toatl lectures :
                                    </span>
                                    &nbsp;{state?.numberOfLectures}
                                </p>
                                <p>
                                    <span className="text-yellow-500 font-bold">
                                        Instructor :
                                    </span>
                                    &nbsp;{state?.createdBy}
                                </p>
                            
                            </div>
                            {
                                role==='ADMIN' || data?.subscription?.status==='Inactive'? (
                                    <button onClick={()=>navigate('/course/displaylectures',{state:{...state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        Watch lectures
                                    </button>                                   
                                ):(
                                    <button onClick={()=>navigate('/checkout')} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        Subscribe
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className="space-y-2 text-xl ">
                            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state.title}
                            </h1>
                            <p className="text-yellow-500">
                                Course description :
                            </p>
                            <p>
                                {state.description}
                            </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}


export default CourseDescription;