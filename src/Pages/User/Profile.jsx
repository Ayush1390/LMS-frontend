import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";


function Profile(){


    const userData = useSelector((state)=> state?.auth?.data)
    console.log(userData);
    
    return(
        <HomeLayout>
            <div className="flex min-h-[100vh] justify-center items-center">
                <div className="flex flex-col w-96 my-10 gap-4 p-4 rounded-lg text-white shadow-[0_0_10px_black]">
                    
                    <img src={userData.avatar.secure_url } alt="" className="w-40  m-auto rounded-full border border-black" />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>
                            Email :
                        </p>
                        <p>
                            {userData?.email}
                        </p>
                        <p>
                            Role :
                        </p>
                        <p>
                            {userData?.role}
                        </p>
                        <p>
                            Subscription :
                        </p>
                        <p>
                            {userData?.subscription?.status === 'active'? 'Active':'Inactive'}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link to='/changepassword' className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                        <button>
                            Change password
                        </button>
                        </Link>
                        <Link to='/user/editprofile' className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                        <button>
                            Edit profile
                        </button>
                        </Link>
                    </div>
                    {userData?.subscription?.status === 'Active' && (
                        <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    )
}


export default Profile;