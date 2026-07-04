import { useState } from "react";
import { FiHome, FiSettings, FiBell, FiMenu } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import Swal from "sweetalert2"; // Added missing import

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [likes, setLikes] = useState("");
  const [image, setImage] = useState(null); // Stores image preview URL
  const [imageFile, setImageFile] = useState(null); // Stores actual file
  const [imageName, setImageName] = useState("");
  const [name, set_name] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Generate preview URL
      setImageFile(file); // Store actual file
      setImageName(file.name);
    }
  };

  const handleSubmit = async () => {
    if (!comment || !rating || !likes) {
      toast.error("All fields are required!");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating);
    formData.append("likes", likes);
    formData.append("image", imageFile); // Use actual file
    formData.append("name", name);

    try {
      const response = await axios.post(
        "https://api.app.immi-gov-au.com/admin/comments",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        toast.success("Comment added successfully!");
        setComment("");
        setRating("");
        setLikes("");
        setImage(null);
        setImageFile(null);
        set_name("");
        setImageName("");
      }
    } catch (error) {
      toast.error("Failed to submit comment");
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove both token and admin_data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("admin_data");
        
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster />
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-md p-4 transition-all duration-300`}
      >
        <button
          className="text-gray-700 text-xl mb-6"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu />
        </button>
        <ul>
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg"
          >
            <FiHome /> {sidebarOpen && "Dashboard"}
          </NavLink>
          <NavLink
            to="/comments-list"
            className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg"
          >
            <FiBell /> {sidebarOpen && "Comment List"}
          </NavLink>
          <NavLink className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <FiSettings /> {sidebarOpen && "Settings"}
          </NavLink>
          <li
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            <HiOutlineLogout /> {sidebarOpen && "Logout"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-[10px] py-6">
        <h1 className="text-[20px] font-semibold mb-[10px]">Admin Dashboard</h1>
        <div className="w-full bg-white shadow-lg p-6 rounded-lg flex flex-col gap-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FiBell className="text-indigo-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-800">Add Comment</h2>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Name"
            value={name}
            onChange={(e) => set_name(e.target.value)}
          />
          <textarea
            className="w-full p-3 border border-gray-200 rounded-[5px] h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <label className="text-sm text-gray-600">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <label className="text-sm text-gray-600">Likes:</label>
          <input
            type="number"
            min="0"
            className="w-full p-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
          <label className="text-sm text-gray-600">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-200 rounded-[5px] cursor-pointer"
          />
          {image && (
            <div className="mt-4 flex flex-col items-center">
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
              <p className="text-gray-600 mt-2 text-sm">{imageName}</p>
            </div>
          )}

          <button
            className="bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}