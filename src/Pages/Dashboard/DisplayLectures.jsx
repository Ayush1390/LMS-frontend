import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";
// import { FaRegPlayCircle } from "react-icons/fa";


function DisplayLectures(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state)=>state?.lecture)
    const {role} = useSelector((state)=>state?.auth)

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(()=>{
        if(!state)
            navigate('/courses')
        console.log(state);
        console.log(lectures)
        dispatch(getCourseLecture(state._id))
        console.log(lectures);
    },[])


    async function onLectureDelete(courseId,lectureId){
        console.log(courseId);
        console.log(lectureId);
        await dispatch(deleteCourseLecture({courseId,lectureId}))
        await dispatch(getCourseLecture(courseId))
    }

    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course name : {state?.title} 
                </div>

                {(lectures && lectures.length>0)? (<div className="flex justify-center gap-10 w-full">
                    {/* left section videos and displaying details to admin*/}
                    <div className="space-y-5 w-[40rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video 
                        src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                        controls
                        disablePictureInPicture

                        controlsList="nodownload"
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"></video>
                        <div>
                            <h1>
                                <span className="text-yellow-500">
                                    Title : {" "}
                                </span>
                                {lectures && lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500 line-clamp-4">
                                    Description : {" "}
                                </span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                        </div>
                    </div>
                    {/* right section */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 overflow-y-scroll max-h-[80vh]">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between mb-10">
                            <p>
                                Lectures list
                            </p>
                            
                            {role==='ADMIN' && (
                                <button onClick={()=> navigate('/course/addlecture',{state:{...state}})} className="bg-blue-500 px-2 py-1 rounded-md text-sm font-semibold text-white  hover:bg-blue-600 hover:shadow-[0_0_10px_blue]">
                                    Add new lectures
                                </button>
                            )}

                        </li>
                        {lectures && lectures.map((lec,idx)=>{
                            return(
                                <li className="space-y-2 py-2 shadow-[0_0_10px_black] pl-1 " key={lec._id}>
                                    <p className="cursor-pointer" onClick={()=> setCurrentVideo(idx)}>
                                        <span className="">
                                            {" "} Lecture {idx+1} : {" "}
                                        </span>
                                        {lec?.title}
                                    </p>
                                    {role==='ADMIN' && (
                                        <button onClick={()=>onLectureDelete(state?._id,lec?._id)} className="bg-red-500 px-2 py-1 rounded-md text-sm font-semibold hover:bg-red-600 hover:shadow-[0_0_10px_red]">
                                            Delete lecture
                                        </button>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>):(
                    role==='ADMIN' && (
                        <button onClick={()=> navigate('/course/addlecture',{state:{...state}})} className="bg-blue-500 px-2 py-1 rounded-md text-sm font-semibold text-white  hover:bg-blue-600 hover:shadow-[0_0_10px_blue]">
                            Add new lectures
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    )
}


export default DisplayLectures;



