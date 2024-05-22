import Header from './Components/Header';
import Note from './Components/Note';
import Count from './Components/Count';
import './App.css';
import React, { useState, useEffect } from 'react';
import CreateArea from './CreateArea';
import moment from 'moment';
import SearchFilterBar from './Components/SearchFilterBar';
import axios from 'axios';


function App() {
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  // const backendUrl = 'https://google-keep-ecru.vercel.app/'

  useEffect(() => {
    axios.get('http://localhost:4000/Gkeep-notes')
    .then(response => {
      setNotes(response.data);
      setFilteredNotes(response.data); 
    })
    .catch(e => console.error('Error fetching notes:', e));
  }, []);


  function addNote(newNote) {
    const currentDate = moment();
    const formattedDate = currentDate.format("Do MMMM YYYY");
    const formattedTime = currentDate.format("h:mm a");

    newNote = { ...newNote, date: formattedDate, time: formattedTime };
    axios.post('http://localhost:4000/Gkeep-notes', newNote, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      const savedNote = response.data;
      // console.log('Saved note:', savedNote);
      setNotes(prevValue => {
        const updatedNotes = [...prevValue, savedNote];
        setFilteredNotes(updatedNotes);
        return updatedNotes;
      });
    })
    .catch(e => console.error('Error adding note:', e));
  }

  function deleteNotes(id) {
    axios.delete(`http://localhost:4000/Gkeep-notes/${id}`)
    .then(response => {
      // console.log('Delete response:', response); 
      setNotes(prevValue => {
        const updatedNotes = prevValue.filter(note => note._id !== id);
        setFilteredNotes(updatedNotes);
        return updatedNotes;
      });
    })
    .catch(e => console.error('Error deleting note:', e));
  }

  function editHandler(id, updatedTitle, updatedContent) {
    axios.patch(`http://localhost:4000/Gkeep-notes/${id}`, {
    title: updatedTitle,
    content: updatedContent
  }, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      const updatedNote = response.data;
      // console.log('Updated note:', updatedNote); 
      setNotes(prevValue => {
        const updatedNotes = prevValue.map(note =>
          note._id === id ? updatedNote : note
        );
        setFilteredNotes(updatedNotes);
        return updatedNotes;
      });
      setEditToggle(null);
    })
    .catch(e => console.error('Error editing note:', e));
  }


  function handleFilterNote(filter) {
    let filteredData = [...notes];

    if (filter === "Default" || filter === "All") {
      filteredData = [...notes];
    } else if (filter === "New to old") {
      filteredData = [...notes].sort((a, b) =>
        moment(a.date).isBefore(moment(b.date)) ? 1 : -1
      );
    } else if (filter === "Old to New") {
      filteredData = [...notes].sort((a, b) =>
        moment(a.date).isBefore(moment(b.date)) ? -1 : 1
      );
    }
    setFilteredNotes(filteredData)
  }

  return (
    <div>
      <Header />
      <Count count={notes.length === 0 ? "Empty" : `${notes.length} Notes in Database`} />
      <CreateArea notes={notes} onAdd={addNote} />
      <div className="search-filter">
        <SearchFilterBar
          handleSearchNote={setSearchText}
          handleFilterNote={handleFilterNote}
        />
      </div>
      {filteredNotes
        .filter((note) =>
          note.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((note) =>
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              date={note.date}
              time={note.time}
              onDelete={deleteNotes}
              onEdit={editHandler}
              editToggle={editToggle}
              setEditToggle={setEditToggle}
            />
        )}
    </div>
  );
}

export default App;