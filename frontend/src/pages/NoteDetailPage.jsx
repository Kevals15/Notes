import React, { useEffect, useState } from 'react';
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router'; // fixed imports
import toast from 'react-hot-toast';
import { api } from '../lib/axios';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Error in fetching note", error);
                toast.error("Failed to fetch the note");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/${id}`);
            toast.success("Note deleted");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the note:", error);
            toast.error("Failed to delete note");
        }
    };

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/");
        } catch (error) {
            console.log("Error saving the note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <div className="flex items-center justify-between mb-4">
                    <Link to="/" className="btn btn-ghost">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to Notes
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error btn-outline">
                        <Trash2Icon className="h-5 w-5" />
                        Delete Note
                    </button>
                </div>

                <div className="card bg-base-100 shadow-lg rounded-xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Note</h2>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Note title"
                                className="input input-bordered w-full rounded-md focus:outline-none focus:ring-0"
                                value={note.title}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <textarea
                                placeholder="Write your note here..."
                                className="textarea textarea-bordered w-full rounded-md focus:outline-none focus:ring-0 "
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                onClick={handleSave}
                                className="btn btn-primary px-6"
                                disabled={saving}
                            >
                                {saving ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;
