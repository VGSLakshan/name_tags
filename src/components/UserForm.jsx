import React, { useState } from "react";
import axios from "axios";
import "../Styles/UserForm.css"; // 👈 import the CSS here

export default function UserForm({ onUserAdded }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/users", form);
    onUserAdded(res.data);
    setForm({ firstName: "", lastName: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
