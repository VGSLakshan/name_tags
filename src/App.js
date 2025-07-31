import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>User Card Submission</h1>

      <UserForm onUserAdded={addUser} />
      <UserCards users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
