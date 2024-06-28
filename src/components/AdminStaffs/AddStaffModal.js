import React, { useState } from "react";
import { TbX } from "react-icons/tb";

const AddStaffModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    profilePic: "",
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setFormData({ ...formData, profilePic: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding the staff logic here
  };

  return (
    <div
      className="modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "700px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
          }}
        >
          <TbX />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Add Staff</h2>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="mx-auto mb-4"
                style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
            <input type="file" name="profilePic" onChange={handleChange} className="border p-2 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label className="block mb-1">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block mb-1">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Staff</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
