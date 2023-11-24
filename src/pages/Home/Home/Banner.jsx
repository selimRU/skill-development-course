'use client';

import { Carousel } from 'flowbite-react';

const Banner = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-10 max-w-6xl mx-auto">
            <Carousel slideInterval={4000}>
                <img src="https://i.postimg.cc/BZLcnX0b/New-Project-2023-11-24-T113627-608.png" alt="..." />
                <img src="https://i.postimg.cc/VNKBdtvr/New-Project-2023-11-24-T112937-827.png" alt="..." />
                <img src="https://i.postimg.cc/ydWh9N3f/New-Project-2023-11-24-T113035-997.png" alt="..." />
                <img src="https://i.postimg.cc/nVyKjpFk/New-Project-2023-11-24-T113112-956.png" alt="..." />
                <img src="https://i.postimg.cc/WzkMWfng/New-Project-2023-11-24-T113133-972.png" alt="..." />
            </Carousel>
        </div>
    );
};

export default Banner;