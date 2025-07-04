import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { api } from '../lib/axios';
import toast from 'react-hot-toast';

// Simple date formatting function
function formatDate(date) {
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const NoteCard = ({ note, setNotes }) => {
    const navigate = useNavigate();

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure want to delete this note")) return;
        try {
            await api.delete(`/${id}`)
            toast.success("note deleted")
            setNotes((prev) => prev.filter((note) => note._id !== id))
            navigate('/')
        } catch (error) {
            toast.error("not deleted", {
                "icon": "💀"
            })
            console.log(`delete error ${error}`)
        }
    }

    return (
        <Link
            to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e, note._id)}
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard