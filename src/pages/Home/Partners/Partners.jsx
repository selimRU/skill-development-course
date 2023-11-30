import Marquee from "react-fast-marquee";
import parner1 from '../../../assets/partners/at.png'
import parner2 from '../../../assets/partners/ph.png'
import parner3 from '../../../assets/partners/bg.png'
import parner4 from '../../../assets/partners/gp.png'
import parner5 from '../../../assets/partners/ss.png'
import parner6 from '../../../assets/partners/tk.png'

const Partners = () => {
    return (
        <div className=" my-20 ">
            <div className=" space-y-3">
                <h2 className=" lg:text-3xl font-semibold text-center">Our Collaborators</h2>
                <p className=" text-center">Trusted over 100 companies and millions of learners all over the country</p>
            </div>
            <Marquee>
                <div className=" flex items-center gap-5 md:gap-8 lg:gap-24 mt-10">
                    <img className=" rounded-md w-[100px] h-[100px]" src={parner1} alt="" />
                    <img className=" rounded-md w-[100px] h-[100px]" src={parner2} alt="" />
                    <img className=" rounded-md w-[100px] h-[100px]" src={parner3} alt="" />
                    <img className=" rounded-md w-[100px] h-[100px]" src={parner4} alt="" />
                    <img className=" rounded-md w-[100px] h-[100px]" src={parner5} alt="" />
                    <img className=" rounded-md w-[100px] h-[100px]" src={parner6} alt="" />
                </div>
            </Marquee>
        </div>
    );
};

export default Partners;