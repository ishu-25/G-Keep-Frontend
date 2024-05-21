import React, { useState } from 'react';
import { MdEdit, MdSaveAs, MdDelete } from "react-icons/md";
import { ImCancelCircle } from 'react-icons/im';

function Note({ title, content,date,time, onDelete, id, onEdit, editToggle, setEditToggle  }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedTitle(title);
      setEditedContent(content);
    }
    setIsEditing(!isEditing);
    setEditToggle(isEditing ? null : id);
  };

  const handleSaveEdit = () => {
    onEdit(id, editedTitle, editedContent); 
    setIsEditing(false);
    setEditToggle(null);
  };

  const handleCancelClick = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(false);
    setEditToggle(null);
  };

  return (
    <div className='note'>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
        </>
      )}

      <h2>{date}</h2>
      <h2>{time}</h2>
      

      {isEditing ?  (
        <>
          <button className="save-note" onClick={handleSaveEdit}>
            <MdSaveAs size={19} />
          </button>
          <button className="cancel-note" onClick={handleCancelClick}>
            <ImCancelCircle size={19} />
          </button>
        </>
      ) : (
        <>
        <button onClick={handleEditToggle}>
          <MdEdit size={21} />
        </button>
        <button onClick={() => onDelete(id)}>
          <MdDelete size={21} />
        </button>
        </>
      )}
    </div>
  );
}

export default Note;
