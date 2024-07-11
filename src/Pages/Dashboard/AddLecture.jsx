import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";


function AddLecture(){

    const courseDeatils = useLocation().state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(courseDeatils);

    const [userInput, setUserInput] = useState({
        id:courseDeatils._id,
        lecture:undefined,
        title:'',
        description:'',
        videoSrc:''
    })

    function handleInputChange(e){
        const {name, value} = e.target
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVideo(e){
        e.preventDefault();

        const uploadedVideo = e.target.files[0];

        if(uploadedVideo){
            const source = window.URL.createObjectURL(uploadedVideo);
            console.log(source);
            setUserInput({
                ...userInput,
                lecture:uploadedVideo,
                videoSrc:source
            })
        }
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title || !userInput.lecture || !userInput.description){
            toast.error('All feilds are mandatory');
            return;
        }

        const response = await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            navigate(-1);
            setUserInput({
                id:courseDeatils._id,
                lecture:undefined,
                title:'',
                description:'',
                videoSrc:''
            })
        }
    }

    useEffect(()=>{
        if(!courseDeatils)
            navigate('/courses')
    },[])

    return(
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button className="absolute left-2 text-xl  text-green-500" onClick={()=>navigate(-1)}>
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new Lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">

                        <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="enter lecture name "
                        onChange={handleInputChange}
                        className="bg-transparent px-3 py-1 border"
                        value={userInput.title} 
                        />

                        <textarea 
                        type="text"
                        name="description"
                        id="description"
                        placeholder="eneter lecture description"
                        onChange={handleInputChange}
                        className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                        value={userInput.description} 
                        />

                        {userInput.videoSrc ? (
                            <video 
                            src={userInput.videoSrc} 
                            controls
                            disablePictureInPicture
                            controlsList="nodownload nofullscreen"
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            >

                            </video>
                        ):(
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label htmlFor="lecture"
                                className="font-semibold text-xl cursor-pointer"
                                >Choose your video</label>
                                <input 
                                type="file"
                                id="lecture"
                                name="lecture"
                                onChange={handleVideo}
                                accept="video/mp4 video/x-mp4 video/*" 
                                className="hidden"
                                />
                            </div>
                        )}
                        <button type="submit" className="py-1 font-semibold text-lg btn btn-primary">
                            Add new lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}


export default AddLecture