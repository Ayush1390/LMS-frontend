import { useNavigate } from "react-router-dom";

function Denied(){

    const navigate = useNavigate()

    return(
        <div className="h-[100vh] w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white">
                403
            </h1>
            <div className=" bg-black text-md text-white font-semibold px-2 rounded rotate-12 absolute">
                Access denied...
            </div>
            <button className="mt-5 border border-white w-[8%] px-2 py-2 bg-black text-white hover:bg-yellow-600 transition-all ease-in-out duration-300"  onClick={()=> navigate(-1)}>
                <a className="relative inline-block ">
                    <span className="text-md font-medium" >
                        Go back
                    </span>
                </a>
            </button>
        </div>
    )
}


export default Denied;