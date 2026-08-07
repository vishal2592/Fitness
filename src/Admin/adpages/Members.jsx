import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Award,
  Mail,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import gymMembers from "../Data/Gym/memberData.js";
import yogaMembers from "../Data/Yoga/memberData.js";


const Members = () => {

  const navigate = useNavigate();

  const currentMode = useSelector(
    (state) => state.mode.currentMode
  );
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(
      currentMode === "gym"
        ? gymMembers
        : yogaMembers
    );
  }, [currentMode]);

  // ─── State ──────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const itemsPerPage = 5;

  // ─── Filters ────────────────────────────────────────────────
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesPlan = planFilter === "All" || member.plan === planFilter;
    const matchesStatus = statusFilter === "All" || member.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // ─── Pagination ─────────────────────────────────────────────
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ─── Handlers ──────────────────────────────────────────────
  const handleDelete = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setMembers(members.filter((m) => m.id !== selectedMember.id));
    setShowDeleteModal(false);
    setSelectedMember(null);
  };

  // ─── Summary Stats ──────────────────────────────────────────
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "Active").length;
  const expiredMembers = members.filter((m) => m.status === "Expired").length;
  const newThisMonth = members.filter((m) => {
    const join = new Date(m.joinDate);
    const now = new Date();
    return join.getMonth() === now.getMonth() && join.getFullYear() === now.getFullYear();
  }).length;

  const summaryCards = [
    { title: "Total Members", value: totalMembers, icon: <Users size={24} />, color: "bg-blue-500" },
    { title: "Active Members", value: activeMembers, icon: <UserCheck size={24} />, color: "bg-green-500" },
    { title: "Expired Memberships", value: expiredMembers, icon: <UserX size={24} />, color: "bg-red-500" },
    { title: "New This Month", value: newThisMonth, icon: <UserPlus size={24} />, color: "bg-purple-500" },
  ];

  const plans = ["All", ...new Set(members.map((m) => m.plan))];
  const statuses = ["All", "Active", "Expired"];

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full space-y-6 p-3 sm:p-4 md:p-6 dark:bg-darkTheme-bg">
      {/* ─── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-darkTheme-text">
            {currentMode === "gym" ? "Gym Members" : "Yoga Members"}
          </h1>

          <p className="text-gray-500 dark:text-darkTheme-muted mt-1">
            Manage all {currentMode} members
          </p>
        </div>
        <button onClick={() => navigate("/admin/members/add")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-600 sm:w-auto">
          <UserPlus size={20} />
          <span className="font-medium">
            Add {currentMode === "gym" ? "Gym" : "Yoga"} Member
          </span>
        </button>
      </div>

      {/* ─── Summary Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-5 border border-gray-100 dark:border-darkTheme-border hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-darkTheme-muted">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Search & Filters ────────────────────────────────── */}
      <div className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-4 md:p-5 border border-gray-100 dark:border-darkTheme-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted" />
            <input
              type="text"
              placeholder="Search members by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-darkTheme-border/30 border border-gray-200 dark:border-darkTheme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-darkTheme-text placeholder-gray-400 dark:placeholder-darkTheme-muted"
            />
          </div>
          <div className="relative md:w-48">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted" />
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-darkTheme-border/30 border border-gray-200 dark:border-darkTheme-border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-darkTheme-text"
            >
              {plans.map((plan) => (
                <option key={plan} value={plan}>{plan}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted pointer-events-none" />
          </div>
          <div className="relative md:w-48">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-darkTheme-border/30 border border-gray-200 dark:border-darkTheme-border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-darkTheme-text"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ─── Members Table (Desktop) ────────────────────────── */}
      <div className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">
        <div className="w-full max-w-full overflow-x-auto overscroll-x-contain [touch-action:pan-x]">
          <table className="min-w-[940px] w-full text-sm">
            <thead className="bg-gray-50 dark:bg-darkTheme-border/30">
              <tr className="text-left text-gray-500 dark:text-darkTheme-muted">
                <th className="py-3 px-4 font-semibold">Member</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">Plan</th>
                <th className="py-3 px-4 font-semibold">Join Date</th>
                <th className="py-3 px-4 font-semibold">Expiry</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.length > 0 ? (
                paginatedMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-gray-100 dark:border-darkTheme-border last:border-none hover:bg-gray-50 dark:hover:bg-darkTheme-border/20 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={member.image} alt={member.name} className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-darkTheme-border" />
                        <span className="font-medium text-gray-800 dark:text-darkTheme-text">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-darkTheme-muted">
                      {member.phone}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium">
                        <Award size={12} />
                        {member.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-darkTheme-muted">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {member.joinDate}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-darkTheme-muted">
                      {member.expiryDate}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${member.status === "Active"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 transition">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500 dark:text-darkTheme-muted">
                    No members found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-100 dark:border-darkTheme-border">
            <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-darkTheme-border disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition ${currentPage === i + 1
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-darkTheme-border text-gray-600 dark:text-darkTheme-muted"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-darkTheme-border disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Members Cards (Mobile) ─────────────────────────── */}
      <div className="hidden">
        {paginatedMembers.length > 0 ? (
          paginatedMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-darkTheme-card rounded-2xl shadow-sm p-4 border border-gray-100 dark:border-darkTheme-border hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-darkTheme-border" />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-darkTheme-muted">
                      <Phone size={14} />
                      {member.phone}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${member.status === "Active"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    }`}
                >
                  {member.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-darkTheme-muted">
                  <Award size={14} className="text-blue-500" />
                  <span className="font-medium text-gray-800 dark:text-darkTheme-text">{member.plan}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-darkTheme-muted">
                  <Calendar size={14} className="text-gray-400" />
                  Join: {member.joinDate}
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-darkTheme-muted col-span-2">
                  <Calendar size={14} className="text-gray-400" />
                  Expiry: {member.expiryDate}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-darkTheme-border">
                <button className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition">
                  <Eye size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 transition">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member)}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-darkTheme-muted">
            No members found.
          </div>
        )}

        {/* Pagination for mobile */}
        {filteredMembers.length > 0 && (
          <div className="flex items-center justify-between gap-4 px-2 py-3">
            <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-darkTheme-border disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-darkTheme-border disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Delete Confirmation Modal ──────────────────────── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-darkTheme-card rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-darkTheme-border">
            <h3 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">Confirm Delete</h3>
            <p className="text-gray-600 dark:text-darkTheme-muted mt-2">
              Are you sure you want to delete member <strong>{selectedMember?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-darkTheme-border hover:bg-gray-200 dark:hover:bg-darkTheme-border/80 transition text-gray-700 dark:text-darkTheme-text"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition shadow-md shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
