'use client';

import { Table } from 'flowbite-react';
import useUsers from '../../../../Hooks/useUsers';



const MyProfile = () => {
    const [users] = useUsers()
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Serial</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {users?.map((user, index) =>
                    < Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            <img src={user?.image} alt="" />
                        </Table.Cell>
                        <Table.Cell>{user?.name}</Table.Cell>
                        <Table.Cell>{user?.email}</Table.Cell>
                        <Table.Cell>{user?.phone}</Table.Cell>
                        <Table.Cell>{user?.role || 'user'}</Table.Cell>
                        {/* <Table.Cell>
                            <button onClick={() => handleDeleteUser(user._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                <FaTrash />
                            </button>
                        </Table.Cell> */}
                    </Table.Row>
                )

                }
            </Table.Body>
        </Table >
    );
};

export default MyProfile;