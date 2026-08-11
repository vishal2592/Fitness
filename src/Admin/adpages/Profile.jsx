
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Camera,
    Mail,
    Phone,
    User,
    ShieldCheck,
    Save,
    Edit3,
    Dumbbell,
    HeartPulse,
} from "lucide-react";

const gymProfile = {
    name: "Gym Administrator",
    role: "Gym Management Admin",
    email: "gymadmin@example.com",
    phone: "+91 98765 43210",
    bio: "Manage gym members, trainers, programs, subscriptions, offers and daily gym operations.",
    image: "",
};

const yogaProfile = {
    name: "Yoga Administrator",
    role: "Yoga Management Admin",
    email: "yogaadmin@example.com",
    phone: "+91 98765 43211",
    bio: "Manage yoga members, instructors, classes, subscriptions, offers and daily yoga operations.",
    image: "",
};

const Profile = () => {
    const currentMode = useSelector((state) => state.mode.currentMode);

    const isGym = currentMode === "gym";
    const moduleName = isGym ? "Gym" : "Yoga";

    const [formData, setFormData] = useState(
        isGym ? { ...gymProfile } : { ...yogaProfile },
    );

    const [isEditing, setIsEditing] = useState(false);

    /*
     * Module change:
     * Gym -> Gym profile
     * Yoga -> Yoga profile
     */
    useEffect(() => {
        setFormData(
            isGym
                ? { ...gymProfile }
                : { ...yogaProfile },
        );
        setIsEditing(false);
    }, [isGym]);

    /*
     * SAME DARK THEME FOR BOTH MODULES
     *
     * Gym and Yoga only change their data.
     * UI/theme remains exactly the same.
     */
    const theme = {
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        primarySoft: "rgba(37,99,235,0.10)",
        primaryLight: "rgba(37,99,235,0.16)",

        bg: "#111827",
        surface: "#1F2937",
        input: "#111827",

        border: "#374151",

        text: "#F9FAFB",
        muted: "#9CA3AF",

        success: "#22C55E",
        successSoft: "rgba(34,197,94,0.10)",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setFormData((prev) => ({
                ...prev,
                image: imageUrl,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`${moduleName} Profile Updated:`, formData);

        setIsEditing(false);

        alert(`${moduleName} profile updated successfully!`);
    };

    const resetProfile = () => {
        setFormData(
            isGym
                ? { ...gymProfile }
                : { ...yogaProfile },
        );

        setIsEditing(false);
    };

    return (
        <div
            className="min-h-screen p-4 md:p-6"
            style={{
                backgroundColor: theme.bg,
                color: theme.text,
            }}
        >
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold md:text-3xl">
                        My Profile
                    </h1>

                    <p
                        className="mt-1 text-sm"
                        style={{ color: theme.muted }}
                    >
                        Manage your {moduleName.toLowerCase()} administrator
                        profile and account information.
                    </p>
                </div>

                {/* MODULE BADGE */}
                <div
                    className="flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs font-semibold md:self-auto"
                    style={{
                        borderColor: theme.primary,
                        backgroundColor: theme.primarySoft,
                        color: theme.primary,
                    }}
                >
                    {isGym ? (
                        <Dumbbell size={14} />
                    ) : (
                        <HeartPulse size={14} />
                    )}

                    {moduleName} Module
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

                    {/* =====================================================
                        LEFT SIDE
                    ====================================================== */}

                    <div className="space-y-5 xl:col-span-2">

                        {/* PROFILE INFORMATION */}
                        <div
                            className="rounded-xl border p-5 shadow-sm"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                            }}
                        >
                            {/* SECTION HEADER */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                                        style={{
                                            backgroundColor:
                                                theme.primarySoft,
                                            color: theme.primary,
                                        }}
                                    >
                                        <User size={18} />
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-bold">
                                            Profile Information
                                        </h2>

                                        <p
                                            className="text-[11px]"
                                            style={{
                                                color: theme.muted,
                                            }}
                                        >
                                            Update your administrator
                                            information.
                                        </p>
                                    </div>
                                </div>

                                {!isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                        style={{
                                            backgroundColor: theme.primary,
                                        }}
                                    >
                                        <Edit3 size={13} />
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            {/* FORM */}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* NAME */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold">
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2"
                                            style={{
                                                color: theme.muted,
                                            }}
                                        />

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                                            style={{
                                                backgroundColor:
                                                    theme.input,
                                                borderColor:
                                                    theme.border,
                                                color: theme.text,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* ROLE */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                                        style={{
                                            backgroundColor: theme.input,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        }}
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2"
                                            style={{
                                                color: theme.muted,
                                            }}
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                                            style={{
                                                backgroundColor:
                                                    theme.input,
                                                borderColor:
                                                    theme.border,
                                                color: theme.text,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* PHONE */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold">
                                        Phone Number
                                    </label>

                                    <div className="relative">
                                        <Phone
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2"
                                            style={{
                                                color: theme.muted,
                                            }}
                                        />

                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full rounded-lg border py-3 pl-9 pr-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                                            style={{
                                                backgroundColor:
                                                    theme.input,
                                                borderColor:
                                                    theme.border,
                                                color: theme.text,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* BIO */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-xs font-semibold">
                                        Bio
                                    </label>

                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows={4}
                                        className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
                                        style={{
                                            backgroundColor: theme.input,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* SAVE / CANCEL */}
                            {isEditing && (
                                <div
                                    className="mt-5 flex justify-end gap-3 border-t pt-5"
                                    style={{
                                        borderColor: theme.border,
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={resetProfile}
                                        className="rounded-lg border px-4 py-2.5 text-xs font-semibold transition hover:bg-white/5"
                                        style={{
                                            borderColor: theme.border,
                                            color: theme.muted,
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                                        style={{
                                            backgroundColor: theme.primary,
                                        }}
                                    >
                                        <Save size={14} />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* SECURITY */}
                        <div
                            className="rounded-xl border p-5 shadow-sm"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor:
                                            theme.successSoft,
                                        color: theme.success,
                                    }}
                                >
                                    <ShieldCheck size={18} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold">
                                        Account Security
                                    </h3>

                                    <p
                                        className="mt-1 text-[11px] leading-relaxed"
                                        style={{
                                            color: theme.muted,
                                        }}
                                    >
                                        Keep your account information and
                                        password secure. Never share your
                                        login credentials with anyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        RIGHT SIDE
                    ====================================================== */}

                    <div className="space-y-5">

                        {/* PROFILE CARD */}
                        <div
                            className="rounded-xl border p-5 text-center shadow-sm"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                            }}
                        >
                            {/* PROFILE IMAGE */}
                            <div className="relative mx-auto h-28 w-28">
                                <div
                                    className="h-28 w-28 overflow-hidden rounded-full border-4"
                                    style={{
                                        borderColor:
                                            theme.primarySoft,
                                        backgroundColor:
                                            theme.primarySoft,
                                    }}
                                >
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt={formData.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="flex h-full w-full items-center justify-center text-3xl font-bold"
                                            style={{
                                                color: theme.primary,
                                            }}
                                        >
                                            {formData.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* CAMERA */}
                                <label
                                    className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 text-white transition hover:opacity-90"
                                    style={{
                                        borderColor: theme.surface,
                                        backgroundColor: theme.primary,
                                    }}
                                >
                                    <Camera size={15} />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>

                            {/* NAME */}
                            <h2 className="mt-4 text-lg font-bold">
                                {formData.name}
                            </h2>

                            {/* ROLE */}
                            <p
                                className="mt-1 text-xs"
                                style={{
                                    color: theme.muted,
                                }}
                            >
                                {formData.role}
                            </p>

                            {/* MODULE BADGE */}
                            <span
                                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold"
                                style={{
                                    backgroundColor:
                                        theme.primarySoft,
                                    color: theme.primary,
                                }}
                            >
                                {isGym ? (
                                    <Dumbbell size={11} />
                                ) : (
                                    <HeartPulse size={11} />
                                )}

                                {moduleName} Administrator
                            </span>
                        </div>

                        {/* PROFILE STATS */}
                        <div className="grid grid-cols-2 gap-3">
                            <div
                                className="rounded-lg border p-4 text-center"
                                style={{
                                    backgroundColor:
                                        theme.surface,
                                    borderColor: theme.border,
                                }}
                            >
                                <p
                                    className="text-lg font-bold"
                                    style={{
                                        color: theme.success,
                                    }}
                                >
                                    Active
                                </p>

                                <p
                                    className="mt-1 text-[10px]"
                                    style={{
                                        color: theme.muted,
                                    }}
                                >
                                    Account Status
                                </p>
                            </div>

                            <div
                                className="rounded-lg border p-4 text-center"
                                style={{
                                    backgroundColor:
                                        theme.surface,
                                    borderColor: theme.border,
                                }}
                            >
                                <p
                                    className="text-lg font-bold"
                                    style={{
                                        color: theme.primary,
                                    }}
                                >
                                    {moduleName}
                                </p>

                                <p
                                    className="mt-1 text-[10px]"
                                    style={{
                                        color: theme.muted,
                                    }}
                                >
                                    Current Module
                                </p>
                            </div>
                        </div>

                        {/* MODULE INFORMATION */}
                        <div
                            className="rounded-xl border p-5 shadow-sm"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                            }}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor:
                                            theme.primarySoft,
                                        color: theme.primary,
                                    }}
                                >
                                    {isGym ? (
                                        <Dumbbell size={18} />
                                    ) : (
                                        <HeartPulse size={18} />
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold">
                                        {moduleName} Module
                                    </h3>

                                    <p
                                        className="text-[11px]"
                                        style={{
                                            color: theme.muted,
                                        }}
                                    >
                                        Current administrator access
                                    </p>
                                </div>
                            </div>

                            <div
                                className="rounded-lg border p-4"
                                style={{
                                    backgroundColor:
                                        theme.primarySoft,
                                    borderColor: theme.border,
                                }}
                            >
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{
                                        color: theme.muted,
                                    }}
                                >
                                    You are currently managing the{" "}
                                    <span
                                        className="font-bold"
                                        style={{
                                            color: theme.primary,
                                        }}
                                    >
                                        {moduleName}
                                    </span>{" "}
                                    module. Your profile information and
                                    module-specific settings are shown
                                    according to the selected module.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
