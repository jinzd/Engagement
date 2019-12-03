import React from "react";

const MyProfile = props => {
  const { username, email } = props.user;
  return (
    <>
      <div className="container w-50">
        <h1>MyProfile</h1>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-xl-5 border">
            <img
              src="https://www.livelingua.com/img/profilesTeachers/103/Guillaume-Deneufbourg-Square_Profile_S.jpg"
              className="myprofilepic"
              alt="profile_pic"
            />
          </div>
          <div className="col-xl-7 col-xl-7 border">
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
