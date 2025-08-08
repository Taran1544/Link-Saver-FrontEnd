import React, { useState } from "react";
import axios from '../api/axios';
import '../styles/AddBookmarkForm.css';

const AddBookmarkForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 🔒 prevent multiple submissions

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (isSubmitting) return;

    setIsSubmitting(true); // 🔐 lock form

    try {
      const res = await axios.post("/bookmarks", { title, url }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res && res.data) {
        onAdd(res.data);
        setTitle("");
        setUrl("");
      } else {
        console.error("Failed to add bookmark:", res.data.message);
      }
    } catch (err) {
      console.error("Error adding bookmark:", err);
    } finally {
      setIsSubmitting(false); // 🔓 unlock form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-bookmark-form">
      <input
        type="text"
        placeholder="🔖 Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="🌐 URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "➕ Add"}
      </button>
    </form>
  );
};

export default AddBookmarkForm;
