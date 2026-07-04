import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";
import { MdOutlineStar } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function RatingReview() {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchComments();
  }, []);
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetch("https://api.app.immi-gov-au.com/admin/ratings-summary")
      .then((res) => res.json())
      .then((data) => {
        setRating(data.rating);
        setTotalReviews(data.totalReviews);
        setRatings(data.ratings);
      })
      .catch((error) => console.error("Error fetching ratings:", error));
  }, []);
  return (
    <div className="w-full bg-white text-gray-900">
      <div className="w-full py-4 bg-white ">
        <h2 className="text-lg font-semibold mb-2 text-right">Ratings and reviews</h2>

        {/* Overall Rating and Stars */}
        <div className="flex items-center justify-end">
          <div className="mr-2 flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-[25px] font-bold">{rating}</span>
        </div>
        <p className="text-sm text-gray-500 text-right">Review: {totalReviews}</p>

        {/* Rating Breakdown */}
        <div className="mt-4">
          {ratings.map(({ stars, count }) => (
            <div key={stars} className="flex items-center mb-1 justify-end">
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mx-2">
                <div
                  className="h-full bg-green-500"
                  style={{ width: totalReviews ? `${(count / totalReviews) * 100}%` : "0%" }}
                ></div>
              </div>
              <span className="w-5 text-sm font-medium text-right">{stars}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-sm">Review: 5</p>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <Toaster />
        {loading ? (
          <p className="text-gray-600">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-600">No comments available.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center mb-2">
                <img
                  src={`https://api.app.immi-gov-au.com/images/${comment.image}` || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-gray-500 text-sm">{comment?.createdAt.slice(0, 10)}</p>
                </div>
              </div>
              <div className="flex text-green-500 mb-2">
                {[...Array(comment.rating || 0)].map((_, i) => (
                  <MdOutlineStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {comment.comment}
              </p>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-1 cursor-pointer">
                  <BiLike size={20} /> <span>{comment.likes}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-gray-600 text-sm">Is this app easy for you?</p>
        <div className="flex gap-4 mt-2">
          <button className="px-4 py-1 border border-gray-300 rounded-md">Yes</button>
          <button className="px-4 py-1 border border-gray-300  rounded-md">No</button>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="font-semibold">Government</p>
        <p className="text-gray-500 text-sm">Government

          12.01.2025

        </p>
        <p className="text-gray-700 text-sm">Thanks for your feedback! We are happy to hear loud voices</p>
      </div>
    </div>
  );
}