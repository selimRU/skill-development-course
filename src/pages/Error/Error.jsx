import err from '../../assets/404.gif'

const Error = () => {
    return (
        <div className=' max-w-6xl mx-auto my-5'>
            <img className=' max-w-[60%] mx-auto' src={err} alt="" />
        </div>
    );
};

export default Error;