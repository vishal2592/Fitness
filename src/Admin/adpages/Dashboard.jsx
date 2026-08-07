import React from "react";
import {
  Users,
  UserCheck,
  Dumbbell,
  CreditCard,
  TrendingUp,
  Calendar,
  Clock,
  Activity,
  BarChart3,
  Star,
  Crown,
  CheckCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

import gymDashboardData from "../Data/gym/dashboardData";
import yogaDashboardData from "../Data/yoga/dashboardData";


const Dashboard = () => {

  const currentMode = useSelector(
    (state) => state.mode.currentMode
  );

  const data = currentMode === "gym" ? gymDashboardData : yogaDashboardData;


  const iconMap = {
    Users,
    UserCheck,
    Dumbbell,
    CreditCard,
  };


  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">
          {data.title}
        </h1>

        <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
          Manage your {currentMode} activities here.
        </p>
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {data.stats.map((item, index) => {

          const Icon = iconMap[item.icon] || Users;

          return (
            <div
              key={index}
              className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]"
            >

              <div className="flex justify-between items-center">

                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Icon size={24} className="text-blue-600" />
                </div>

                <span className="flex items-center gap-1 text-sm text-blue-600">
                  <TrendingUp size={15} />
                  {item.growth}
                </span>

              </div>


              <p className="mt-4 text-sm text-[#64748B] dark:text-[#94A3B8]">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mt-1">
                {item.value}
              </h2>

            </div>

          );

        })}

      </div>



      {/* Attendance + Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* Attendance */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white">
                Class Attendance
              </h2>

              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                Weekly performance
              </p>
            </div>

            <BarChart3 className="text-blue-600" />

          </div>


          <div className="space-y-5">

            {data.attendance.map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                    {item.name}
                  </span>

                  <span className="text-sm font-semibold dark:text-white">
                    {item.value}%
                  </span>

                </div>


                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${item.value}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>




        {/* Overview */}
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]">

          <h2 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-5">
            Quick Overview
          </h2>


          <div className="space-y-5">


            <div className="flex gap-3">

              <Calendar className="text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Today's Classes
                </p>

                <h3 className="font-semibold dark:text-white">
                  {currentMode === "gym" ? "12 Sessions" : "8 Sessions"}
                </h3>
              </div>

            </div>



            <div className="flex gap-3">

              <Clock className="text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Peak Hours
                </p>

                <h3 className="font-semibold dark:text-white">
                  6 PM - 9 PM
                </h3>
              </div>

            </div>



            <div className="flex gap-3">

              <Activity className="text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Active Members
                </p>

                <h3 className="font-semibold dark:text-white">
                  {data.stats[0].value}
                </h3>
              </div>

            </div>


          </div>

        </div>


      </div>





      {/* Popular Programs */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]">

        <h2 className="text-lg font-semibold dark:text-white mb-5">
          Popular Programs
        </h2>


        <div className="grid md:grid-cols-3 gap-4">

          {data.popularPrograms.map((item, index) => (

            <div
              key={index}
              className="border dark:border-gray-700 rounded-xl p-4"
            >

              <h3 className="font-semibold dark:text-white">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Members : {item.members}
              </p>

              <p className="text-sm text-gray-500">
                Sessions : {item.sessions}
              </p>

            </div>

          ))}

        </div>

      </div>





      {/* Trainers */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]">

        <h2 className="text-lg font-semibold dark:text-white mb-5">
          Trainer Performance
        </h2>


        <div className="grid md:grid-cols-3 gap-4">

          {data.trainers.map((item, index) => (

            <div
              key={index}
              className="border dark:border-gray-700 rounded-xl p-4"
            >

              <h3 className="font-semibold dark:text-white">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.speciality}
              </p>


              <div className="flex items-center gap-1 text-yellow-500 mt-3">
                <Star size={15} />
                {item.rating}
              </div>

            </div>

          ))}

        </div>

      </div>






      {/* Membership */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]">

        <h2 className="text-lg font-semibold dark:text-white mb-5">
          Membership Plans
        </h2>


        <div className="grid md:grid-cols-3 gap-4">

          {data.memberships.map((item, index) => (

            <div
              key={index}
              className="border dark:border-gray-700 rounded-xl p-4"
            >

              <div className="flex justify-between">

                <h3 className="font-semibold dark:text-white">
                  {item.plan}
                </h3>

                <Crown size={18} className="text-yellow-500" />

              </div>


              <p className="text-sm text-gray-500 mt-2">
                Users : {item.users}
              </p>

              <p className="text-sm text-green-600">
                {item.revenue}
              </p>


            </div>

          ))}

        </div>

      </div>






      {/* Recent Members */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-[#E2E8F0] dark:border-[#1E293B]">

        <h2 className="text-lg font-semibold dark:text-white mb-5">
          Recent Members
        </h2>


        <div className="space-y-3">

          {data.recentMembers.map((member, index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b dark:border-gray-700 pb-3"
            >

              <span className="font-medium dark:text-white">
                {member.name}
              </span>


              <span className="text-gray-500">
                {member.plan}
              </span>


              <span className="text-green-600 flex gap-1">
                <CheckCircle size={16} />
                {member.status}
              </span>

            </div>

          ))}

        </div>

      </div>


    </div>
  );
};


export default Dashboard;
