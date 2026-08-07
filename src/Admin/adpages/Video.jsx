import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import gymVideoData from "../Data/Gym/videoData";
import yogaVideoData from "../Data/Yoga/videoData";

const Video = () => {

    const emptyForm = {
        thumbnail: null,
        title: "",
        type: "Demo",
        video: null,
        duration: "",
        trainer: "",
        status: "Active",
        description: ""
    };

    const [form, setForm] = useState(emptyForm);
    const [showModal, setShowModal] = useState(false);

    const { categoryId } = useParams();
    const [search, setSearch] = useState("");
    const currentMode = useSelector((state) => state.mode.currentMode);
    const sourceVideos = currentMode === "gym" ? gymVideoData : yogaVideoData;
    const [videos, setVideos] = useState(sourceVideos);
    useEffect(() => {
        setVideos(sourceVideos);
    }, [currentMode]);
    const filteredVideos = videos.filter((video) =>
        String(video.categoryId) === String(categoryId) &&
        `${video.title} ${video.type} ${video.status}`.toLowerCase().includes(search.toLowerCase())
    );

    const saveVideo = () => {
        if (!form.title.trim()) return;

        setVideos((currentVideos) => [
            {
                ...form,
                id: Date.now(),
                categoryId: Number(categoryId),
                thumbnail: form.thumbnail ? URL.createObjectURL(form.thumbnail) : "",
                type: form.type.toLowerCase(),
            },
            ...currentVideos,
        ]);
        setForm(emptyForm);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen w-full min-w-0 max-w-full space-y-5 p-3 sm:p-6">

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-white">
                        Category Videos
                    </h2>

                    <p className="text-sm text-gray-400">
                        Category Id : {categoryId}
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 sm:w-auto"
                >
                    <Plus size={18} />
                    Add Video
                </button>
            </div>

            {/* Search */}
            <div className="relative min-w-0">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search videos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none"
                />
            </div>

            {/* Table */}
            <div className="w-full max-w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                <div className="w-full max-w-full overflow-x-auto overscroll-x-contain [touch-action:pan-x]">
                <table className="min-w-[760px] w-full text-sm">

                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Thumbnail</th>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Duration</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-700">
                        {filteredVideos.length > 0 ? filteredVideos.map((video) => (
                            <tr key={video.id} className="text-gray-200 hover:bg-slate-800/70">
                                <td className="px-4 py-3">
                                    {video.thumbnail ? (
                                        <img src={video.thumbnail} alt="" className="h-12 w-20 rounded object-cover" />
                                    ) : (
                                        <div className="flex h-12 w-20 items-center justify-center rounded bg-slate-700 text-xs text-gray-400">No image</div>
                                    )}
                                </td>
                                <td className="px-4 py-3 font-medium text-white">{video.title}</td>
                                <td className="px-4 py-3"><span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs capitalize text-blue-300">{video.type}</span></td>
                                <td className="whitespace-nowrap px-4 py-3">{video.duration || "-"}</td>
                                <td className="px-4 py-3"><span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300">{video.status}</span></td>
                                <td className="px-4 py-3 text-center text-gray-400">-</td>
                            </tr>
                        )) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="py-12 text-center text-gray-400"
                            >
                                No videos found.
                            </td>
                        </tr>
                        )}
                    </tbody>

                </table>
                </div>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

                        <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">

                            <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
                                <h2 className="text-xl font-semibold text-white">
                                    Add New Video
                                </h2>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg p-2 text-gray-400 hover:bg-slate-800 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Video Thumbnail *
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                thumbnail: e.target.files[0],
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Video Title *
                                    </label>

                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Video Type *
                                    </label>

                                    <div className="flex gap-6 pt-3">

                                        <label className="flex items-center gap-2 text-white">
                                            <input
                                                type="radio"
                                                value="Demo"
                                                checked={form.type === "Demo"}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        type: e.target.value,
                                                    })
                                                }
                                            />
                                            Demo
                                        </label>

                                        <label className="flex items-center gap-2 text-white">
                                            <input
                                                type="radio"
                                                value="Premium"
                                                checked={form.type === "Premium"}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        type: e.target.value,
                                                    })
                                                }
                                            />
                                            Premium
                                        </label>

                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Video File *
                                    </label>

                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                video: e.target.files[0],
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Duration
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="12:30"
                                        value={form.duration}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                duration: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Trainer
                                    </label>

                                    <input
                                        type="text"
                                        value={form.trainer}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                trainer: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Status
                                    </label>

                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                status: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>

                                <div className="hidden md:block"></div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                                    />
                                </div>

                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-700 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-slate-600 px-5 py-2 text-white"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={saveVideo}
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                >
                                    Save Video
                                </button>

                            </div>

                        </div>

                    </div>
                )}
            </div>

        </div>
    );
};

export default Video;
