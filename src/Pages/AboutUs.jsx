import HomeLayout from "../Layouts/HomeLayout";

import aboutMainImage from '../Assets/Images/aboutMainImage.png';

import CarouselSlide from "../Components/CarouselSlide";

import { slideData } from "../Constants/SlideData";


function AboutUs(){

    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide affordable and quality education to the world. we are providing a platform for the aspiring teachers and students to share their skills creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img src={aboutMainImage} 
                        className="drop-shadow-2xl" 
                        id="test1" 
                        style={{
                            filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"    
                        }}
                        alt="about main image"
                        />
                    </div>
                </div>
                <div className="carousel w-1/2 my-16 m-auto ">
                    {slideData.map((person,idx)=>
                    <CarouselSlide image={person.image} title={person.title} description={person.description} slideNumber={idx+1} totalSlides={slideData.length} key={idx+1}/>
                    )}
                </div>
            </div>
        </HomeLayout>
    )
}


export default AboutUs;