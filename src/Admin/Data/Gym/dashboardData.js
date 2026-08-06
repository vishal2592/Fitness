// dashboardData.js

const gymDashboardData = {
    moduleName: "Gym Fitness",

    stats: [
        {
            title: "Total Members",
            value: "2,845",
            growth: "+12.5%",
            icon: "Users",
            color: "blue"
        },
        {
            title: "Active Memberships",
            value: "2,210",
            growth: "+8.2%",
            icon: "UserCheck",
            color: "green"
        },
        {
            title: "Monthly Revenue",
            value: "₹8.45L",
            growth: "+18%",
            icon: "CreditCard",
            color: "purple"
        },
        {
            title: "Today's Attendance",
            value: "86%",
            growth: "+5.4%",
            icon: "Activity",
            color: "orange"
        }
    ],

    attendance: [
        {
            name: "Monday",
            value: 82,
            members: 420
        },
        {
            name: "Tuesday",
            value: 88,
            members: 510
        },
        {
            name: "Wednesday",
            value: 91,
            members: 560
        },
        {
            name: "Thursday",
            value: 94,
            members: 620
        },
        {
            name: "Friday",
            value: 96,
            members: 680
        },
        {
            name: "Saturday",
            value: 98,
            members: 740
        }
    ],

    popularPrograms: [
        {
            name: "Strength Training",
            members: 620,
            sessions: 120,
            progress: "94%"
        },
        {
            name: "HIIT Workout",
            members: 480,
            sessions: 85,
            progress: "88%"
        },
        {
            name: "CrossFit Training",
            members: 360,
            sessions: 65,
            progress: "82%"
        },
        {
            name: "Weight Loss Program",
            members: 540,
            sessions: 95,
            progress: "90%"
        },
        {
            name: "Personal Training",
            members: 280,
            sessions: 150,
            progress: "96%"
        }
    ],

    trainers: [
        {
            name: "Rahul Sharma",
            speciality: "Strength Coach",
            clients: 42,
            rating: 4.9,
            attendance: "96%",
            experience: "8 Years"
        },
        {
            name: "Amit Verma",
            speciality: "CrossFit Trainer",
            clients: 35,
            rating: 4.8,
            attendance: "92%",
            experience: "6 Years"
        },
        {
            name: "Vikram Singh",
            speciality: "Body Transformation Coach",
            clients: 55,
            rating: 4.9,
            attendance: "97%",
            experience: "10 Years"
        }
    ],

    memberships: [
        {
            plan: "Premium Fitness",
            users: 820,
            revenue: "₹4.2L",
            duration: "12 Months"
        },
        {
            plan: "Basic Membership",
            users: 950,
            revenue: "₹2.1L",
            duration: "3 Months"
        },
        {
            plan: "Elite Personal Training",
            users: 220,
            revenue: "₹2.14L",
            duration: "6 Months"
        },
        {
            plan: "Transformation Program",
            users: 340,
            revenue: "₹1.8L",
            duration: "4 Months"
        }
    ],

    revenueAnalytics: [
        {
            month: "January",
            revenue: 620000
        },
        {
            month: "February",
            revenue: 710000
        },
        {
            month: "March",
            revenue: 760000
        },
        {
            month: "April",
            revenue: 845000
        },
        {
            month: "May",
            revenue: 920000
        }
    ],

    upcomingClasses: [
        {
            title: "Morning Strength Training",
            instructor: "Rahul Sharma",
            time: "6:00 AM",
            members: 45
        },
        {
            title: "HIIT Cardio Session",
            instructor: "Amit Verma",
            time: "7:30 AM",
            members: 38
        },
        {
            title: "Evening Weight Loss Batch",
            instructor: "Vikram Singh",
            time: "6:30 PM",
            members: 60
        }
    ],

    equipment: [
        {
            name: "Treadmills",
            quantity: 15,
            status: "Excellent"
        },
        {
            name: "Weight Machines",
            quantity: 28,
            status: "Maintenance Required"
        },
        {
            name: "Dumbbell Sets",
            quantity: 45,
            status: "Good"
        },
        {
            name: "Cycling Machines",
            quantity: 12,
            status: "Excellent"
        }
    ],

    personalTraining: [
        {
            trainer: "Vikram Singh",
            sessions: 85,
            clients: 55
        },
        {
            trainer: "Rahul Sharma",
            sessions: 72,
            clients: 42
        },
        {
            trainer: "Amit Verma",
            sessions: 60,
            clients: 35
        }
    ],

    recentMembers: [
        {
            name: "Arjun Mehta",
            plan: "Premium Fitness",
            joined: "Today"
        },
        {
            name: "Karan Singh",
            plan: "Elite PT",
            joined: "Yesterday"
        },
        {
            name: "Riya Sharma",
            plan: "Transformation Program",
            joined: "2 Days Ago"
        }
    ],

    payments: [
        {
            member: "Aman Gupta",
            plan: "Premium Fitness",
            amount: "₹25,000",
            status: "Paid"
        },
        {
            member: "Neha Kapoor",
            plan: "Elite PT",
            amount: "₹45,000",
            status: "Paid"
        },
        {
            member: "Rahul Mehta",
            plan: "Basic Membership",
            amount: "₹5,000",
            status: "Pending"
        }
    ],

    activities: [
        "15 new members joined today",
        "12 personal training sessions completed",
        "Premium plans renewed by 8 members",
        "New HIIT batch started at 7 PM",
        "Trainer Vikram completed 20 transformation sessions"
    ],

    notifications: [
        "18 memberships expiring this week",
        "2 gym equipment require maintenance",
        "New fitness challenge launched",
        "Monthly revenue target achieved"
    ]
};


export default gymDashboardData;