import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { api } from '../lib/axios'
const CreateNotePage = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("All fields necessary", {
                icon: "💀"
            })
            return;
        }
        setLoading(true)
        try {
            await api.post("/", {
                title,
                content
            });
            toast.success("post is created")
            navigate('/')

        } catch (error) {
            toast.error("Post is not created")
            console.log(`create post error ${error}`)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <Link to={"/"} className="btn btn-ghost mb-6 flex items-center gap-2">
                    <ArrowLeftIcon className="size-5" />
                    Back to Notes
                </Link>

                <div className="card bg-base-100 shadow-lg rounded-xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold mb-6 text-center">Create New Note</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter note title "
                                    className="input w-full focus:outline-none"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered w-full h-32 focus:outline-none"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "Create Note"
                                    )}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNotePage