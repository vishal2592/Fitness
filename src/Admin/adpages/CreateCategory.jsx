
import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    Save,
    ImagePlus,
    X,
    Dumbbell,
    Video,
    PlayCircle,
    LockKeyhole,
    CheckCircle2,
    Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom"

const CreateCategory = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        shortDescription: "",
        fullDescription: "",
        status: "Active",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --------------------------------------------------
    // Handle Input
    // --------------------------------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove field error while typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // --------------------------------------------------
    // Handle Image
    // --------------------------------------------------

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        const maxSize = 5 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            setErrors((prev) => ({
                ...prev,
                image: "Only PNG, JPG and WEBP images are allowed.",
            }));

            return;
        }

        if (file.size > maxSize) {
            setErrors((prev) => ({
                ...prev,
                image: "Image size must be less than 5MB.",
            }));

            return;
        }

        setImage(file);

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    // --------------------------------------------------
    // Cleanup Preview URL
    // --------------------------------------------------

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // --------------------------------------------------
    // Remove Image
    // --------------------------------------------------

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImage(null);
        setImagePreview("");

        // Reset file input
        const fileInput = document.getElementById(
            "category-image"
        );

        if (fileInput) {
            fileInput.value = "";
        }
    };

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Category name is required.";
        } else if (formData.name.trim().length < 3) {
            newErrors.name =
                "Category name must be at least 3 characters.";
        }

        if (!formData.shortDescription.trim()) {
            newErrors.shortDescription =
                "Short description is required.";
        }

        if (!formData.fullDescription.trim()) {
            newErrors.fullDescription =
                "Full description is required.";
        }

        if (!image) {
            newErrors.image =
                "Please upload a category image.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // --------------------------------------------------
    // Submit
    // --------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // ------------------------------------------
            // API will be added here later
            // ------------------------------------------

            const categoryData = {
                name: formData.name.trim(),
                shortDescription:
                    formData.shortDescription.trim(),
                fullDescription:
                    formData.fullDescription.trim(),
                status: formData.status,
                image,
            };

            console.log("Category Data:", categoryData);

            // Simulating API request
            await new Promise((resolve) =>
                setTimeout(resolve, 700)
            );

            // After category creation
            navigate("/admin/category");
        } catch (error) {
            console.error("Create category error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen space-y-6 p-4 md:p-6 dark:bg-darkTheme-bg">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
                            <Dumbbell size={22} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                                Create Category
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                Create a fitness category for your workout content.
                            </p>
                        </div>

                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/admin/category")}
                    className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-darkTheme-border dark:bg-darkTheme-card dark:text-darkTheme-text dark:hover:bg-darkTheme-border"
                >
                    <ArrowLeft size={18} />
                    Back to Categories
                </button>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
            >

                {/* ==================================================
                    LEFT
                ================================================== */}

                <div className="space-y-6">

                    {/* Category Information */}

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6 dark:border-darkTheme-border dark:bg-darkTheme-card">

                        <div className="border-b border-gray-100 pb-5 dark:border-darkTheme-border">

                            <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                                Category Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                Add the basic information that users will see for this category.
                            </p>

                        </div>

                        <div className="mt-6 space-y-5">

                            {/* Category Name */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                    Category Name{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Strength Training"
                                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-darkTheme-border/30 dark:text-darkTheme-text ${errors.name
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-darkTheme-border"
                                        }`}
                                />

                                {errors.name && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.name}
                                    </p>
                                )}

                            </div>

                            {/* Short Description */}

                            <div>

                                <div className="mb-2 flex items-center justify-between">

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Short Description{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <span className="text-xs text-gray-400">
                                        {formData.shortDescription.length}/120
                                    </span>

                                </div>

                                <input
                                    type="text"
                                    name="shortDescription"
                                    maxLength={120}
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    placeholder="e.g. Build strength, power and muscle"
                                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-darkTheme-border/30 dark:text-darkTheme-text ${errors.shortDescription
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-darkTheme-border"
                                        }`}
                                />

                                {errors.shortDescription && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.shortDescription}
                                    </p>
                                )}

                            </div>

                            {/* Full Description */}

                            <div>

                                <div className="mb-2 flex items-center justify-between">

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Full Description{" "}
                                        <span className="text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <span className="text-xs text-gray-400">
                                        {formData.fullDescription.length}/500
                                    </span>

                                </div>

                                <textarea
                                    name="fullDescription"
                                    maxLength={500}
                                    value={formData.fullDescription}
                                    onChange={handleChange}
                                    placeholder="Write a detailed description about this fitness category..."
                                    rows={7}
                                    className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-darkTheme-border/30 dark:text-darkTheme-text ${errors.fullDescription
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-darkTheme-border"
                                        }`}
                                />

                                {errors.fullDescription && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.fullDescription}
                                    </p>
                                )}

                            </div>

                            {/* Status */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>
                                </select>

                            </div>

                        </div>

                    </div>

                    {/* Video Structure Info */}

                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm md:p-6 dark:border-blue-900/30 dark:bg-blue-900/10">

                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
                                <Video size={21} />
                            </div>

                            <div>

                                <h2 className="font-bold text-gray-800 dark:text-darkTheme-text">
                                    Category Video Content
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                                    Videos are not uploaded while creating the category.
                                    First create the category, then add its demo and premium
                                    workout videos from the category's Video Management section.
                                </p>

                            </div>

                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* Demo */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-darkTheme-card">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400">
                                        <PlayCircle size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                            Demo Videos
                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                            Free for users
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Premium */}

                            <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-darkTheme-card">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
                                        <LockKeyhole size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                            Premium Videos
                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                            Subscription required
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Submit Buttons */}

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/category")
                                }
                                className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text dark:hover:bg-darkTheme-border/80"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {isSubmitting ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Create Category
                                    </>
                                )}

                            </button>

                        </div>

                    </div>

                </div>

                {/* ==================================================
                    RIGHT SIDEBAR
                ================================================== */}

                <div className="space-y-6">

                    {/* Category Image */}

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                        <div>

                            <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                                Category Image
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                Add a cover image that represents this category.
                            </p>

                        </div>

                        <label
                            htmlFor="category-image"
                            className={`mt-5 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${imagePreview
                                ? "border-gray-200 dark:border-darkTheme-border"
                                : "min-h-[250px] border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30 dark:border-darkTheme-border dark:bg-darkTheme-border/20"
                                }`}
                        >

                            {imagePreview ? (

                                <div className="relative w-full">

                                    <img
                                        src={imagePreview}
                                        alt="Category Preview"
                                        className="h-[250px] w-full object-cover"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">

                                        <p className="truncate text-sm font-semibold text-white">
                                            {image?.name}
                                        </p>

                                        <p className="mt-1 text-xs text-white/70">
                                            {image
                                                ? `${(
                                                    image.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)} MB`
                                                : ""}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeImage();
                                        }}
                                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-white transition hover:bg-red-500"
                                    >
                                        <X size={17} />
                                    </button>

                                </div>

                            ) : (

                                <div className="flex flex-col items-center px-5 py-8 text-center">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
                                        <ImagePlus size={26} />
                                    </div>

                                    <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Upload Category Image
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        PNG, JPG or WEBP
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Maximum size: 5MB
                                    </p>

                                    <span className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm dark:bg-darkTheme-card dark:text-darkTheme-muted">
                                        Choose Image
                                    </span>

                                </div>

                            )}

                            <input
                                id="category-image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                        </label>

                        {errors.image && (
                            <p className="mt-2 text-xs font-medium text-red-500">
                                {errors.image}
                            </p>
                        )}

                    </div>

                    {/* Requirements */}

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                        <div className="flex items-center gap-2">

                            <Info
                                size={19}
                                className="text-blue-500"
                            />

                            <h2 className="font-bold text-gray-800 dark:text-darkTheme-text">
                                Category Setup
                            </h2>

                        </div>

                        <div className="mt-5 space-y-3">

                            <div className="flex items-start gap-3">

                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Category Information
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-gray-500 dark:text-darkTheme-muted">
                                        Name, description and status
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-start gap-3">

                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Category Image
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-gray-500 dark:text-darkTheme-muted">
                                        Used as the category cover
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-start gap-3">

                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Demo Video
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-gray-500 dark:text-darkTheme-muted">
                                        Added after category creation
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-start gap-3">

                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Premium Videos
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-gray-500 dark:text-darkTheme-muted">
                                        Subscription-based workout content
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Important Note */}

                    <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5 dark:border-yellow-900/30 dark:bg-yellow-900/10">

                        <div className="flex items-start gap-3">

                            <Info
                                size={19}
                                className="mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400"
                            />

                            <div>

                                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                                    Important
                                </p>

                                <p className="mt-1 text-xs leading-5 text-yellow-700 dark:text-yellow-400">
                                    Create the category first. Once it is created,
                                    use its Video Management section to add the
                                    category-specific free demo and premium videos.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default CreateCategory;

