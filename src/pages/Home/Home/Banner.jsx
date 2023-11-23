'use client';

import { Carousel } from 'flowbite-react';

const Banner = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-10 max-w-6xl mx-auto">
            <Carousel slideInterval={4000}>
                <img src="https://i.ibb.co/9HZ2Nkw/New-Project-2023-11-23-T205404-267.png" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
            </Carousel>
        </div>
    );
};

export default Banner;