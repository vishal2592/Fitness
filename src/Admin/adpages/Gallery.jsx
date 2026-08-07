import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    ImagePlus,
    Images,
    Edit,
    Trash2,
    X,
    Eye,
} from "lucide-react";
import { useSelector } from "react-redux";

import gymGallery from "../Data/Gym/galleryData";
import yogaGallery from "../Data/Yoga/galleryData";

const categories = [
    "Gym",
    "Yoga",
    "Workout",
    "Transformation",
    "Events",
    "Trainers",
    "Facilities",
    "Others",
];

// ---------- Main Component ----------
const Gallery = () => {

    const currentMode = useSelector((state) => state.mode.currentMode);

    const [galleryItems, setGalleryItems] = useState(
        currentMode === "gym" ? gymGallery : yogaGallery
    );
    const [searchTerm, setSearchTerm] = useState("");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        category: categories[0],
        imageUrl: "",
        imageFile: null,
        featured: false,
        status: "active",
        displayOrder: 0,
        description: "",
    });
    useEffect(() => {
        if (currentMode === "gym") {
            setGalleryItems(gymGallery);
        } else {
            setGalleryItems(yogaGallery);
        }
    }, [currentMode]);
    const [formErrors, setFormErrors] = useState({});

    // Delete modal
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        itemId: null,
        itemTitle: "",
    });

    // ---------- Handlers ----------
    const handleSearch = (e) => setSearchTerm(e.target.value);

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentItemId(null);
        setFormData({
            title: "",
            category: categories[0],
            imageUrl: "",
            imageFile: null,
            featured: false,
            status: "active",
            displayOrder: galleryItems.length + 1,
            description: "",
        });
        setFormErrors({});
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setIsEditMode(true);
        setCurrentItemId(item.id);
        setFormData({
            title: item.title,
            category: item.category,
            imageUrl: item.imageUrl,
            imageFile: null,
            featured: item.featured,
            status: item.status,
            displayOrder: item.displayOrder,
            description: item.description,
        });
        setFormErrors({});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData((prev) => ({
                    ...prev,
                    imageUrl: event.target.result,
                    imageFile: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.category) errors.category = "Category is required";
        if (!formData.imageUrl && !formData.imageFile)
            errors.imageUrl = "Image is required";
        if (formData.displayOrder === undefined || formData.displayOrder < 0)
            errors.displayOrder = "Display Order must be a positive number";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveGalleryItem = () => {
        if (!validateForm()) return;

        const newItem = {
            id: isEditMode ? currentItemId : Date.now(),
            title: formData.title,
            category: formData.category,
            imageUrl: formData.imageUrl,
            featured: formData.featured,
            status: formData.status,
            displayOrder: Number(formData.displayOrder),
            description: formData.description,
        };

        if (isEditMode) {
            setGalleryItems((prev) =>
                prev.map((item) => (item.id === currentItemId ? newItem : item))
            );
        } else {
            setGalleryItems((prev) => [...prev, newItem]);
        }
        closeModal();
    };

    const confirmDelete = (id, title) => {
        setDeleteModal({ isOpen: true, itemId: id, itemTitle: title });
    };

    const deleteGalleryItem = () => {
        setGalleryItems((prev) =>
            prev.filter((item) => item.id !== deleteModal.itemId)
        );
        setDeleteModal({ isOpen: false, itemId: null, itemTitle: "" });
    };

    const cancelDelete = () => {
        setDeleteModal({ isOpen: false, itemId: null, itemTitle: "" });
    };

    // ---------- Computed Stats ----------
    const totalImages = galleryItems.length;
    const categoriesCount = new Set(galleryItems.map((item) => item.category))
        .size;
    const featuredCount = galleryItems.filter((item) => item.featured).length;
    const activeCount = galleryItems.filter((item) => item.status === "active")
        .length;

    // ---------- Filtered Items ----------
    const filteredItems = galleryItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ---------- Render ----------
    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                      <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                        {currentMode === "gym"
                            ? "Gym Gallerys"
                            : "Yoga Gallerys"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                        {currentMode === "gym"
                            ? "Manage all Gallerys"
                            : "Manage all Gallerys"}
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add Image
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Images</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">
                                {totalImages}
                            </h3>
                        </div>
                        <Images size={34} className="text-blue-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Categories</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">
                                {categoriesCount}
                            </h3>
                        </div>
                        <ImagePlus size={34} className="text-green-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Featured</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">
                                {featuredCount}
                            </h3>
                        </div>
                        <ImagePlus size={34} className="text-purple-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Active</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">
                                {activeCount}
                            </h3>
                        </div>
                        <Images size={34} className="text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search gallery images..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                />
            </div>

            {/* Gallery Grid */}
            {filteredItems.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-center">
                    <Images size={48} className="text-gray-500" />
                    <p className="mt-3 text-gray-400">
                        {searchTerm
                            ? "No images match your search."
                            : "No images in gallery yet."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 transition hover:scale-[1.02] hover:shadow-lg"
                        >
                            <div className="relative h-52 bg-slate-800">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Images size={60} className="text-gray-500" />
                                    </div>
                                )}
                                {item.featured && (
                                    <span className="absolute right-2 top-2 rounded-full bg-yellow-500/80 px-2 py-0.5 text-xs font-semibold text-black">
                                        ★ Featured
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 p-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-semibold text-white line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <span
                                        className={`ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${item.status === "active"
                                            ? "bg-green-600/20 text-green-400"
                                            : "bg-red-600/20 text-red-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Category: {item.category}
                                </p>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-600 py-2 text-sm text-white transition hover:bg-blue-700"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(item.id, item.title)}
                                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-600 py-2 text-sm text-white transition hover:bg-red-700"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ---------- Add/Edit Modal ---------- */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                            <h2 className="text-xl font-semibold text-white">
                                {isEditMode ? "Edit Image" : "Add New Image"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-slate-800 hover:text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="mt-5 space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Gallery Image *
                                </label>
                                <div className="flex flex-col items-center gap-3 sm:flex-row">
                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                                        {formData.imageUrl ? (
                                            <img
                                                src={formData.imageUrl}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-500">
                                                <Eye size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-800 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                                        />
                                        {formErrors.imageUrl && (
                                            <p className="mt-1 text-sm text-red-400">
                                                {formErrors.imageUrl}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Image Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                />
                                {formErrors.title && (
                                    <p className="mt-1 text-sm text-red-400">{formErrors.title}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.category && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {formErrors.category}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Display Order */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        name="displayOrder"
                                        value={formData.displayOrder}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                    />
                                    {formErrors.displayOrder && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {formErrors.displayOrder}
                                        </p>
                                    )}
                                </div>

                                {/* Featured */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Featured
                                    </label>
                                    <select
                                        name="featured"
                                        value={formData.featured ? "yes" : "no"}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                featured: e.target.value === "yes",
                                            }))
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                onClick={closeModal}
                                className="rounded-lg border border-slate-700 px-6 py-2.5 text-gray-300 transition hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveGalleryItem}
                                className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
                            >
                                {isEditMode ? "Update Image" : "Save Image"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------- Delete Confirmation Modal ---------- */}
            {deleteModal.isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={cancelDelete}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-white">
                            Delete Image
                        </h3>
                        <p className="mt-2 text-gray-300">
                            Are you sure you want to delete "
                            <span className="font-medium text-white">
                                {deleteModal.itemTitle}
                            </span>
                            "? This action cannot be undone.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                onClick={cancelDelete}
                                className="rounded-lg border border-slate-700 px-6 py-2.5 text-gray-300 transition hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteGalleryItem}
                                className="rounded-lg bg-red-600 px-6 py-2.5 font-medium text-white transition hover:bg-red-700"
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

export default Gallery;