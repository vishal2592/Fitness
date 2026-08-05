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
  PlusCircle,
  Eye,
  BarChart3,
  PieChart,
} from "lucide-react";

const Dashboard = () => {
  // Stats data
  const stats = [
    { title: "Total Members", value: "1,248", icon: <Users size={28} />, color: "bg-blue-500" },
    { title: "Active Members", value: "986", icon: <UserCheck size={28} />, color: "bg-green-500" },
    { title: "Trainers", value: "18", icon: <Dumbbell size={28} />, color: "bg-orange-500" },
    { title: "Monthly Revenue", value: "₹4.2L", icon: <CreditCard size={28} />, color: "bg-purple-500" },
  ];

  // Membership growth data (Jan–Dec)
  const monthlyData = [
    { month: "Jan", new: 45 },
    { month: "Feb", new: 52 },
    { month: "Mar", new: 68 },
    { month: "Apr", new: 74 },
    { month: "May", new: 90 },
    { month: "Jun", new: 85 },
    { month: "Jul", new: 78 },
    { month: "Aug", new: 95 },
    { month: "Sep", new: 102 },
    { month: "Oct", new: 110 },
    { month: "Nov", new: 98 },
    { month: "Dec", new: 120 },
  ];
  const maxNew = Math.max(...monthlyData.map(d => d.new));

  // Class attendance
  const classAttendance = [
    { name: "Yoga", percentage: 85 },
    { name: "HIIT", percentage: 92 },
    { name: "Strength", percentage: 78 },
    { name: "Zumba", percentage: 65 },
    { name: "Pilates", percentage: 70 },
  ];

  // Upcoming classes
  const upcomingClasses = [
    { time: "6:00 AM", name: "Morning Yoga", trainer: "Ritu", capacity: "20/25" },
    { time: "8:00 AM", name: "HIIT Blast", trainer: "Amit", capacity: "18/20" },
    { time: "5:30 PM", name: "Strength & Conditioning", trainer: "Vikram", capacity: "12/15" },
    { time: "7:00 PM", name: "Zumba Night", trainer: "Neha", capacity: "22/30" },
  ];

  // Recent activities
  const recentActivities = [
    { type: "checkin", name: "Rahul Sharma", time: "5 min ago", detail: "checked in" },
    { type: "signup", name: "Priya Singh", time: "20 min ago", detail: "signed up for annual plan" },
    { type: "payment", name: "Aman Verma", time: "1 hour ago", detail: "made payment of ₹2,500" },
    { type: "checkin", name: "Neha Gupta", time: "2 hours ago", detail: "checked in" },
    { type: "class", name: "Yoga", time: "3 hours ago", detail: "class completed with 18 attendees" },
  ];

  return (
    // ✅ Added dark:bg-darkTheme-bg for dark mode background on the whole Dashboard
    <div className="space-y-4 md:space-y-8 dark:bg-darkTheme-bg dark:text-darkTheme-text p-2 md:p-6 rounded-2xl">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-darkTheme-text">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 dark:text-darkTheme-muted mt-1">
          Here's what's happening in your gym today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-darkTheme-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-darkTheme-muted">
                  {item.title}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-darkTheme-text mt-1.5">
                  {item.value}
                </h2>
              </div>
              <div
                className={`${item.color} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white shadow-lg`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Membership Growth Chart */}
        <div className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-5 md:p-6 border border-gray-100 dark:border-darkTheme-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-darkTheme-text">
              Membership Growth
            </h2>
            <BarChart3 className="text-blue-500" size={20} />
          </div>
          <div className="space-y-2">
            {monthlyData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="w-10 text-gray-600 dark:text-darkTheme-muted font-medium">
                  {item.month}
                </span>
                <div className="flex-1 h-5 bg-gray-200 dark:bg-darkTheme-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(item.new / maxNew) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right text-gray-700 dark:text-darkTheme-text font-medium">
                  {item.new}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Class Attendance */}
        <div className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-5 md:p-6 border border-gray-100 dark:border-darkTheme-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-darkTheme-text">
              Class Attendance
            </h2>
            <PieChart className="text-purple-500" size={20} />
          </div>
          <div className="space-y-4">
            {classAttendance.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-darkTheme-text">{item.name}</span>
                  <span className="text-gray-600 dark:text-darkTheme-muted font-medium">{item.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-darkTheme-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.percentage >= 80
                      ? "bg-green-500"
                      : item.percentage >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                      }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Classes & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-5 md:p-6 border border-gray-100 dark:border-darkTheme-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-darkTheme-text">
              Upcoming Classes
            </h2>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((cls, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b dark:border-darkTheme-border pb-3 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {cls.time.split(" ")[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-darkTheme-text">{cls.name}</p>
                    <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                      {cls.trainer} • {cls.capacity}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-darkTheme-muted bg-gray-100 dark:bg-darkTheme-border px-2 py-1 rounded-full">
                  {cls.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-5 md:p-6 border border-gray-100 dark:border-darkTheme-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-darkTheme-text">
              Recent Activity
            </h2>
            <Activity className="text-green-500" size={20} />
          </div>
          <div className="space-y-4">
            {recentActivities.map((act, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 border-b dark:border-darkTheme-border pb-3 last:border-none"
              >
                <div
                  className={`w-2.5 h-2.5 mt-2 rounded-full ${act.type === "checkin"
                    ? "bg-green-500"
                    : act.type === "signup"
                      ? "bg-blue-500"
                      : act.type === "payment"
                        ? "bg-purple-500"
                        : "bg-yellow-500"
                    }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-darkTheme-text">
                    <span className="font-semibold text-gray-800 dark:text-darkTheme-text">
                      {act.name}
                    </span>
                    {" " + act.detail}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-darkTheme-muted mt-0.5">
                    {act.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100 dark:border-darkTheme-border">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-darkTheme-text mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20">
            <PlusCircle size={18} />
            <span className="text-sm md:text-base">Add Member</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 shadow-md shadow-green-500/20">
            <Calendar size={18} />
            <span className="text-sm md:text-base">Schedule Class</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 shadow-md shadow-purple-500/20">
            <Eye size={18} />
            <span className="text-sm md:text-base">View Reports</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20">
            <TrendingUp size={18} />
            <span className="text-sm md:text-base">Track Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;