import React, { useEffect, useState } from 'react';
// import SecTitle from '../../../Components/SecTitle/SecTitle';
// import { Rating } from '@smastrom/react-rating'

// import '@smastrom/react-rating/style.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from 'react-icons/fa';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const Reviews = () => {
    const axiosPublic = useAxiosPublic()
    // const Rating = require('react-rating');

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () =>
            await axiosPublic.get('/api/v1/reviews')
                .then(res => {
                    const data = (res.data);
                    return data
                })

    })

    return (
        <div className=' max-w-6xl mx-auto my-20'>
            {/* <SecTitle heading={'TESTIMONIALS'} subHeading={'---What Our Clients Say---'}></SecTitle> */}
            <div className=' flex justify-center my-20'>
                <FaQuoteLeft className=' text-4xl' />
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <div >
                    {
                        reviews.map(review => <SwiperSlide className=' space-y-3 px-16' key={review._id}>
                            {/* <Rating
                                className=' w-10 mx-auto'
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            /> */}
                            <img className=' mx-auto justify-center w-[40px] h-[40px] rounded-full' src={review.image} alt="" />
                            <h3 className=' text-base lg:text-xl text-center font-semibold'>{review.title}</h3>
                            <p className='text-[#444] text-xs text-center '>{review.details}</p>
                            <p className='text-center text-2xl text-[#CD9003]'>{review.name}</p>
                        </SwiperSlide>)
                    }
                </div>
            </Swiper>
        </div>
    );
};

export default Reviews;