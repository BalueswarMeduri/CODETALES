import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  RouteADDCategory,
  RouteBlogAdd,
  RouteBlogEdit,
  RouteEditCategory,
} from "@/helpers/RouteName";
import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/usefetch";
import { getEnv } from "@/helpers/getenv";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment/moment";

const BlogDetails = () => {
  const {
    data: blogData,
    loading,
    error,
    refetch, // To refresh data after deletion
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
    method: "get",
    credentials: "include",
  });

  const handleDelete = async (blogid) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/delete/${blogid}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
  
      if (!response.ok) {
        toast.error("Failed to delete blog. Please try again.");
        return;
      }
  
      const result = await response.json();
      if (result.success) {
        toast.success("Blog deleted successfully!");
        setTimeout(() => {
          window.location.reload(); // Refresh the page to reflect changes
        }, 1000);
      } else {
        toast.error(result.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog.");
    }
  };


  if (loading) return <div>Loading.....</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.category?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>{blog?.slug}</TableCell>
                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-3">
                      {/* <Button
                        variant="outline"
                        className="hover:bg-yellow-400 hover:text-white"
                        asChild
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button> */}
                      <Button
                        variant="outline"
                        className="hover:bg-red-400 hover:text-white"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data not found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
