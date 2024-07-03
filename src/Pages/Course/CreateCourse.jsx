import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title:'',
        category:'',
        description:'',
        createdBy:'',
        thumbnail:null,
        previewImage:''
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setUserInput({
                    ...userInput,
                    previewImage:this.result,
                    thumbnail:uploadedImage
                })
            })
        }
    }

    function handleUerInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail){
            toast.error('All feilds are mandatory');
            return;
        }

        const res = await dispatch(createNewCourse(userInput));
        if(res?.payload?.sucess){
            console.log(res);
            setUserInput({
                title:'',
                description:'',
                category:'',
                createdBy:'',
                thumbnail:null,
                previewImage:''
            })
            navigate('/courses')
        }
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative" onSubmit={onFormSubmit}>
                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft/>
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Create new course
                    </h1>
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_upload" className="cursor-pointer">
                                    {
                                        userInput.previewImage ? (
                                            <img src={userInput.previewImage} alt="" className="w-full h-44 m-auto border"/>
                                        ):(
                                            <div className="w-full h-44 m-auto flex items-center justify-center border border-white">
                                                <h1 className="font-bold text-lg">
                                                upload course thumbnail
                                                </h1>
                                            </div>
                                        )
                                    }
                                </label>
                                <input id="image_upload" type="file" 
                                className="hidden" onChange={handleImageUpload} accept=".jpg, .jpeg, .png" name="image_uploads"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                    <label 
                                    htmlFor="title" 
                                    className="text-lg font-semibold">
                                        Course title
                                    </label>
                                    <input 
                                    type="text" 
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border "
                                    value={userInput.title}
                                    onChange={handleUerInput}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                           <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="createdBy" 
                                className="text-lg font-semibold">
                                    Course instructor
                                </label>
                                <input 
                                type="text" 
                                id="createdBy"
                                name="createdBy"
                                required
                                placeholder="Enter Instructor name"
                                className="bg-transparent px-2 py-1 border "
                                value={userInput.createdBy}
                                onChange={handleUerInput}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="category" 
                                className="text-lg font-semibold">
                                    Course category
                                </label>
                                <input 
                                type="text" 
                                id="category"
                                name="category"
                                required
                                placeholder="Enter course category"
                                className="bg-transparent px-2 py-1 border "
                                value={userInput.category}
                                onChange={handleUerInput}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="description" 
                                className="text-lg font-semibold">
                                    Course description
                                </label>
                                <textarea 
                                id="description"
                                name="description"
                                required
                                placeholder="Enter description"
                                className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                                value={userInput.description}
                                onChange={handleUerInput}/>
                            </div>
                        </div>
                    </main>
                    <button className="w-full rounded-md border border-white py-1 bg-blue-500 mt-6 font-semibold hover:shadow-[0_0_10px_blue] hover:bg-blue-700 transition-all ease-in-out duration-300" type="submit">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}


export default CreateCourse;