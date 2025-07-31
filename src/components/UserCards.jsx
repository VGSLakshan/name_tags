import React, { useState } from "react";
import axios from "axios";
import "../Styles/UserCard.css";

export default function UserCards({ users , setUsers}) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ firstName: "", lastName: "", description: "" });

    const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  const startEditing = (user) => {
    setEditingId(user._id);
    setEditForm({ firstName: user.firstName, lastName: user.lastName, description: user.description });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const res = await axios.put(`http://localhost:5000/api/users/${editingId}`, editForm);
    setUsers(users.map(user => (user._id === editingId ? res.data : user)));
    setEditingId(null);
  };


  return (
    <div className="card-container">
      {users.map((user) => (
        <div key={user._id} className="user-card">
          {editingId === user._id ? (
            <>
              <input name="firstName" value={editForm.firstName} onChange={handleEditChange} />
              <input name="lastName" value={editForm.lastName} onChange={handleEditChange} />
              <textarea name="description" value={editForm.description} onChange={handleEditChange} />
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{user.firstName} {user.lastName}</h3>
              <p>{user.description}</p>
              <button onClick={() => startEditing(user)}>Edit</button>
              <button onClick={() => deleteUser(user._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
