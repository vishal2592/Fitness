import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserPlus, Search, Edit3, Trash2, ShieldCheck, Users, CheckCircle2,
  XCircle, Dumbbell, HeartPulse, Mail, Phone, X, Save,
} from "lucide-react";

import gymAdminUsers from "../Data/Gym/adminUserData";
import yogaAdminUsers from "../Data/Yoga/adminUserData";

const AdminUser = () => {
  const currentMode = useSelector((state) => state.mode.currentMode);
  const isGym = String(currentMode).toLowerCase() === "gym";
  const moduleName = isGym ? "Gym" : "Yoga";
  const moduleData = isGym ? gymAdminUsers : yogaAdminUsers;

  // Same dark theme for both Gym & Yoga
  const theme = {
    bg: "#111827",
    surface: "#1F2937",
    surfaceAlt: "#111827",
    input: "#111827",
    border: "#374151",
    text: "#F9FAFB",
    muted: "#9CA3AF",
    primary: "#2563EB",
    primaryHover: "#1D4ED8",
    primarySoft: "rgba(37,99,235,0.10)",
    primaryLight: "rgba(37,99,235,0.16)",
  };

  const getDefaultForm = () => ({
    name: "",
    email: "",
    phone: "",
    role: isGym ? "Gym Admin" : "Yoga Admin",
    status: "Active",
    image: "",
  });

  const [users, setUsers] = useState(() => [...moduleData]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState(getDefaultForm);

  useEffect(() => {
    setUsers([...moduleData]);
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
    setShowModal(false);
    setEditingUser(null);
    setFormData(getDefaultForm());
  }, [isGym]);

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(getDefaultForm());
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData(getDefaultForm());
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || (isGym ? "Gym Admin" : "Yoga Admin"),
      status: user.status || "Active",
      image: user.image || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData, module: moduleName } : user
        )
      );
      alert(`${moduleName} admin updated successfully!`);
    } else {
      setUsers((prev) => [
        { id: Date.now(), ...formData, module: moduleName, lastLogin: "Never" },
        ...prev,
      ]);
      alert(`${moduleName} admin added successfully!`);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${moduleName} admin?`)) return;
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase().trim();
    const matchesSearch =
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.phone?.toLowerCase().includes(value);
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const inactiveUsers = users.filter((user) => user.status === "Inactive").length;
  const adminUsers = users.filter(
    (user) => user.role?.includes("Admin") || user.role?.includes("Manager")
  ).length;

  const inputStyle = {
    backgroundColor: theme.input,
    borderColor: theme.border,
    color: theme.text,
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "A";

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
            {isGym ? <Dumbbell size={22} /> : <HeartPulse size={22} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Admin Users</h1>
            <p className="mt-1 text-sm" style={{ color: theme.muted }}>
              Manage {moduleName.toLowerCase()} administrators and staff accounts.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold" style={{ borderColor: theme.primary, backgroundColor: theme.primarySoft, color: theme.primary }}>
            {isGym ? <Dumbbell size={14} /> : <HeartPulse size={14} />}
            {moduleName} Module
          </div>

          <button type="button" onClick={handleAdd} className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90" style={{ backgroundColor: theme.primary }}>
            <UserPlus size={15} /> Add Admin
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          ["Total Users", totalUsers, Users, theme.primary],
          ["Active Users", activeUsers, CheckCircle2, "#22C55E"],
          ["Inactive Users", inactiveUsers, XCircle, "#EF4444"],
          ["Admin / Managers", adminUsers, ShieldCheck, theme.primary],
        ].map(([label, value, Icon, color]) => (
          <div key={label} className="rounded-xl border p-4 shadow-sm" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px]" style={{ color: theme.muted }}>{label}</p>
                <p className="mt-1 text-2xl font-bold" style={{ color: label === "Active Users" ? "#22C55E" : label === "Inactive Users" ? "#EF4444" : theme.text }}>
                  {value}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color }}>
                <Icon size={19} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border shadow-sm" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: theme.border }}>
          <div className="relative w-full lg:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${moduleName.toLowerCase()} admins...`}
              className="w-full rounded-lg border py-2.5 pl-9 pr-3 text-xs outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-lg border px-3 py-2.5 text-xs outline-none" style={inputStyle}>
              <option value="All">All Roles</option>
              <option value={isGym ? "Gym Admin" : "Yoga Admin"}>{moduleName} Admin</option>
              <option value={isGym ? "Gym Manager" : "Yoga Manager"}>{moduleName} Manager</option>
              <option value="Staff">Staff</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border px-3 py-2.5 text-xs outline-none" style={inputStyle}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: theme.border }}>
                {["Admin", "Contact", "Role", "Status", "Last Login", "Actions"].map((heading) => (
                  <th key={heading} className={`px-5 py-3 text-[10px] font-bold uppercase ${heading === "Actions" ? "text-right" : ""}`} style={{ color: theme.muted }}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b transition hover:bg-white/[0.02]" style={{ borderColor: theme.border }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full font-bold" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                          {user.image ? <img src={user.image} alt={user.name} className="h-full w-full object-cover" /> : getInitial(user.name)}
                        </div>
                        <div>
                          <p className="text-xs font-bold">{user.name}</p>
                          <p className="mt-0.5 text-[10px]" style={{ color: theme.muted }}>ID #{user.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-1 text-[10px]" style={{ color: theme.muted }}>
                        <div className="flex items-center gap-1.5"><Mail size={11} />{user.email}</div>
                        <div className="flex items-center gap-1.5"><Phone size={11} />{user.phone}</div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button type="button" onClick={() => handleToggleStatus(user.id)} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                        {user.status === "Active" ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                        {user.status}
                      </button>
                    </td>

                    <td className="px-5 py-4 text-[10px]" style={{ color: theme.muted }}>{user.lastLogin}</td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => handleEdit(user)} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                          <Edit3 size={14} />
                        </button>
                        <button type="button" onClick={() => handleDelete(user.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <Users size={30} className="mx-auto mb-3" style={{ color: theme.muted }} />
                    <p className="text-sm font-semibold">No admin users found</p>
                    <p className="mt-1 text-[11px]" style={{ color: theme.muted }}>Try changing your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y md:hidden">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="p-4" style={{ borderColor: theme.border }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full font-bold" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                      {user.image ? <img src={user.image} alt={user.name} className="h-full w-full object-cover" /> : getInitial(user.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold">{user.name}</p>
                      <p className="truncate text-[10px]" style={{ color: theme.muted }}>{user.email}</p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full px-2 py-1 text-[9px] font-bold" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                    {user.role}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border p-3" style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}>
                    <p className="text-[9px]" style={{ color: theme.muted }}>Phone</p>
                    <p className="mt-1 text-[10px] font-semibold">{user.phone}</p>
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}>
                    <p className="text-[9px]" style={{ color: theme.muted }}>Last Login</p>
                    <p className="mt-1 text-[10px] font-semibold">{user.lastLogin}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button type="button" onClick={() => handleToggleStatus(user.id)} className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                    {user.status}
                  </button>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(user)} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                      <Edit3 size={14} />
                    </button>
                    <button type="button" onClick={() => handleDelete(user.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-12 text-center">
              <Users size={30} className="mx-auto mb-3" style={{ color: theme.muted }} />
              <p className="text-sm font-semibold">No admin users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border shadow-2xl" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            <div className="flex items-center justify-between border-b p-5" style={{ borderColor: theme.border }}>
              <div>
                <h2 className="text-base font-bold">{editingUser ? "Edit Admin User" : "Add Admin User"}</h2>
                <p className="mt-1 text-[11px]" style={{ color: theme.muted }}>
                  {editingUser ? `Update ${moduleName.toLowerCase()} administrator details.` : `Create a new ${moduleName.toLowerCase()} administrator account.`}
                </p>
              </div>
              <button type="button" onClick={closeModal} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color: theme.muted }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" className="w-full rounded-lg border px-4 py-3 text-xs outline-none" style={inputStyle} />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@example.com" className="w-full rounded-lg border px-4 py-3 text-xs outline-none" style={inputStyle} />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Phone *</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full rounded-lg border px-4 py-3 text-xs outline-none" style={inputStyle} />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 text-xs outline-none" style={inputStyle}>
                    <option value={isGym ? "Gym Admin" : "Yoga Admin"}>{moduleName} Admin</option>
                    <option value={isGym ? "Gym Manager" : "Yoga Manager"}>{moduleName} Manager</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 text-xs outline-none" style={inputStyle}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: theme.border, backgroundColor: theme.primarySoft }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primary, color: "#fff" }}>
                  {isGym ? <Dumbbell size={15} /> : <HeartPulse size={15} />}
                </div>
                <div>
                  <p className="text-xs font-bold">{moduleName} Module</p>
                  <p className="text-[10px]" style={{ color: theme.muted }}>
                    This admin will have access to the {moduleName.toLowerCase()} module.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3 border-t pt-5" style={{ borderColor: theme.border }}>
                <button type="button" onClick={closeModal} className="rounded-lg border px-4 py-2.5 text-xs font-semibold" style={{ borderColor: theme.border, color: theme.muted }}>
                  Cancel
                </button>

                <button type="submit" className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-white hover:opacity-90" style={{ backgroundColor: theme.primary }}>
                  <Save size={14} />
                  {editingUser ? "Save Changes" : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;