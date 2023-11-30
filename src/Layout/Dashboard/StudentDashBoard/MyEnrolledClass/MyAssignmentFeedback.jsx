import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { FaPlus } from 'react-icons/fa';
import { MdAssignmentInd } from 'react-icons/md';
import { Button, Checkbox, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import ReactStars from "react-rating-stars-component";
import Swal from 'sweetalert2';
import useAuth from '../../../../Hooks/useAuth';
const MyAssignmentFeedback = ({ title }) => {
    const { user } = useAuth()
    const [rating, setRating] = useState()
    console.log(rating);
    const [openModal, setOpenModal] = useState(false);
    const axiosPublic = useAxiosPublic()

    function onCloseModal() {
        setOpenModal(false);
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)

        const feedbackInfo = {
            description: data.description,
            rating: rating,
            title: title,
            name: data.name,
            image: data.image
        }
        axiosPublic.post('/api/v1/assignmentFeedback/Create', feedbackInfo)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You assignment added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    const ratingChanged = (newRating) => {
        setRating(newRating)
    };
    return (
        <div>
            <Button className=" mb-5 rounded-2xl" onClick={() => setOpenModal(true)}><FaPlus className=" mr-2" />Create</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <h3 className=' text-center font-semibold text-3xl'>Assignment Feedback</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 justify-center mx-auto w-full">
                        <div >
                            <div className="mb-1 block">
                                <Label htmlFor="large" value="Title*" />
                            </div>
                            <TextInput defaultValue={title} {...register("title", { required: true })} id="large" type="text" sizing="lg" />
                        </div>
                        <div >
                            <div className="mb-1 block">
                                <Label htmlFor="large" value="Name*" />
                            </div>
                            <TextInput defaultValue={user?.displayName} {...register("name", { required: true })} id="large" type="text" sizing="lg" />
                        </div>
                        <div >
                            <div className="mb-1 block">
                                <Label htmlFor="large" value="Image*" />
                            </div>
                            <TextInput defaultValue={user?.photoURL} {...register("image", { required: true })} id="large" type="text" sizing="lg" />
                        </div>
                        <div >
                            <div className="mb-1 block">
                                <Label htmlFor="large" value="Description*" />
                            </div>
                            <Textarea {...register("description", { required: true })} className='h-[200px]' id="large" type="text" sizing="lg" />
                        </div>
                        <div>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </div>
                        <Button type='submit'>Send</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MyAssignmentFeedback;