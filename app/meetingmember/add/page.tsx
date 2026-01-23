import { saveMeetingMember } from "@/app/actions/saveMeetingMember";
import React from "react";
import BackButton from "../../components/BackButton";

function AddMeetingMember() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg">
        <BackButton href="/meetingmember" className="mb-2" />
        <form action={saveMeetingMember} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Add Meeting Member</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Meeting ID</td>
                <td className="py-3">
                  <input
                    type="number"
                    name="MeetingID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Staff ID</td>
                <td className="py-3">
                  <input
                    type="number"
                    name="StaffID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Remarks</td>
                <td className="py-3">
                  <input
                    type="text"
                    name="Remarks"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Is Present</td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="IsPresent"
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="pt-6 text-center">
                  <input
                    type="submit"
                    value="Add Member"
                    className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default AddMeetingMember;