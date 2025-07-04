import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from '../controllers/notes.controller.js'
const router = Router();

router.get('/', getAllNotes)
router.post('/', createNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)
router.get('/:id',getNote)

export default router;