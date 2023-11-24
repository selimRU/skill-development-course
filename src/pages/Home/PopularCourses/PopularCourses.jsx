import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import courseImage1 from '../../../assets/popular-courses/app.png'
import courseImage2 from '../../../assets/popular-courses/dig.png'
import courseImage3 from '../../../assets/popular-courses/web.png'
import courseImage4 from '../../../assets/popular-courses/pyt.png'
import courseImage5 from '../../../assets/popular-courses/ui.png'
import courseImage6 from '../../../assets/popular-courses/gra.png'

const PopularCourses = () => {
    return (
        <div className=' my-20'>
            <h3 className=' text-xl md:text-2xl lg:text-4xl text-center font-semibold mb-5'>Our Most Enrolled Courses</h3>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className=' relative'>
                        <img className=' rounded-md' src={courseImage1} alt="" />
                        <div className=' bg-black text-white w-full h-[30px] md:h-[60px] absolute top-0 text-center text-xs md:text-lg lg:text-4xl'>App Development</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img className=' rounded-md' src={courseImage3} alt="" />
                        <div className=' text-center text-xs md:text-lg lg:text-4xl absolute top-0 bg-black text-white w-full h-[30px] md:h-[60px]'>Web Development</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img className=' rounded-md' src={courseImage4} alt="" />
                        <div className=' text-center text-xs md:text-lg lg:text-4xl absolute top-0 bg-black text-white w-full h-[30px] md:h-[60px]'>Python programming</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img className=' rounded-md' src={courseImage5} alt="" />
                        <div className=' text-center text-xs md:text-lg lg:text-4xl absolute top-0 bg-black text-white w-full h-[30px] md:h-[60px]'>UI/UX Designing</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img className=' rounded-md' src={courseImage2} alt="" />
                        <div className=''></div>
                        <div className=' text-center text-xs md:text-lg lg:text-4xl absolute top-0 bg-black text-white w-full h-[30px] md:h-[60px]'>Digital Marketting</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img className=' rounded-md' src={courseImage6} alt="" />
                        <div className=' text-center text-xs md:text-lg lg:text-4xl absolute top-0 bg-black text-white w-full h-[30px] md:h-[60px]'>Graphics Design</div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default PopularCourses;

//
// {courseImage2}
// {courseImage3}
// {courseImage4}
// {courseImage5}
// {courseImage6}