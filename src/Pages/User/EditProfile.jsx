import { useState } from 'react';
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { editProfile, getUserData } from '../../Redux/Slices/AuthSlice';
import HomeLayout from '../../Layouts/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function EditProfile(){


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        previewImage:useSelector((state)=>state?.auth?.data?.avatar?.secure_url) || '',
        fullName:'',
        avatar:null,
        userId : useSelector((state)=>state?.auth?.data?._id),
    })

    

    const dat = useSelector((state)=>state.auth.data);
    // console.log('dat',dat);

    function handleImageUpload(e){

        console.log('form id',data.userId);
        e.preventDefault();
        
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load',function(){
                setData({
                    ...data,
                    avatar:uploadedImage,
                    previewImage:this.result
                })
            })
        }
    }

    function handleUserInput(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!data.avatar || !data.fullName){
            toast.error('All feilds are mandatory');
            return;
        }
        
        if(data.fullName.length < 5){
            toast.error('Name must be of atleast 5 characters');
            return;
        }

        const formData = new FormData();
        formData.append('fullName',data.fullName);
        formData.append('avatar',data.avatar);

        await dispatch(editProfile([data.userId,formData]));
        await dispatch(getUserData());

        navigate('/user/profile')

    }

    console.log(data);
    
    return(
        <HomeLayout>
            
            <div className='flex items-center justify-center h-[100vh]'>
                <form onSubmit={onFormSubmit} className='flex flex-col gap-5 rounded-lg justify-center p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]'>
                    <h1 className='text-center text-2xl font-semibold'>
                    Edit Profile
                    </h1>
                    <label 
                    className='cursor-pointer'
                    htmlFor="image_upload" >
                        {data.previewImage && data.previewImage!=''? (
                            <img src={data.previewImage} alt="" className='w-28 h-28 rounded-full m-auto'/>
                        ):(
                            <BsPersonCircle className='w-28 h-28 rounded-full m-auto'/>
                        )}
                    </label>
                    <input
                    className='hidden' 
                    type="file" 
                    name='image_upload'
                    id='image_upload'
                    // value={data.previewImage}
                    onChange={handleImageUpload}
                    accept='.jpg, .png, .jpeg, .svg'
                    />

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName" className='text-lg font-semibold'>
                            Full Name
                        </label>
                        <input 
                        className='bg-transparent px-2 py-1 border'
                        type="text"
                        name='fullName'
                        id='fullName'
                        value={data.fullName}
                        onChange={handleUserInput}
                        required
                        placeholder='enter your name' />
                    </div>
                    <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer'>
                        Update Profile
                    </button>
                    <Link to='/user/profile'>
                        <p className='link text-accent cursor-pointer flex items-center justify-center w-full'>
                           {<AiOutlineArrowLeft/>}  Go back to Profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}


export default EditProfile;