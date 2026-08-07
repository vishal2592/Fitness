import React, { useEffect, useState } from "react";
import {
    FileText,
    BookOpen,
    PenTool,
    FolderOpen,
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    X,
    Calendar,
    Clock,
    User,
    Tag,
    CheckCircle,
    XCircle,
    AlertCircle,
    Star,
    Globe,
} from "lucide-react";
import { useSelector } from "react-redux";

import gymBlogs from "../Data/Gym/blogData";
import yogaBlogs from "../Data/Yoga/blogData";

const categories = ["Workout", "Yoga", "Transformation", "Events", "Trainers", "Facilities", "Others"];
const statuses = ["published", "draft", "archived"];

// ---------- Main Component ----------
const Blog = () => {
    const currentMode = useSelector((state) => state.mode.currentMode);

    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    // Modal states
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);

    // View modal
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewBlog, setViewBlog] = useState(null);

    // Delete modal
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, blogId: null, title: "" });

    // Form state
    const initialFormState = {
        title: "",
        slug: "",
        category: categories[0],
        author: "",
        publishDate: "",
        readingTime: 0,
        status: "draft",
        featured: false,
        shortDescription: "",
        content: "",
        imageUrl: "",
        imageFile: null,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
    };
    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});

    // ---------- Handlers ----------
    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleFilterStatus = (e) => setFilterStatus(e.target.value);
    const handleFilterCategory = (e) => setFilterCategory(e.target.value);

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentBlogId(null);
        setFormData({ ...initialFormState, publishDate: new Date().toISOString().slice(0, 10) });
        setFormErrors({});
        setIsAddEditModalOpen(true);
    };

    useEffect(() => {
        if (currentMode === "gym") {
            setBlogs(gymBlogs);
        } else {
            setBlogs(yogaBlogs);
        }
    }, [currentMode]);

    const openEditModal = (blog) => {
        setIsEditMode(true);
        setCurrentBlogId(blog.id);
        setFormData({
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            author: blog.author,
            publishDate: blog.publishDate,
            readingTime: blog.readingTime,
            status: blog.status,
            featured: blog.featured,
            shortDescription: blog.shortDescription,
            content: blog.content,
            imageUrl: blog.imageUrl,
            imageFile: null,
            metaTitle: blog.metaTitle || "",
            metaDescription: blog.metaDescription || "",
            metaKeywords: blog.metaKeywords || "",
        });
        setFormErrors({});
        setIsAddEditModalOpen(true);
    };

    const closeModal = () => {
        setIsAddEditModalOpen(false);
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        // Auto-generate slug from title (only if editing title and not manually changed)
        if (name === "title") {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setFormData((prev) => ({
                ...prev,
                title: value,
                slug: slug,
                [name]: value,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: newValue }));
        }

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
        if (!formData.slug.trim()) errors.slug = "Slug is required";
        if (!formData.category) errors.category = "Category is required";
        if (!formData.author.trim()) errors.author = "Author is required";
        if (!formData.publishDate) errors.publishDate = "Publish date is required";
        if (formData.readingTime <= 0) errors.readingTime = "Reading time must be > 0";
        if (!formData.shortDescription.trim()) errors.shortDescription = "Short description is required";
        if (!formData.content.trim()) errors.content = "Content is required";
        if (!formData.imageUrl && !formData.imageFile) errors.imageUrl = "Image is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveBlog = () => {
        if (!validateForm()) return;

        const newBlog = {
            id: isEditMode ? currentBlogId : Date.now(),
            title: formData.title,
            slug: formData.slug,
            category: formData.category,
            author: formData.author,
            publishDate: formData.publishDate,
            readingTime: Number(formData.readingTime),
            status: formData.status,
            featured: formData.featured,
            shortDescription: formData.shortDescription,
            content: formData.content,
            imageUrl: formData.imageUrl,
            metaTitle: formData.metaTitle,
            metaDescription: formData.metaDescription,
            metaKeywords: formData.metaKeywords,
        };

        if (isEditMode) {
            setBlogs((prev) => prev.map((b) => (b.id === currentBlogId ? newBlog : b)));
        } else {
            setBlogs((prev) => [newBlog, ...prev]);
        }
        closeModal();
    };

    const openViewModal = (blog) => {
        setViewBlog(blog);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setViewBlog(null);
    };

    const confirmDelete = (id, title) => {
        setDeleteModal({ isOpen: true, blogId: id, title });
    };

    const deleteBlog = () => {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteModal.blogId));
        setDeleteModal({ isOpen: false, blogId: null, title: "" });
    };

    const cancelDelete = () => {
        setDeleteModal({ isOpen: false, blogId: null, title: "" });
    };

    // ---------- Computed Stats ----------
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter((b) => b.status === "published").length;
    const draftBlogs = blogs.filter((b) => b.status === "draft").length;
    const categoriesCount = new Set(blogs.map((b) => b.category)).size;

    // ---------- Filtered Blogs ----------
    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus ? blog.status === filterStatus : true;
        const matchesCategory = filterCategory ? blog.category === filterCategory : true;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // ---------- Render ----------
    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                        {currentMode === "gym"
                            ? "Gym Blogs"
                            : "Yoga Blogs"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                        {currentMode === "gym"
                            ? "Manage all Blogs"
                            : "Manage all Blogs"}
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add Blog
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Blogs</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">{totalBlogs}</h3>
                        </div>
                        <FileText size={34} className="text-blue-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Published Blogs</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">{publishedBlogs}</h3>
                        </div>
                        <BookOpen size={34} className="text-green-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Draft Blogs</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">{draftBlogs}</h3>
                        </div>
                        <PenTool size={34} className="text-yellow-500" />
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Categories</p>
                            <h3 className="mt-2 text-3xl font-bold text-white">{categoriesCount}</h3>
                        </div>
                        <FolderOpen size={34} className="text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        value={filterStatus}
                        onChange={handleFilterStatus}
                        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                    <select
                        value={filterCategory}
                        onChange={handleFilterCategory}
                        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Blog Table */}
            {filteredBlogs.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-center">
                    <FileText size={48} className="text-gray-500" />
                    <p className="mt-3 text-gray-400">
                        {searchTerm || filterStatus || filterCategory
                            ? "No blogs match your filters."
                            : "No blogs yet. Click 'Add Blog' to create one."}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">
                    <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-800">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">
                                    Image
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">
                                    Title
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-400 lg:table-cell">
                                    Category
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-400 md:table-cell">
                                    Author
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-400 xl:table-cell">
                                    Date
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-400 2xl:table-cell">
                                    Reading
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-400">
                                    Featured
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {filteredBlogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-slate-800/50">
                                    <td className="px-4 py-3">
                                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-700">
                                            {blog.imageUrl ? (
                                                <img
                                                    src={blog.imageUrl}
                                                    alt={blog.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-gray-500">
                                                    <FileText size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-white line-clamp-1">
                                            {blog.title}
                                        </span>
                                    </td>
                                    <td className="hidden px-4 py-3 text-sm text-gray-300 lg:table-cell">
                                        {blog.category}
                                    </td>
                                    <td className="hidden px-4 py-3 text-sm text-gray-300 md:table-cell">
                                        {blog.author}
                                    </td>
                                    <td className="hidden px-4 py-3 text-sm text-gray-300 xl:table-cell">
                                        {blog.publishDate}
                                    </td>
                                    <td className="hidden px-4 py-3 text-sm text-gray-300 2xl:table-cell">
                                        {blog.readingTime} min
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${blog.status === "published"
                                                ? "bg-green-600/20 text-green-400"
                                                : blog.status === "draft"
                                                    ? "bg-yellow-600/20 text-yellow-400"
                                                    : "bg-red-600/20 text-red-400"
                                                }`}
                                        >
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {blog.featured ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-600/20 px-2 py-0.5 text-xs font-medium text-yellow-400">
                                                <Star size={12} /> Yes
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">No</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openViewModal(blog)}
                                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-slate-700 hover:text-white"
                                                title="View"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => openEditModal(blog)}
                                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-slate-700 hover:text-white"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(blog.id, blog.title)}
                                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-slate-700 hover:text-red-400"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ---------- Add/Edit Modal ---------- */}
            {isAddEditModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                            <h2 className="text-xl font-semibold text-white">
                                {isEditMode ? "Edit Blog" : "Add New Blog"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-slate-800 hover:text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="mt-5 space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Blog Thumbnail *
                                </label>
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                                        {formData.imageUrl ? (
                                            <img
                                                src={formData.imageUrl}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-500">
                                                <FileText size={32} />
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
                                            <p className="mt-1 text-sm text-red-400">{formErrors.imageUrl}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Title */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Blog Title *
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
                                {/* Slug */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Slug (auto-generated)
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                    />
                                    {formErrors.slug && (
                                        <p className="mt-1 text-sm text-red-400">{formErrors.slug}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Category */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Blog Category *
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
                                        <p className="mt-1 text-sm text-red-400">{formErrors.category}</p>
                                    )}
                                </div>
                                {/* Author */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Author Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                    />
                                    {formErrors.author && (
                                        <p className="mt-1 text-sm text-red-400">{formErrors.author}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Publish Date */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Publish Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="publishDate"
                                        value={formData.publishDate}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                    />
                                    {formErrors.publishDate && (
                                        <p className="mt-1 text-sm text-red-400">{formErrors.publishDate}</p>
                                    )}
                                </div>
                                {/* Reading Time */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">
                                        Reading Time (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        name="readingTime"
                                        value={formData.readingTime}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                    />
                                    {formErrors.readingTime && (
                                        <p className="mt-1 text-sm text-red-400">{formErrors.readingTime}</p>
                                    )}
                                </div>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Short Description *
                                </label>
                                <textarea
                                    name="shortDescription"
                                    rows="2"
                                    value={formData.shortDescription}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                />
                                {formErrors.shortDescription && (
                                    <p className="mt-1 text-sm text-red-400">{formErrors.shortDescription}</p>
                                )}
                            </div>

                            {/* Full Content */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    Full Blog Content *
                                </label>
                                <textarea
                                    name="content"
                                    rows="5"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none focus:border-blue-500"
                                />
                                {formErrors.content && (
                                    <p className="mt-1 text-sm text-red-400">{formErrors.content}</p>
                                )}
                            </div>

                            {/* SEO */}
                            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                                <h3 className="mb-3 text-sm font-semibold text-white">SEO</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-sm text-gray-300">Meta Title</label>
                                        <input
                                            type="text"
                                            name="metaTitle"
                                            value={formData.metaTitle}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm text-gray-300">Meta Description</label>
                                        <textarea
                                            name="metaDescription"
                                            rows="2"
                                            value={formData.metaDescription}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm text-gray-300">Meta Keywords</label>
                                        <input
                                            type="text"
                                            name="metaKeywords"
                                            value={formData.metaKeywords}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Visibility */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                onClick={closeModal}
                                className="rounded-lg border border-slate-700 px-6 py-2.5 text-gray-300 transition hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveBlog}
                                className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
                            >
                                {isEditMode ? "Update Blog" : "Save Blog"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------- View Modal ---------- */}
            {isViewModalOpen && viewBlog && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={closeViewModal}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                            <h2 className="text-xl font-semibold text-white">Blog Preview</h2>
                            <button
                                onClick={closeViewModal}
                                className="rounded-lg p-1 text-gray-400 hover:bg-slate-800 hover:text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>
                        <div className="mt-5 space-y-4">
                            {viewBlog.imageUrl && (
                                <div className="h-56 w-full overflow-hidden rounded-lg bg-slate-800">
                                    <img
                                        src={viewBlog.imageUrl}
                                        alt={viewBlog.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-white">{viewBlog.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Tag size={14} /> {viewBlog.category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User size={14} /> {viewBlog.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} /> {viewBlog.publishDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} /> {viewBlog.readingTime} min read
                                </span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${viewBlog.status === "published"
                                        ? "bg-green-600/20 text-green-400"
                                        : viewBlog.status === "draft"
                                            ? "bg-yellow-600/20 text-yellow-400"
                                            : "bg-red-600/20 text-red-400"
                                        }`}
                                >
                                    {viewBlog.status}
                                </span>
                                {viewBlog.featured && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-600/20 px-2 py-0.5 text-xs font-medium text-yellow-400">
                                        <Star size={12} /> Featured
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-300">Short Description</h4>
                                <p className="text-gray-400">{viewBlog.shortDescription}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-300">Full Content</h4>
                                <div className="prose prose-invert max-w-none text-gray-300">
                                    {viewBlog.content}
                                </div>
                            </div>
                            {(viewBlog.metaTitle || viewBlog.metaDescription || viewBlog.metaKeywords) && (
                                <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                                    <h4 className="text-sm font-semibold text-gray-300">SEO</h4>
                                    {viewBlog.metaTitle && (
                                        <p className="text-sm text-gray-400">
                                            <span className="font-medium">Title:</span> {viewBlog.metaTitle}
                                        </p>
                                    )}
                                    {viewBlog.metaDescription && (
                                        <p className="text-sm text-gray-400">
                                            <span className="font-medium">Description:</span> {viewBlog.metaDescription}
                                        </p>
                                    )}
                                    {viewBlog.metaKeywords && (
                                        <p className="text-sm text-gray-400">
                                            <span className="font-medium">Keywords:</span> {viewBlog.metaKeywords}
                                        </p>
                                    )}
                                </div>
                            )}
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
                        <h3 className="text-lg font-semibold text-white">Delete Blog</h3>
                        <p className="mt-2 text-gray-300">
                            Are you sure you want to delete "
                            <span className="font-medium text-white">{deleteModal.title}</span>
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
                                onClick={deleteBlog}
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

export default Blog;