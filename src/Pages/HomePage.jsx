import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomePageImage from '../Assets/Images/homePageMainImage.png';

function HomePage(){
    return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Find out best&nbsp;
                        <span className="text-yellow-500 font font-bold ">
                            Online Course
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        we have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
                    <div className="space-x-6">
                        <Link to="/courses">
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300
                            text-black">
                                Explore Courses
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="border border-white px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-30 text-white">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <img src={HomePageImage} alt="homepage image" className="transform hover:transition-all ease-in-out duration-300 hover:scale-110"/>
                </div>
            </div>
        </HomeLayout>



    )
}


export default HomePage;