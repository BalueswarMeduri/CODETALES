import { getEnv } from "@/helpers/getenv";
import { useFetch } from "@/hooks/usefetch";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LikeCount = ({ props }) => {
  const [likecount, setLikecount] = useState(0);
  const [liked, setLiked] = useState(false);
  const user = useSelector((state) => state.user);

  const {
    data: blogLikeCount,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (blogLikeCount) {
      setLikecount(blogLikeCount.likecount);
      setLiked(blogLikeCount.likedByUser || false); // Ensure backend sends this info
    }
  }, [blogLikeCount]);

  const handlelike = async () => {
    try {
      if (!user.isLoggedIn) {
        return toast.error("Please log in to your account.");
      }

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ userid: user.user._id, blogid: props.blogid }),
        }
      );

      if (!response.ok) {
        return toast.error("Failed to like the blog.");
      }

      const responseData = await response.json();
      setLikecount(responseData.likecount);
      setLiked(!liked);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <button
      onClick={handlelike}
      type="button"
      className="flex justify-between items-center gap-1"
    >
      {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      {likecount}
    </button>
  );
};

export default LikeCount;
