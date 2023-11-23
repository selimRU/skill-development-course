import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Partners from "../Partners/Partners";
import PopularCourses from "../PopularCourses/PopularCourses";


const Home = () => {
    return (
        <div className=" max-w-6xl mx-auto ">
            <Helmet>
                <title>Skill Minds - Home</title>
            </Helmet>
            <Banner />
            <Partners />
            <PopularCourses />
        </div>
    );
};

export default Home;