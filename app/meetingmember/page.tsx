import React from "react";
import { prisma } from "../lib/Prisma";
import { meetingmember } from "../generated/prisma/browser";
import Link from "next/link";
import deleteUser from "../actions/DeleteUser";
import DeleteUserBtn from "../ui/DeleteUserBtn";
import BackButton from "../components/BackButton";

async function MeetingMember() {
  const data = await prisma.meetingmember.findMany();

  return (
    <>

      <div className="flex justify-between items-center mt-10 mb-4">
        <div>
          <BackButton href="/" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">Meeting Members</h1>
        </div>
        <Link
          href="/meetingmember/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add New Meeting Member
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">UserID</th>
              <th scope="col" className="px-6 py-3">User Name</th>
              <th scope="col" className="px-6 py-3">Mobile No</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Detail</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u: meetingmember) => (
              <tr key={u.MeetingMemberID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.MeetingMemberID}
                </td>
                <td className="px-6 py-4">{u.StaffID}</td>
                <td className="px-6 py-4">{u.Remarks}</td>
                <td className="px-6 py-4">{u.IsPresent}</td>
                <td className="px-6 py-4">
                  <Link href={`/meetingmember/${u.MeetingMemberID}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Detail
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/meetingmember/edit/${u.MeetingMemberID}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <DeleteUserBtn id={u.MeetingMemberID} deleteFn={deleteUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MeetingMember;