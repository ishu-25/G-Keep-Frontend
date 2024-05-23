import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

function CreateArea({ onAdd }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function handleExpanded() {
    setIsExpanded(true);
  }

  const validateNote = () => {
    return note.title.trim() !== "" && note.content.trim() !== "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateNote()) {
      alert("Please enter both a title and content for your note.");
      return;
    }

    onAdd(note);
    setNote({ title: "", content: "" });
    setIsExpanded(false);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {isExpanded && (
            <input
              value={note.title}
              required
              type="text"
              placeholder="Title.."
              name="title"
              onChange={handleChange}
            />
          )}
          <p>
            <textarea
              value={note.content}
              required
              onClick={handleExpanded}
              name="content"
              placeholder="Take a note here..."
              onChange={handleChange}
              rows={isExpanded ? 3 : 1}
            />
          </p>
          <button type="submit">
            <IoIosAdd size={34} />
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateArea;