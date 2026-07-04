import { useState, useEffect } from "react";
import { FiHome, FiSettings, FiBell, FiMenu, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HiOutlineLogout } from "react-icons/hi";

export default function CommentList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("https://api.app.immi-gov-au.com/admin/comments");
      setComments(response.data);
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://api.app.immi-gov-au.com/admin/comments/${id}`);
          toast.success("Comment deleted successfully!");
          setComments(comments.filter((comment) => comment._id !== id));
  
          Swal.fire("Deleted!", "The comment has been deleted.", "success");
        } catch (error) {
          toast.error("Failed to delete comment");
          Swal.fire("Error!", "Failed to delete the comment.", "error");
        }
      }
    });
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
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white p-4 transition-all duration-300`}>
        <button className="text-gray-700 text-xl mb-6" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu />
        </button>
        <ul>
          <NavLink to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <FiHome /> {sidebarOpen && "Dashboard"}
          </NavLink>
          <NavLink to="/comments-list" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <FiBell /> {sidebarOpen && "Comment List"}
          </NavLink>
          <NavLink to="/settings" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <FiSettings /> {sidebarOpen && "Settings"}
          </NavLink>
          <li onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
           <HiOutlineLogout/>  {sidebarOpen && "Logout"} 
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 w-full  bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Comment List</h1>

        {loading ? (
          <p className="text-gray-600">Loading comments...</p>
        ) : (
          <div className="bg-white overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-800 text-left">
                  <th className="border border-gray-300 p-3">Name</th>
                  <th className="border border-gray-300 p-3">Comment</th>
                  <th className="border border-gray-300 p-3">Rating</th>
                  <th className="border border-gray-300 p-3">Likes</th>
                  <th className="border border-gray-300 p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No comments available.
                    </td>
                  </tr>
                ) : (
                  comments.map((comment, index) => (
                    <tr key={index} className="text-gray-700 text-left border-b">
                      <td className="border border-gray-300 p-3">{comment.name}</td>
                      <td className="border border-gray-300 p-3">
                        {comment.comment.length > 50 ? (
                          <span title={comment.comment}>{comment.comment.slice(0, 50)}...</span>
                        ) : (
                          comment.comment
                        )}
                      </td>
                      <td className="border border-gray-300 p-3">{comment.rating}</td>
                      <td className="border border-gray-300 p-3">{comment.likes}</td>
                      <td className="border border-gray-300 p-3">
                        <button
                          className="text-red-500 hover:text-red-700 transition"
                          onClick={() => handleDelete(comment._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
