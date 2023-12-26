'use client';

import { Carousel } from 'flowbite-react';

const Banner = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-10 max-w-6xl mx-auto">
            <Carousel slideInterval={4000}>
                <img src="https://i.ibb.co/PDCyMjN/web.png" alt="..." />
                <img src="https://i.ibb.co/gyxS13r/othn.jpg" alt="..." />
                <img src="https://i.ibb.co/gwShBJc/mobile-app-development.jpg" alt="..." />
                <img src="https://i.ibb.co/PFLzj5V/ui-ux.jpg" alt="..." />
            </Carousel>
        </div>
    );
};

export default Banner;