import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const loadedData = use(usersPromise);
  const [users, setUsers] = useState(loadedData);
  const [id, setId] = useState("");
  console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          alert("Added Successfully");
          setUsers([...users, data]);
          e.target.reset();
        }
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("Deleted");
          const filter = users.filter((user) => user._id !== id);
          setUsers(filter);
        }
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <button type="submit">Add User</button>
      </form>
      <h2>All Users</h2>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name}: {user.email}
            <button onClick={() => handleDelete(user._id)}>X</button>
            <button onClick={() => setId(user._id)}>Details</button>
          </p>
        ))}
      </div>
      <form onSubmit={handleUpdate}>
        <input type="text" name="id" placeholder="Id" defaultValue={id} />
        <br />
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Users;
