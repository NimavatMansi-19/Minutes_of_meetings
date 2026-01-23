import Link from "next/link";
import { getDashboardStats } from "@/app/actions/getDashboardStats";

export default async function Home() {
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Hero / Header Section with subtle gradient */}
      <div className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening in your organization today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* Total Staff Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Staff</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalStaff}</p>
            </dd>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 dark:bg-zinc-700/30 px-6 py-2">
              <Link href="/staff" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">View all staff &rarr;</Link>
            </div>
          </div>

          {/* Total Meetings Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md">
            <dt>
              <div className="absolute rounded-md bg-pink-500 p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Meetings</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalMeetings}</p>
            </dd>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 dark:bg-zinc-700/30 px-6 py-2">
              <Link href="/meetings" className="text-xs font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400">View all meetings &rarr;</Link>
            </div>
          </div>

          {/* Meeting Members Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md">
            <dt>
              <div className="absolute rounded-md bg-emerald-500 p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Members</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalMembers}</p>
            </dd>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 dark:bg-zinc-700/30 px-6 py-2">
              <Link href="/meetingmember" className="text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">View all members &rarr;</Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Meetings Section (Main Column) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
              <div className="p-6 border-b border-gray-100 dark:border-zinc-700/50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Meetings</h2>
                <Link href="/meetings" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  View Calendar
                </Link>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-zinc-700/50">
                {stats.upcomingMeetings.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No upcoming meetings scheduled.
                  </div>
                ) : (
                  stats.upcomingMeetings.map((meeting) => (
                    <div key={meeting.MeetingID} className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-700/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {meeting.meetingtype?.MeetingTypeName || 'Meeting'}
                          </p>
                          <div className="mt-1 flex items-center gap-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{new Date(meeting.MeetingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>&bull;</span>
                            <span>{new Date(meeting.MeetingDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meeting.IsCancelled
                            ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                          {meeting.IsCancelled ? 'Cancelled' : 'Confirmed'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions (Sidebar Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/staff/create" className="group flex items-center justify-between rounded-lg bg-gray-50 dark:bg-zinc-700/30 p-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-700 ring-1 ring-gray-200 dark:ring-zinc-600">
                      <svg className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Add New Staff</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link href="/meetings/create" className="group flex items-center justify-between rounded-lg bg-gray-50 dark:bg-zinc-700/30 p-4 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-700 ring-1 ring-gray-200 dark:ring-zinc-600">
                      <svg className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Schedule Meeting</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link href="/meetingmember/create" className="group flex items-center justify-between rounded-lg bg-gray-50 dark:bg-zinc-700/30 p-4 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-700 ring-1 ring-gray-200 dark:ring-zinc-600">
                      <svg className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Register Member</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
