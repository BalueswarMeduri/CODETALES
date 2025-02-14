import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetch } from "@/hooks/usefetch";
import { getEnv } from "@/helpers/getenv";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentsAll = () => {
  const [comments, setComments] = useState([]);
  const {
    data: commentsAllData,
    loading,
    error,
    refetch,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`, {
    method: "get",
    credentials: "include",
  });

  // Update local state when new data is fetched
  useEffect(() => {
    if (commentsAllData && commentsAllData.comments) {
      setComments(commentsAllData.comments);
    }
  }, [commentsAllData]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Failed to delete comment. Please try again.");
        return;
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Comment deleted successfully!");

        // ✅ Remove the deleted comment from state to trigger a re-render
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== id));
      } else {
        toast.error(result.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("An error occurred while deleting the comment.");
    }
  };

  if (loading) return <div>Loading.....</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogid?.title || "No Title"}</TableCell>
                    <TableCell>{comment?.author?.name || "Anonymous"}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="hover:bg-red-400 hover:text-white"
                        onClick={() => handleDelete(comment._id)}
                      >
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">No comments found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsAll;
