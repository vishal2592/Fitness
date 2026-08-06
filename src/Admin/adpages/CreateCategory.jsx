import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  ImagePlus,
  X,
  Dumbbell,
  Leaf,
  Video,
  PlayCircle,
  LockKeyhole,
  CheckCircle2,
  Info,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  const navigate = useNavigate();

  // ==================================================
  // CURRENT MODULE (GYM / YOGA)
  // ==================================================

  const currentMode = useSelector(
    (state) => state.mode?.currentMode || "gym"
  );

  const isGym = currentMode === "gym";

  // ==================================================
  // PAGE CONTENT
  // ==================================================

  const pageContent = {
    title: isGym ? "Create Gym Category" : "Create Yoga Category",

    description: isGym
      ? "Create a new workout category for your gym members."
      : "Create a new yoga category for your yoga practitioners.",

    categoryPlaceholder: isGym
      ? "e.g. Strength Training"
      : "e.g. Hatha Yoga",

    shortPlaceholder: isGym
      ? "e.g. Build strength and muscle"
      : "e.g. Improve flexibility and mindfulness",

    fullPlaceholder: isGym
      ? "Write detailed information about this workout category..."
      : "Write detailed information about this yoga category...",

    icon: isGym ? (
      <Dumbbell size={22} />
    ) : (
      <Leaf size={22} />
    ),
  };

  // ==================================================
  // FORM STATE
  // ==================================================

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

  // ==================================================
  // HANDLE INPUT
  // ==================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==================================================
  // HANDLE IMAGE
  // ==================================================

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

    setImagePreview(URL.createObjectURL(file));
  };

  // ==================================================
  // CLEANUP IMAGE
  // ==================================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ==================================================
  // REMOVE IMAGE
  // ==================================================

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview("");

    const fileInput = document.getElementById(
      "category-image"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // ==================================================
  // VALIDATION
  // ==================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
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

  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const categoryData = {
        module: currentMode, // gym | yoga
        ...formData,
        image,
      };

      console.log(categoryData);

      // API HERE

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      navigate("/admin/category");
    } catch (error) {
      console.error(error);
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
              {pageContent.icon}
            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                {pageContent.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                {pageContent.description}
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

        {/* ================= LEFT ================= */}

        <div className="space-y-6">

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6 dark:border-darkTheme-border dark:bg-darkTheme-card">

            <div className="border-b border-gray-100 pb-5 dark:border-darkTheme-border">

              <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                Category Information
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                Fill the details below.
              </p>

            </div>

            <div className="mt-6 space-y-5">

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={pageContent.categoryPlaceholder}
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition ${
                    errors.name
                      ? "border-red-400"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}

              </div>

              {/* SHORT DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                  Short Description
                </label>

                <input
                  type="text"
                  maxLength={120}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder={pageContent.shortPlaceholder}
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition ${
                    errors.shortDescription
                      ? "border-red-400"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />

                {errors.shortDescription && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.shortDescription}
                  </p>
                )}

              </div>

              {/* FULL DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                  Full Description
                </label>

                <textarea
                  rows={7}
                  maxLength={500}
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder={pageContent.fullPlaceholder}
                  className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition ${
                    errors.fullDescription
                      ? "border-red-400"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />

                {errors.fullDescription && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.fullDescription}
                  </p>
                )}

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

            </div>

          </div>
                    {/* ==================================================
              VIDEO INFORMATION
          ================================================== */}

          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm md:p-6 dark:border-blue-900/30 dark:bg-blue-900/10">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
                <Video size={20} />
              </div>

              <div>

                <h2 className="font-bold text-gray-800 dark:text-darkTheme-text">
                  Video Management
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                  {isGym
                    ? "After creating the workout category, you can upload Demo and Premium workout videos."
                    : "After creating the yoga category, you can upload Demo and Premium yoga sessions."}
                </p>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* Demo */}

              <div className="rounded-xl border border-orange-100 bg-white p-4 dark:border-orange-900/30 dark:bg-darkTheme-card">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <PlayCircle size={18} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                      Demo Videos
                    </p>

                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                      Free Preview Videos
                    </p>

                  </div>

                </div>

              </div>

              {/* Premium */}

              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-darkTheme-card">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                    <LockKeyhole size={18} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                      Premium Videos
                    </p>

                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                      Subscription Only
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              ACTION BUTTONS
          ================================================== */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => navigate("/admin/category")}
                className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 disabled:opacity-60"
              >

                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {isGym
                      ? "Create Workout Category"
                      : "Create Yoga Category"}
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

        {/* ==================================================
            RIGHT SIDEBAR STARTS
        ================================================== */}

        <div className="space-y-6">
                  {/* ==================================================
              CATEGORY IMAGE
          ================================================== */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

            <div>

              <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                Category Image
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                Upload a cover image for this {isGym ? "workout" : "yoga"} category.
              </p>

            </div>

            <label
              htmlFor="category-image"
              className={`mt-5 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${
                imagePreview
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
                        ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
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

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                    <ImagePlus size={26} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                    Upload {isGym ? "Workout" : "Yoga"} Category Image
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Maximum Size : 5 MB
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

          {/* ==================================================
              CATEGORY SETUP
          ================================================== */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

            <div className="flex items-center gap-2">

              <Info size={18} className="text-blue-500" />

              <h2 className="font-bold text-gray-800 dark:text-darkTheme-text">
                Category Setup
              </h2>

            </div>

            <div className="mt-5 space-y-4">

              {[
                "Category Information",
                "Category Cover Image",
                "Demo Videos",
                "Premium Videos",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-green-500"
                  />

                  <div>

                    <p className="text-sm font-medium text-gray-800 dark:text-darkTheme-text">
                      {item}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">

                      {item === "Category Information" &&
                        "Basic details of your category."}

                      {item === "Category Cover Image" &&
                        "Displayed to users on the website."}

                      {item === "Demo Videos" &&
                        "Free preview content."}

                      {item === "Premium Videos" &&
                        "Available after subscription."}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ==================================================
              IMPORTANT NOTE
          ================================================== */}

          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5 dark:border-yellow-900/30 dark:bg-yellow-900/10">

            <div className="flex items-start gap-3">

              <Info
                size={18}
                className="mt-0.5 text-yellow-600"
              />

              <div>

                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                  Important
                </p>

                <p className="mt-1 text-xs leading-5 text-yellow-700 dark:text-yellow-400">

                  {isGym
                    ? "Create the workout category first. After that you can manage Demo and Premium workout videos from Video Management."
                    : "Create the yoga category first. After that you can manage Demo and Premium yoga videos from Video Management."}

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