import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Partners from "../Partners/Partners";
import PopularCourses from "../PopularCourses/PopularCourses";
import Reviews from "../Reviews/Reviews";
import Statistics from "../Statistics/Statistics";
import TeachingToday from "../TeachingToday/TeachingToday";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You may need to import the styles as well
import { useEffect } from "react";


const Home = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init();
        AOS.init({ duration: 1200 });
        return () => {
            AOS.refresh();
        };
    }, []); 
    return (
        <div className=" max-w-6xl mx-auto px-3 md:px-0 lg:px-0 ">
            <Helmet>
                <title>Skill Minds - Home</title>
            </Helmet>
            <div data-aos="fade-up">
                <Banner />
                <Partners />
                <PopularCourses />
                <Reviews />
                <Statistics />
                <TeachingToday />
            </div>
        </div>
    );
};

export default Home;