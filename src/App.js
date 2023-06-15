import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/users', newUser);
      setNewUser({});
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/users/${id}`, updatedUser);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/avpi/v1/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>User CRUD</h2>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="User ID"
          value={newUser.userid || ''}
          onChange={(e) => setNewUser({ ...newUser, userid: e.target.value })}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.namalengkap || ''}
          onChange={(e) =>
            setNewUser({ ...newUser, namalengkap: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username || ''}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password || ''}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Status"
          value={newUser.status || ''}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.namalengkap}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => updateUser(user.userid, user)}>
                  Update
                </button>
                <button onClick={() => deleteUser(user.userid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCrud;
