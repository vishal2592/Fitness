import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    Send,
    Users,
    X,
} from "lucide-react";

const SendNotification = () => {
    const navigate = useNavigate();
    const currentMode = useSelector((state) => state.mode.currentMode);

    const isGym = currentMode === "gym";
    const moduleName = isGym ? "Gym" : "Yoga";

    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "General",
        audience: "All Members",
        sendType: "now",
        date: "",
        time: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Notification title is required.";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Notification message is required.";
        }

        if (formData.sendType === "schedule") {
            if (!formData.date) {
                newErrors.date = "Please select a date.";
            }

            if (!formData.time) {
                newErrors.time = "Please select a time.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const notificationData = {
            ...formData,
            module: moduleName,
            status: formData.sendType === "now" ? "Sent" : "Scheduled",
        };

        console.log("Notification Data:", notificationData);

        alert(
            formData.sendType === "now"
                ? `${moduleName} notification sent successfully!`
                : `${moduleName} notification scheduled successfully!`,
        );

        navigate("/admin/notification");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-gray-800 dark:bg-gray-950 dark:text-darkTheme-text">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-gray-800 dark:text-darkTheme-muted dark:hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <Bell size={22} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                                Send Notification
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                Create and send a notification to your{" "}
                                {moduleName.toLowerCase()} members.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Module Badge */}
                <div className="flex items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 md:self-auto">
                    <CheckCircle2 size={14} />
                    {moduleName} Module
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                    {/* ================= MAIN FORM ================= */}
                    <div className="space-y-5 xl:col-span-2">
                        {/* Notification Details */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Bell size={18} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                        Notification Details
                                    </h2>

                                    <p className="text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                        Enter the notification content.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Notification Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder={
                                            isGym
                                                ? "e.g. New HIIT Batch Started"
                                                : "e.g. New Morning Yoga Class"
                                        }
                                        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-1 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 ${
                                            errors.title
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                                        }`}
                                    />

                                    {errors.title && (
                                        <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Message
                                    </label>

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        maxLength={300}
                                        placeholder={
                                            isGym
                                                ? "Write your gym notification message..."
                                                : "Write your yoga notification message..."
                                        }
                                        className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-1 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 ${
                                            errors.message
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                                        }`}
                                    />

                                    <div className="mt-1 flex items-center justify-between">
                                        {errors.message ? (
                                            <p className="text-[11px] text-red-500 dark:text-red-400">
                                                {errors.message}
                                            </p>
                                        ) : (
                                            <span />
                                        )}

                                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                            {formData.message.length}/300
                                        </span>
                                    </div>
                                </div>

                                {/* Type + Audience */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Type */}
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            Notification Type
                                        </label>

                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-blue-400"
                                        >
                                            <option value="General">
                                                General
                                            </option>
                                            <option value="Promotion">
                                                Promotion
                                            </option>
                                            <option value="Reminder">
                                                Reminder
                                            </option>
                                            <option value="Class">
                                                Class
                                            </option>
                                        </select>
                                    </div>

                                    {/* Audience */}
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            Audience
                                        </label>

                                        <select
                                            name="audience"
                                            value={formData.audience}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-blue-400"
                                        >
                                            <option value="All Members">
                                                All Members
                                            </option>

                                            <option value="Active Members">
                                                Active Members
                                            </option>

                                            <option value="New Members">
                                                New Members
                                            </option>

                                            <option value="Expiring Members">
                                                Expiring Members
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= DELIVERY ================= */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Clock size={18} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                        Delivery
                                    </h2>

                                    <p className="text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                        Choose when the notification should be
                                        delivered.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {/* Send Now */}
                                <label
                                    className={`cursor-pointer rounded-lg border p-4 transition ${
                                        formData.sendType === "now"
                                            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/10"
                                            : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="sendType"
                                            value="now"
                                            checked={
                                                formData.sendType === "now"
                                            }
                                            onChange={handleChange}
                                            className="accent-blue-600"
                                        />

                                        <div>
                                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                                Send Now
                                            </p>

                                            <p className="mt-1 text-[10px] text-gray-500 dark:text-darkTheme-muted">
                                                Send notification immediately.
                                            </p>
                                        </div>
                                    </div>
                                </label>

                                {/* Schedule */}
                                <label
                                    className={`cursor-pointer rounded-lg border p-4 transition ${
                                        formData.sendType === "schedule"
                                            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/10"
                                            : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="sendType"
                                            value="schedule"
                                            checked={
                                                formData.sendType ===
                                                "schedule"
                                            }
                                            onChange={handleChange}
                                            className="accent-blue-600"
                                        />

                                        <div>
                                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                                Schedule
                                            </p>

                                            <p className="mt-1 text-[10px] text-gray-500 dark:text-darkTheme-muted">
                                                Send at a selected date and
                                                time.
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Schedule Fields */}
                            {formData.sendType === "schedule" && (
                                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Date */}
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            Date
                                        </label>

                                        <div className="relative">
                                            <Calendar
                                                size={15}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                            />

                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className={`w-full rounded-lg border bg-white py-3 pl-9 pr-3 text-sm text-gray-800 outline-none focus:ring-1 dark:bg-gray-900 dark:text-gray-200 ${
                                                    errors.date
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                                }`}
                                            />
                                        </div>

                                        {errors.date && (
                                            <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
                                                {errors.date}
                                            </p>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            Time
                                        </label>

                                        <div className="relative">
                                            <Clock
                                                size={15}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                            />

                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className={`w-full rounded-lg border bg-white py-3 pl-9 pr-3 text-sm text-gray-800 outline-none focus:ring-1 dark:bg-gray-900 dark:text-gray-200 ${
                                                    errors.time
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                                }`}
                                            />
                                        </div>

                                        {errors.time && (
                                            <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
                                                {errors.time}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ================= RIGHT SIDEBAR ================= */}
                    <div className="space-y-5">
                        {/* Audience Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Users size={18} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                        Audience
                                    </h2>

                                    <p className="text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                        Members who will receive this
                                        notification.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Selected Audience
                                    </span>

                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                        {formData.audience}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                                <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                    Notification Preview
                                </h2>
                            </div>

                            <div className="p-5">
                                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
                                    <div className="flex gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500">
                                            <Bell size={18} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="truncate text-xs font-bold text-gray-800 dark:text-gray-200">
                                                    {formData.title ||
                                                        "Notification Title"}
                                                </h3>

                                                <span className="shrink-0 text-[9px] text-gray-400 dark:text-gray-500">
                                                    {formData.sendType ===
                                                    "schedule"
                                                        ? formData.time ||
                                                          "Scheduled"
                                                        : "Now"}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-[11px] leading-relaxed text-gray-500 dark:text-darkTheme-muted">
                                                {formData.message ||
                                                    "Your notification message will appear here."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-blue-200 pt-3 dark:border-blue-500/20">
                                        <span className="text-[10px] text-gray-500 dark:text-darkTheme-muted">
                                            {moduleName} Module
                                        </span>

                                        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-bold text-white dark:bg-blue-500">
                                            {formData.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-xs font-bold text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                                <X size={16} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                {formData.sendType === "now" ? (
                                    <>
                                        <Send size={15} />
                                        Send Now
                                    </>
                                ) : (
                                    <>
                                        <Calendar size={15} />
                                        Schedule
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SendNotification;