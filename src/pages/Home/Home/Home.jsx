import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Partners from "../Partners/Partners";
import PopularCourses from "../PopularCourses/PopularCourses";
import Reviews from "../Reviews/Reviews";
import Statistics from "../Statistics/Statistics";
import TeachingToday from "../TeachingToday/TeachingToday";


const Home = () => {
    return (
        <div className=" max-w-6xl mx-auto ">
            <Helmet>
                <title>Skill Minds - Home</title>
            </Helmet>
            <Banner />
            <Partners />
            <PopularCourses />
            <Reviews />
            <Statistics />
            <TeachingToday />
        </div>
    );
};

export default Home;