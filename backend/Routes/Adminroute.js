const express=require("express");
const admin_route=express();
const multer=require("multer");
const commentmodel = require("../Models/Commentmodel");
// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

  
  // Add a new comment with image upload
  admin_route.post("/comments", uploadimage.single("image"), async (req, res) => {
    try {
        console.log(req.body)
      const { comment, rating, likes, name } = req.body;
      if (!comment || !rating || !name || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newComment = new commentmodel({
        comment,
        rating,
        likes,
        image: `${req.file.filename}`,
        name,
      });
  
      await newComment.save();
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Server error", error });
    }
  });
  admin_route.get("/ratings-summary", async (req, res) => {
    try {
      const totalReviews = await commentmodel.countDocuments();
      
      if (totalReviews === 0) {
        return res.json({ rating: 0, totalReviews: 0, ratings: [] });
      }
  
      // Calculate average rating
      const averageRating = await commentmodel.aggregate([
        { $group: { _id: null, avgRating: { $avg: "$rating" } } }
      ]);
  
      // Count ratings for each star (1-5)
      const ratingCounts = await commentmodel.aggregate([
        { $group: { _id: "$rating", count: { $sum: 1 } } }
      ]);
  
      // Format ratings count data
      const ratings = Array.from({ length: 5 }, (_, i) => ({
        stars: 5 - i, // Display highest rating first
        count: ratingCounts.find(r => r._id === 5 - i)?.count || 0
      }));
  
      res.json({
        rating: parseFloat(averageRating[0]?.avgRating.toFixed(1)) || 0,
        totalReviews,
        ratings,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  
  // Delete a comment by ID
admin_route.delete("/comments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedComment = await commentmodel.findByIdAndDelete(id);
  
      if (!deletedComment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }
  
      res.json({ success: true, message: "Comment deleted successfully!" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
  // Get all comments
  admin_route.get("/comments", async (req, res) => {
    try {
      const comments = await commentmodel.find().sort({ createdAt: -1 });
      res.status(200).json(comments);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Server error", error });
    }
  });
  

module.exports=admin_route;