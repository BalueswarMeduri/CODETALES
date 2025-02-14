import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteADDCategory, RouteEditCategory } from "@/helpers/RouteName";
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
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryDetails = () => {
  const {
    data: categoryData,
    loading,
    error,
    refetch, // To refresh data after deletion
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        toast.error("Failed to delete category. Please try again.");
        return;
      }
  
      const result = await response.json();
      if (result.success) {
        toast.success("Category deleted successfully!");
        setTimeout(() => {
          window.location.reload(); // Refresh the page to reflect changes
        }, 1000);
      } else {
        toast.error(result.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category.");
    }
  };
  

  if (loading) return <div>Loading.....</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteADDCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                      {/* <Button
                        variant="outline"
                        className="hover:bg-yellow-400 hover:text-white"
                        asChild
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button> */}
                      <Button
                        variant="outline"
                        className="hover:bg-red-400 hover:text-white"
                        onClick={() => handleDelete(category._id)}
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

export default CategoryDetails;
