import React, { useMemo, useState } from "react";
import { Plus, Search, MoreVertical, Pencil, Trash2, Eye, X, CalendarDays, Clock3, UserRound, Users, Video, MapPin } from "lucide-react";
import { useSelector } from "react-redux";

import { useEffect } from "react";

import gymClassData from "../Data/Gym/classesData";
import yogaClassData from "../Data/Yoga/classesData";
const Classes = () => {

    const currentMode = useSelector((state) => state.mode.currentMode);
    useEffect(() => {
        setClassList(
            currentMode === "gym"
                ? gymClassData
                : yogaClassData
        );
    }, [currentMode]);
    const classes = currentMode === "gym" ? gymClassData : yogaClassData;
    const categories = ["Strength Training", "HIIT & Cardio", "Yoga & Flexibility", "Zumba", "Pilates", "Weight Loss"];
    const trainers = ["Alex Johnson", "Mike Wilson", "Sarah Miller", "Emma Davis"];
    const emptyForm = { name: "", category: "", trainer: "", date: "", time: "", duration: "", capacity: "", type: "Live", location: "Online", description: "" };
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const [modal, setModal] = useState(null);
    const [selected, setSelected] = useState(null);
    const [menu, setMenu] = useState(null);
    const [classList, setClassList] = useState(classes);

    const filtered = useMemo(() => classList.filter(c =>
        (c.name + c.category + c.trainer).toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || c.category === category) &&
        (status === "All" || c.status === status)
    ), [classList, search, category, status]);

    const submit = e => {
        e.preventDefault();
        if (!form.name || !form.category || !form.date || !form.time) return;
        const data = { ...form, duration: Number(form.duration), capacity: Number(form.capacity) };
        if (selected) {
            setClassList(prev => prev.map(c => c.id === selected.id ? { ...c, ...data } : c));
        } else {
            setClassList(prev => [{ ...data, id: Date.now(), enrolled: 0, status: "Scheduled" }, ...prev]);
        }
        setModal(null);
        setSelected(null);
        setForm(emptyForm);
    };

    const edit = c => { setSelected(c); setForm(c); setModal("form"); setMenu(null); };
    const remove = id => { if (window.confirm("Delete this class?")) setClassList(prev => prev.filter(c => c.id !== id)); setMenu(null); };

    const stats = [
        ["Total Classes", classList.length, CalendarDays, "blue"],
        ["Scheduled", classList.filter(c => c.status === "Scheduled").length, CalendarDays, "green"],
        ["Live Classes", classList.filter(c => c.type === "Live").length, Video, "purple"],
        ["Total Enrolled", classList.reduce((a, c) => a + c.enrolled, 0), Users, "orange"],
    ];

    return (
        <div className="min-h-screen space-y-5 p-4 md:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text">Classes</h1>
                    <p className="text-sm text-gray-500 dark:text-darkTheme-muted">Schedule and manage live fitness classes</p>
                </div>
                <button onClick={() => { setSelected(null); setForm(emptyForm); setModal("form"); }} className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
                    <Plus size={18} /> Create Class
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {stats.map(([label, value, Icon, color]) => (
                    <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">{label}</p>
                                <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">{value}</h3>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${color}-500 text-white`}>
                                <Icon size={19} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row dark:border-darkTheme-border dark:bg-darkTheme-card">
                <div className="relative flex-1">
                    <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search classes..." className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text" />
                </div>
                <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text">
                    <option>All</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text">
                    <option>All</option>
                    <option>Scheduled</option>
                    <option>Full</option>
                </select>
            </div>
            <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block dark:border-darkTheme-border dark:bg-darkTheme-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-darkTheme-border/30">
                            <tr className="text-left text-gray-700 dark:text-darkTheme-text">
                                {["Class", "Trainer", "Date & Time", "Duration", "Members", "Type", "Status", "Action"].map(h => <th key={h} className="px-4 py-4 font-semibold">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id} className="border-b border-gray-100 last:border-0 dark:border-darkTheme-border">
                                    <td className="px-4 py-4">
                                        <p className="font-semibold text-gray-800 dark:text-darkTheme-text">{c.name}</p>
                                        <p className="text-xs text-gray-500">{c.category}</p>
                                    </td>
                                    <td className="px-4 py-4 text-white">{c.trainer}</td>
                                    <td className="px-4 py-4 text-white">{c.date}<br /><span className="text-xs text-gray-500">{c.time}</span></td>
                                    <td className="px-4 py-4 text-white">{c.duration} min</td>
                                    <td className="px-4 py-4 text-white">{c.enrolled}/{c.capacity}</td>
                                    <td className="px-4 py-4 text-white"><span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700">{c.type}</span></td>
                                    <td className="px-4 py-4 text-white"><span className="rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-700">{c.status}</span></td>
                                    <td className="relative px-4 py-4 text-center">
                                        <button onClick={() => setMenu(menu === c.id ? null : c.id)}><MoreVertical size={18} /></button>
                                        {menu === c.id && (
                                            <div className="absolute right-4 top-12 z-20 w-32 rounded-xl border bg-white p-1 shadow-xl dark:border-darkTheme-border dark:bg-darkTheme-card">
                                                <button onClick={() => { setSelected(c); setModal("view"); setMenu(null); }} className="flex w-full gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"><Eye size={15} /> View</button>
                                                <button onClick={() => edit(c)} className="flex w-full gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"><Pencil size={15} /> Edit</button>
                                                <button onClick={() => remove(c.id)} className="flex w-full gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 size={15} /> Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="space-y-3 md:hidden">
                {filtered.map(c => (
                    <div key={c.id} className="rounded-2xl border bg-white p-4 dark:border-darkTheme-border dark:bg-darkTheme-card">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold dark:text-darkTheme-text">{c.name}</h3>
                                <p className="text-xs text-gray-500">{c.category}</p>
                            </div>
                            <button onClick={() => { setSelected(c); setModal("view"); }}><Eye size={18} /></button>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-500">
                            <span><CalendarDays size={14} className="mr-1 inline" />{c.date}</span>
                            <span><Clock3 size={14} className="mr-1 inline" />{c.duration} min</span>
                            <span><UserRound size={14} className="mr-1 inline" />{c.trainer}</span>
                            <span><Users size={14} className="mr-1 inline" />{c.enrolled}/{c.capacity}</span>
                        </div>
                    </div>
                ))}
            </div>
            {modal === "form" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white dark:bg-darkTheme-card">
                        <div className="flex justify-between border-b p-5 dark:border-darkTheme-border">
                            <h2 className="font-bold dark:text-darkTheme-text">{selected ? "Edit Class" : "Create Class"}</h2>
                            <button onClick={() => setModal(null)}><X /></button>
                        </div>
                        <form onSubmit={submit} className="grid gap-4 p-5 md:grid-cols-2">
                            {[
                                ["name", "Class Name", "text"],
                                ["date", "Date", "date"],
                                ["time", "Time", "time"],
                                ["duration", "Duration", "number"],
                                ["capacity", "Capacity", "number"],
                                ["location", "Location", "text"],
                            ].map(([name, label, type]) => (
                                <div key={name}>
                                    <label className="mb-1 block text-sm font-medium dark:text-darkTheme-text">{label}</label>
                                    <input name={name} type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} className="w-full rounded-xl border px-3 py-2.5 text-sm dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text" />
                                </div>
                            ))}
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-xl border px-3 py-2.5 text-sm dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text">
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <select value={form.trainer} onChange={e => setForm({ ...form, trainer: e.target.value })} className="rounded-xl border px-3 py-2.5 text-sm dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text">
                                <option value="">Select Trainer</option>
                                {trainers.map(t => <option key={t}>{t}</option>)}
                            </select>
                            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="rounded-xl border px-3 py-2.5 text-sm dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text">
                                <option>Live</option>
                                <option>Online</option>
                            </select>
                            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Class description..." className="rounded-xl border p-3 text-sm md:col-span-2 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text" rows="3" />
                            <div className="flex justify-end gap-3 md:col-span-2">
                                <button type="button" onClick={() => setModal(null)} className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm">Cancel</button>
                                <button className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white">{selected ? "Update" : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {modal === "view" && selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-5 dark:bg-darkTheme-card">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-bold dark:text-darkTheme-text">{selected.name}</h2>
                                <p className="text-sm text-gray-500">{selected.category}</p>
                            </div>
                            <button onClick={() => setModal(null)}><X /></button>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                            <div><b>Date:</b> {selected.date}</div>
                            <div><b>Time:</b> {selected.time}</div>
                            <div><b>Trainer:</b> {selected.trainer}</div>
                            <div><b>Duration:</b> {selected.duration} min</div>
                            <div><b>Members:</b> {selected.enrolled}/{selected.capacity}</div>
                            <div><b>Location:</b> {selected.location}</div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-gray-500">{selected.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Classes;