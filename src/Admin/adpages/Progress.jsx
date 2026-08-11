
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Search, Plus, Edit3, Trash2, Users, TrendingUp, Activity,
  CheckCircle2, Dumbbell, HeartPulse, X, Save,
} from "lucide-react";
import gymProgressTrackingData from "../Data/Gym/progressTrackingData";
import yogaProgressTrackingData from "../Data/Yoga/progressTrackingData";

const Progress = () => {
  const currentMode = useSelector((state) => state.mode.currentMode);
  const isGym = currentMode === "gym";
  const moduleName = isGym ? "Gym" : "Yoga";
  const moduleData = isGym ? gymProgressTrackingData : yogaProgressTrackingData;

  const [data, setData] = useState(moduleData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getInitialForm = () =>
    isGym
      ? {
          name: "", email: "", memberId: "", weightStart: "", weightCurrent: "",
          height: "", bmi: "", bodyFat: "", chest: "", waist: "", arms: "",
          workoutAttendance: "", progress: "", status: "Good",
        }
      : {
          name: "", email: "", memberId: "", flexibility: "Good", balance: "Good",
          mobility: "Good", yogaSessions: "", attendance: "", meditation: "",
          breathingPractice: "", stressLevel: "Low", progress: "", status: "Good",
        };

  const [formData, setFormData] = useState(getInitialForm());

  useEffect(() => {
    setData(isGym ? gymProgressTrackingData : yogaProgressTrackingData);
    setSearch("");
    setShowModal(false);
    setFormData(getInitialForm());
  }, [isGym]);

  const theme = {
    bg: "#111827",
    surface: "#1F2937",
    surfaceAlt: "#111827",
    input: "#111827",
    border: "#374151",
    text: "#F9FAFB",
    muted: "#9CA3AF",
    primary: "#2563EB",
    primarySoft: "rgba(37,99,235,0.10)",
  };

  const filteredData = data.filter((member) =>
    `${member.name} ${member.email} ${member.memberId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalMembers = data.length;
  const excellentMembers = data.filter((item) => item.status === "Excellent").length;
  const goodMembers = data.filter((item) => item.status === "Good").length;
  const avgProgress = data.length
    ? Math.round(data.reduce((sum, item) => sum + Number(item.progress || 0), 0) / data.length)
    : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(getInitialForm());
  };

  const handleAddProgress = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.memberId.trim()) {
      alert("Please fill member name and member ID.");
      return;
    }

    const newProgress = {
      id: Date.now(),
      ...formData,
      progress: Number(formData.progress || 0),
      lastUpdated: "10 Aug 2026",
    };

    setData((prev) => [newProgress, ...prev]);
    closeModal();
    alert(`${moduleName} progress added successfully!`);
  };

  const handleDelete = (id) => {
    if (!window.confirm(`Delete this ${moduleName} progress record?`)) return;
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const inputClass = "w-full rounded-lg border px-3 py-2.5 text-xs outline-none";
  const inputStyle = {
    backgroundColor: theme.input,
    borderColor: theme.border,
    color: theme.text,
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
            {isGym ? <Dumbbell size={22} /> : <HeartPulse size={22} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Progress Tracking</h1>
            <p className="mt-1 text-sm" style={{ color: theme.muted }}>
              Track {moduleName.toLowerCase()} member progress and performance.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold" style={{ borderColor: theme.primary, backgroundColor: theme.primarySoft, color: theme.primary }}>
            {isGym ? <Dumbbell size={14} /> : <HeartPulse size={14} />}
            {moduleName} Module
          </span>

          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-white hover:opacity-90" style={{ backgroundColor: theme.primary }}>
            <Plus size={15} /> Add Progress
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          ["Total Members", totalMembers, Users, theme.primary],
          ["Excellent", excellentMembers, CheckCircle2, "#22C55E"],
          ["Good", goodMembers, Activity, "#F59E0B"],
          ["Avg Progress", `${avgProgress}%`, TrendingUp, "#A855F7"],
        ].map(([title, value, Icon, color]) => (
          <div key={title} className="rounded-xl border p-4 shadow-sm" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px]" style={{ color: theme.muted }}>{title}</p>
                <p className="mt-1 text-2xl font-bold">{value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}15`, color }}>
                <Icon size={19} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border shadow-sm" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between" style={{ borderColor: theme.border }}>
          <div className="relative w-full md:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${moduleName.toLowerCase()} members...`} className={`${inputClass} pl-9`} style={inputStyle} />
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: theme.border }}>
                {["Member", isGym ? "Weight" : "Sessions", isGym ? "BMI" : "Flexibility", "Progress", "Status", "Updated", "Actions"].map((heading) => (
                  <th key={heading} className="px-5 py-3 text-[10px] font-bold uppercase" style={{ color: theme.muted }}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((member) => (
                <tr key={member.id} className="border-b hover:bg-white/[0.02]" style={{ borderColor: theme.border }}>
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold">{member.name}</p>
                    <p className="mt-0.5 text-[10px]" style={{ color: theme.muted }}>{member.memberId}</p>
                  </td>
                  <td className="px-5 py-4 text-xs font-semibold">{isGym ? `${member.weightCurrent} kg` : member.yogaSessions}</td>
                  <td className="px-5 py-4 text-xs font-semibold">{isGym ? member.bmi : member.flexibility}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-700">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${member.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold">{member.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${member.status === "Excellent" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[10px]" style={{ color: theme.muted }}>{member.lastUpdated}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <Users size={30} className="mx-auto mb-3" style={{ color: theme.muted }} />
                    <p className="text-sm font-semibold">No progress records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y md:hidden">
          {filteredData.map((member) => (
            <div key={member.id} className="p-4" style={{ borderColor: theme.border }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold">{member.name}</p>
                  <p className="text-[10px]" style={{ color: theme.muted }}>{member.memberId}</p>
                </div>
                <span className="rounded-full bg-green-500/10 px-2 py-1 text-[9px] font-bold text-green-500">{member.status}</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg border p-3" style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}>
                  <p className="text-[9px]" style={{ color: theme.muted }}>{isGym ? "Weight" : "Sessions"}</p>
                  <p className="mt-1 text-xs font-bold">{isGym ? `${member.weightCurrent} kg` : member.yogaSessions}</p>
                </div>
                <div className="rounded-lg border p-3" style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}>
                  <p className="text-[9px]" style={{ color: theme.muted }}>{isGym ? "BMI" : "Flexibility"}</p>
                  <p className="mt-1 text-xs font-bold">{isGym ? member.bmi : member.flexibility}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px]" style={{ color: theme.muted }}>
                  Progress: <b>{member.progress}%</b>
                </span>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Progress Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border shadow-2xl" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: theme.primarySoft, color: theme.primary }}>
                  {isGym ? <Dumbbell size={19} /> : <HeartPulse size={19} />}
                </div>
                <div>
                  <h2 className="text-base font-bold">Add {moduleName} Progress</h2>
                  <p className="mt-1 text-[10px]" style={{ color: theme.muted }}>
                    Add member progress and performance details.
                  </p>
                </div>
              </div>

              <button onClick={closeModal} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: theme.primarySoft, color: theme.muted }}>
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddProgress} className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold">Member Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter member name" className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Member ID *</label>
                  <input name="memberId" value={formData.memberId} onChange={handleChange} placeholder={`${isGym ? "GYM" : "YOG"}001`} className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="member@example.com" className={inputClass} style={inputStyle} />
                </div>

                {isGym ? (
                  <>
                    <div>
                      <label className="mb-2 block text-xs font-semibold">Starting Weight</label>
                      <input type="number" name="weightStart" value={formData.weightStart} onChange={handleChange} placeholder="82 kg" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Current Weight</label>
                      <input type="number" name="weightCurrent" value={formData.weightCurrent} onChange={handleChange} placeholder="76 kg" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Height</label>
                      <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="178 cm" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">BMI</label>
                      <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} placeholder="24.0" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Body Fat %</label>
                      <input type="number" name="bodyFat" value={formData.bodyFat} onChange={handleChange} placeholder="18" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Chest</label>
                      <input name="chest" value={formData.chest} onChange={handleChange} placeholder='41"' className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Waist</label>
                      <input name="waist" value={formData.waist} onChange={handleChange} placeholder='33"' className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Arms</label>
                      <input name="arms" value={formData.arms} onChange={handleChange} placeholder='15"' className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Workout Attendance %</label>
                      <input type="number" name="workoutAttendance" value={formData.workoutAttendance} onChange={handleChange} placeholder="92" className={inputClass} style={inputStyle} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="mb-2 block text-xs font-semibold">Flexibility</label>
                      <select name="flexibility" value={formData.flexibility} onChange={handleChange} className={inputClass} style={inputStyle}>
                        <option>Excellent</option><option>Very Good</option><option>Good</option><option>Needs Improvement</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Balance</label>
                      <select name="balance" value={formData.balance} onChange={handleChange} className={inputClass} style={inputStyle}>
                        <option>Excellent</option><option>Very Good</option><option>Good</option><option>Needs Improvement</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Mobility</label>
                      <select name="mobility" value={formData.mobility} onChange={handleChange} className={inputClass} style={inputStyle}>
                        <option>Excellent</option><option>Very Good</option><option>Good</option><option>Needs Improvement</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Yoga Sessions</label>
                      <input type="number" name="yogaSessions" value={formData.yogaSessions} onChange={handleChange} placeholder="24" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Attendance %</label>
                      <input type="number" name="attendance" value={formData.attendance} onChange={handleChange} placeholder="92" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Meditation (min/day)</label>
                      <input type="number" name="meditation" value={formData.meditation} onChange={handleChange} placeholder="15" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Breathing (min/day)</label>
                      <input type="number" name="breathingPractice" value={formData.breathingPractice} onChange={handleChange} placeholder="10" className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">Stress Level</label>
                      <select name="stressLevel" value={formData.stressLevel} onChange={handleChange} className={inputClass} style={inputStyle}>
                        <option>Low</option><option>Medium</option><option>High</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-2 block text-xs font-semibold">Progress %</label>
                  <input type="number" min="0" max="100" name="progress" value={formData.progress} onChange={handleChange} placeholder="20" className={inputClass} style={inputStyle} />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className={inputClass} style={inputStyle}>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Needs Attention</option>
                  </select>
                </div>
              </div>

              {/* Module Info */}
              <div className="mt-4 flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: theme.border, backgroundColor: theme.primarySoft }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ backgroundColor: theme.primary }}>
                  {isGym ? <Dumbbell size={15} /> : <HeartPulse size={15} />}
                </div>
                <div>
                  <p className="text-xs font-bold">{moduleName} Module</p>
                  <p className="text-[10px]" style={{ color: theme.muted }}>
                    This progress record belongs to the {moduleName.toLowerCase()} module.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-end gap-3 border-t pt-5" style={{ borderColor: theme.border }}>
                <button type="button" onClick={closeModal} className="rounded-lg border px-4 py-2.5 text-xs font-semibold" style={{ borderColor: theme.border, color: theme.muted }}>
                  Cancel
                </button>

                <button type="submit" className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-white hover:opacity-90" style={{ backgroundColor: theme.primary }}>
                  <Save size={14} /> Add Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
