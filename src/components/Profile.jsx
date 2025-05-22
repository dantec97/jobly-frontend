import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import JoblyAPI from "../API/JoblyAPI";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!currentUser) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      setError("Password required to confirm changes.");
      return;
    }
    try {
      const updatedUser = await JoblyAPI.updateUserProfile(currentUser.username, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setCurrentUser(updatedUser);
      setFormData(f => ({ ...f, password: "" }));
      setSuccess(true);
    } catch (err) {
      setError("Update failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Profile updated!</div>}
      <div>
        <label>Username: {currentUser.username}</label>
      </div>
      <div>
        <label>First Name:</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default Profile;