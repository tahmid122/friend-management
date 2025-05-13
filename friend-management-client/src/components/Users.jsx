import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const loadedData = use(usersPromise);
  const [users, setUsers] = useState(loadedData);
  console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };
    console.log(newUser);
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
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
