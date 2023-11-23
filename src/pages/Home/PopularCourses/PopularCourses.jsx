import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import courseImage1 from '../../../assets/popular-courses/app.png'
import courseImage2 from '../../../assets/popular-courses/digi.png'
import courseImage3 from '../../../assets/popular-courses/web.png'
import courseImage4 from '../../../assets/popular-courses/python.png'
import courseImage5 from '../../../assets/popular-courses/ui.png'
import courseImage6 from '../../../assets/popular-courses/gra.png'

const PopularCourses = () => {
    return (
        <div className=' my-20'>
            <h3 className=' text-4xl text-center font-semibold mb-5'>Our Most Enrolled Courses</h3>
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
                        <img src={courseImage1} alt="" />
                        <h3 className=' absolute -mt-10 text-2xl'>App Development</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img src={courseImage2} alt="" />
                        <h3 className=' absolute -mt-10 text-2xl'></h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img src={courseImage3} alt="" />
                        <h3 className=' absolute -mt-10 text-2xl'></h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img src={courseImage4} alt="" />
                        <h3 className=' absolute -mt-10 text-2xl'></h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img src={courseImage5} alt="" />
                        <h3 className=' absolute -mt-10 text-2xl'></h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=' relative'>
                        <img src={courseImage6} alt="" />
                        <h3 className=' absolute -mt-10 text-2xl'></h3>
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