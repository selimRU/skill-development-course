import { Button } from 'flowbite-react';
import teach from '../../../assets/teach.png'

const TeachingToday = () => {
    return (
        <div>
            <div className=' flex flex-col md:flex-row justify-between items-center gap-5'>
                <div className=' bg-blue-400 md:w-6/12 h-[500px]'>
                    <img src={teach} alt="" />
                </div>
                <div className=' md:w-4/12 h-[300px] space-y-3'>
                    <h2 className='text-base md:text-2xl lg:text-3xl font-bold'>Becaome An Instructor</h2>
                    <p>Are you a passionate and dedicated educator ready to make a difference in the lives of students? Look no further! skill minds is thrilled to announce a captivating job offer for a talented instructor to join our vibrant team.</p>
                    <Button gradientMonochrome="cyan">Teaching Today</Button>
                </div>

            </div>
        </div>
    );
};

export default TeachingToday;