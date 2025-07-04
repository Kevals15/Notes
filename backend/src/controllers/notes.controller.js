import { Note } from "../models/notes.model.js"


const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 })
        if (!notes) {
            return res.status(404).json({ message: "notes not found" })
        }

        return res.status(200).json(notes)
    } catch (error) {
        console.log(`error while fetching notes ${error}`);
        return res.status(500).json({ message: "Internal server error" })
    }
}

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: "All fields are necessary" })
        }

        if (title.length == 0 || content.length == 0) {
            return res.status(400).json({ message: "All fields are necessary" })
        }

        const note = await Note.create({
            title: title,
            content: content
        })

        return res.status(201).json(note)
    } catch (error) {
        console.log(`error while creating note ${error}`);
        return res.status(500).json({ message: "Internal server error" })
    }
}

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true })

        return res.status(200).json(note)
    } catch (error) {
        console.log(`update note error ${error}`);
        return res.status(500).json({ message: "internal server error" })
    }
}

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({ message: "note is not found" })
        }

        await Note.deleteOne(note._id)

        return res.status(200).json({ message: "note deleted" })
    } catch (error) {
        console.log(`delete note error ${error}`);
        return res.status(500).json({ message: "internal server error" })
    }
}

const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({ message: "note is not found" })
        }
        return res.status(200).json(note)
    } catch (error) {
        console.log(`single note fetch error ${error}`);
        return res.status(500).json({ message: "internal server error" })
    }
}

export {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNote
}