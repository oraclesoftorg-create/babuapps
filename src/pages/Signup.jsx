import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      return toast.error("All fields are required");
    }
    
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    
    try {
      const response = await axios.post("https://api.app.immi-gov-au.com/auth/signup", formData);
      if (response.data.success) {
        toast.success("Signup successful");
        navigate("/login")
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Toaster/>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
