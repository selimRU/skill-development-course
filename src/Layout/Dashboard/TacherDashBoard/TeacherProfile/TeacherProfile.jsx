'use client';

import { Table } from 'flowbite-react';
import useProfile from '../../../../Hooks/useProfile/useProfile';

const TeacherProfile = () => {
    const { profile, isATeacherPending } = useProfile()

    if (isATeacherPending) {
        return <progress></progress>
    }

    return (
        <div>
            <h3 className=" text-2xl text-center font-semibold mb-5 border-b-2 border-blue-400 py-3 text-blue-400">My Enroled Courses</h3>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Phone</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">

                    < Table.Row key={profile._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <img className=' w-[100px] h-[1oopx]' src={profile?.image} alt="" />
                        </Table.Cell>
                        <Table.Cell>{profile?.name}</Table.Cell>
                        <Table.Cell>{profile?.email}</Table.Cell>
                        <Table.Cell>{profile?.phone}</Table.Cell>
                        <Table.Cell>{profile?.role || 'profile'}</Table.Cell>
                        {/* <Table.Cell>
                            <button onClick={() => handleDeleteprofile(profile._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                <FaTrash />
                            </button>
                        </Table.Cell> */}
                    </Table.Row>
                </Table.Body>
            </Table >
        </div>
    );
};

export default TeacherProfile;