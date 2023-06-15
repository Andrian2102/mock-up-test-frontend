import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userid, setUserId] = useState('');
  const [namalengkap, setNamalengkap] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      const newUser = {
        userid: userid,
        namalengkap: namalengkap,
        username: username,
        password: password,
        status: status
      };

      const response = await axios.post('http://localhost:8080/api/v1/users', newUser);
      setUsers([...users, response.data]);

      // Clear input fields
      setUserId('');
      setNamalengkap('');
      setUsername('');
      setPassword('');
      setStatus('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userid) => {
    try {
      const updatedUser = {
        namalengkap: namalengkap,
        username: username,
        password: password,
        status: status
      };

      const response = await axios.put(`http://localhost:8080/api/v1/users/${userid}`, updatedUser);

      // Update the users array with the updated user
      const updatedUsers = users.map(user => user.userid === userid ? response.data : user);
      setUsers(updatedUsers);

      // Clear input fields
      setUserId('');
      setNamalengkap('');
      setUsername('');
      setPassword('');
      setStatus('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userid) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userid}`);

      // Remove the user from the users array
      const filteredUsers = users.filter(user => user.userid !== userid);
      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Form */}
      <form onSubmit={addUser}>
        <label>
          User ID:
          <input type="text" value={userid} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Full Name:
          <input type="text" value={namalengkap} onChange={(e) => setNamalengkap(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>

      {/* User List */}
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.namalengkap}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => updateUser(user.userid)}>Edit</button>
                <button onClick={() => deleteUser(user.userid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
