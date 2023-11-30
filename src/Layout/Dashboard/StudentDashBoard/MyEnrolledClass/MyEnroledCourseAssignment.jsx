'use client';

import { Button, Card, Table } from 'flowbite-react';
import useAuth from '../../../../Hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import MyAssignmentFeedback from './myAssignmentFeedback';

const MyEnroledCourseAssignment = ({ course }) => {
    const assignment = useLoaderData()
    const { title, deadline, description } = assignment
    console.log(assignment);
    return (
        <div>
            <MyAssignmentFeedback title={title}></MyAssignmentFeedback>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Deadline</Table.HeadCell>
                    <Table.HeadCell>
                        Submission
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    < Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{title}
                        </Table.Cell>
                        <Table.Cell>{description}</Table.Cell>
                        <Table.Cell>{deadline}</Table.Cell>
                        <Table.Cell>
                            <button onClick={() => handleDeleteUser(user._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Submit
                            </button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table >
        </div>
    );
};

export default MyEnroledCourseAssignment;