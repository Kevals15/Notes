import React from 'react'
import { Router, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage'
import CreateNotePage from './pages/CreateNotePage'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Toaster position='top-center' reverseOrder='true' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
        <Route path='/create' element={<CreateNotePage />} />
      </Routes>
    </div >
  )
}

export default App
