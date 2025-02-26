import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

function StudentNotes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const notesData = localStorage.getItem('notes');
    const parsedNotes = notesData ? JSON.parse(notesData) : [];
    setNotes(parsedNotes);
    inputRef.current.focus();
  }, []);

  function addUpdateNotes() {
    if (!title || !description) {
      showAlert('Please enter title and description!');
      return;
    }

    if (editIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editIndex ? { title, description } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditIndex(null);
    } else {
      const newNotes = [{ title, description }, ...notes];
      setNotes(newNotes);
      localStorage.setItem('notes', JSON.stringify(newNotes));
    }

    setTitle('');
    setDescription('');
    inputRef.current.focus();
  }

  function deleteNotes() {
    setNotes([]);
    localStorage.setItem('notes', JSON.stringify([]));
    showAlert('All notes deleted!');
  }

  function deleteById(id) {
    showAlert(`Deleting note ${id + 1}`);
    const filteredNotes = notes.filter((note, index) => index !== id);
    setNotes(filteredNotes);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    showAlert('Note deleted successfully!');
  }

  function editById(id) {
    setTitle(notes[id].title);
    setDescription(notes[id].description);
    setEditIndex(id);
    inputRef.current.focus();
  }

  function showAlert(message) {
    setModalMessage(message);
    setShowModal(true);
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Student Notes</h1>
      <Modal show={showModal} handleClose={() => setShowModal(false)} title="Notification" message={modalMessage} />
      <div className="card shadow p-4 mt-3">
        <input
          ref={inputRef}
          type="text"
          className="form-control mb-3"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={description}
          placeholder="Write your description..."
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary w-50 me-2" onClick={addUpdateNotes}>{editIndex !== null ? 'Update' : 'Add'}</button>
          <button className="btn btn-danger w-50" onClick={deleteNotes}>Clear All</button>
        </div>
      </div>
      <div className="mt-4">
        {notes.length === 0 ? (
          <p className="text-center text-muted">No notes added</p>
        ) : (
          <div className="row">
            {notes.map((note, index) => (
              <div key={index} className="col-md-6">
                <div className="card mt-3 shadow-sm note-card">
                  <div className="card-body">
                    <h5>{note.title}</h5>
                    <p>{note.description}</p>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-sm btn-secondary me-2" onClick={() => editById(index)}>Edit</button>
                      <button className="btn btn-sm btn-danger me-2" onClick={() => deleteById(index)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentNotes;
