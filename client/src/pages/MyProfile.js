import React from "react";

const MyProfile = props => {
  const { username, id, email, name } = props.user;
  return (
    <>
      <h1>MyProfile</h1>
      <h1>{id}</h1>
      <h1>{name}</h1>
      <h1>{email}</h1>
      <h1>{username}</h1>
    </>
  );
};

export default MyProfile;
