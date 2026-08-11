
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    ImagePlus,
    Percent,
    Save,
    Tag,
    TicketPercent,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddOffers = () => {
    const navigate = useNavigate();
    const currentMode = useSelector((state) => state.mode.currentMode);

    const isGym = currentMode === "gym";

    const [formData, setFormData] = useState({
        title: "",
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        minAmount: "",
        maxDiscount: "",
        startDate: "",
        endDate: "",
        usageLimit: "",
        status: "active",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Offer Data:", formData);
    };

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-400";

    const labelClass =
        "mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300";

    const cardClass =
        "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800";

    return (
        <div className="p-6">
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
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <TicketPercent size={21} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                                Add New Offer
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                Create a new promotional offer for your{" "}
                                {isGym ? "gym" : "yoga"} members.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 md:self-auto">
                    <CheckCircle2 size={14} />
                    {isGym ? "Gym Offer" : "Yoga Offer"}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                    {/* Main Form */}
                    <div className="space-y-5 xl:col-span-2">
                        {/* Basic Information */}
                        <div className={`${cardClass} p-5`}>
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Tag size={17} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                        Basic Information
                                    </h2>

                                    <p className="text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                        Enter the basic details of your offer.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Title */}
                                <div className="md:col-span-2">
                                    <label className={labelClass}>
                                        Offer Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. New Member Special Offer"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Code */}
                                <div>
                                    <label className={labelClass}>
                                        Offer / Coupon Code
                                    </label>

                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        placeholder="e.g. FIT50"
                                        className={`${inputClass} uppercase`}
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className={labelClass}>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className={labelClass}>
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Describe what this offer provides..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Discount Details */}
                        <div className={`${cardClass} p-5`}>
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Percent size={17} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                        Discount Details
                                    </h2>

                                    <p className="text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                        Configure the discount amount and conditions.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Discount Type */}
                                <div>
                                    <label className={labelClass}>
                                        Discount Type
                                    </label>

                                    <select
                                        name="discountType"
                                        value={formData.discountType}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="percentage">
                                            Percentage (%)
                                        </option>

                                        <option value="fixed">
                                            Fixed Amount (₹)
                                        </option>
                                    </select>
                                </div>

                                {/* Discount Value */}
                                <div>
                                    <label className={labelClass}>
                                        Discount Value
                                    </label>

                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="discountValue"
                                            value={formData.discountValue}
                                            onChange={handleChange}
                                            placeholder={
                                                formData.discountType ===
                                                "percentage"
                                                    ? "e.g. 20"
                                                    : "e.g. 500"
                                            }
                                            className={`${inputClass} pr-12`}
                                        />

                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 dark:text-blue-400">
                                            {formData.discountType ===
                                            "percentage"
                                                ? "%"
                                                : "₹"}
                                        </span>
                                    </div>
                                </div>

                                {/* Minimum Purchase */}
                                <div>
                                    <label className={labelClass}>
                                        Minimum Purchase
                                    </label>

                                    <input
                                        type="number"
                                        name="minAmount"
                                        value={formData.minAmount}
                                        onChange={handleChange}
                                        placeholder="e.g. 1000"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Maximum Discount */}
                                <div>
                                    <label className={labelClass}>
                                        Maximum Discount
                                    </label>

                                    <input
                                        type="number"
                                        name="maxDiscount"
                                        value={formData.maxDiscount}
                                        onChange={handleChange}
                                        placeholder="e.g. 1000"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Offer Validity */}
                        <div className={`${cardClass} p-5`}>
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <Calendar size={17} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                        Offer Validity
                                    </h2>

                                    <p className="text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                        Set when this offer will be available.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {/* Start Date */}
                                <div>
                                    <label className={labelClass}>
                                        Start Date
                                    </label>

                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className={labelClass}>
                                        End Date
                                    </label>

                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                {/* Usage Limit */}
                                <div>
                                    <label className={labelClass}>
                                        Usage Limit
                                    </label>

                                    <input
                                        type="number"
                                        name="usageLimit"
                                        value={formData.usageLimit}
                                        onChange={handleChange}
                                        placeholder="Unlimited"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-5">
                        {/* Offer Banner */}
                        <div className={`${cardClass} p-5`}>
                            <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                Offer Banner
                            </h2>

                            <p className="mb-4 mt-1 text-[11px] text-gray-500 dark:text-darkTheme-muted">
                                Upload an image for your offer.
                            </p>

                            <label className="group flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/5">
                                {formData.image ? (
                                    <div className="px-4 text-center">
                                        <CheckCircle2
                                            size={30}
                                            className="mx-auto mb-2 text-green-600 dark:text-green-400"
                                        />

                                        <p className="break-all text-xs font-semibold text-gray-800 dark:text-gray-200">
                                            {formData.image.name}
                                        </p>

                                        <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                                            Click to change image
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <ImagePlus
                                            size={30}
                                            className="mb-3 text-blue-600 dark:text-blue-400"
                                        />

                                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                                            Upload Offer Image
                                        </p>

                                        <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                                            PNG, JPG up to 5MB
                                        </p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Preview */}
                        <div className={`${cardClass} overflow-hidden`}>
                            <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                                <h2 className="text-sm font-bold text-gray-800 dark:text-darkTheme-text">
                                    Offer Preview
                                </h2>
                            </div>

                            <div className="p-5">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                            Special Offer
                                        </span>

                                        <span className="text-lg font-black text-green-600 dark:text-green-400">
                                            {formData.discountValue || "20"}
                                            {formData.discountType ===
                                            "percentage"
                                                ? "%"
                                                : "₹"}{" "}
                                            OFF
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                        {formData.title ||
                                            "New Member Special Offer"}
                                    </h3>

                                    <p className="mt-1 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                                        {formData.description ||
                                            "Get an exclusive discount on your next membership."}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                            Coupon Code
                                        </span>

                                        <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                                            {formData.code || "FIT20"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={`${cardClass} flex gap-3 p-4`}>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-xs font-bold text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            >
                                <X size={16} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                <Save size={16} />
                                Create Offer
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddOffers;

