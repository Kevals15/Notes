import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-hot-toast'
import { Loader } from 'lucide-react'
// Import NoteCard and NotesNotFound if not already imported
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import { api } from '../lib/axios'

const HomePage = () => {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchnotes = async () => {
            try {
                const res = await api.get("/");
                console.log(res.data)
                setNotes(res.data);
                toast.success("Notes fetched", {
                    duration: 600
                })

            } catch (error) {
                console.log(`error fetching notes ${error}`)
                if (notes.length === 0) {
                    toast.error("No notes available")
                }
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchnotes();
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {isLoading && <div className="text-center text-primary py-10 flex justify-center items-center">
                    <Loader className='animate-spin ' />
                </div>}

                {notes.length === 0 && !isLoading && <NotesNotFound />}

                {notes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage