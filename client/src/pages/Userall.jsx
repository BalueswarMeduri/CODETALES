import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
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
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";

const Userall = () => {
  const [comments, setComments] = useState([]);
  const { data, loading, error, refetch } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    }
  );

  // Update local state when new data is fetched

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
  
      if (!response.ok) {
        toast.error("Failed to delete user. Please try again.");
        return;
      }
  
      const result = await response.json();
      if (result.success) {
        toast.success("User deleted successfully!");
  
        // ✅ Refresh data after deletion
        refetch();
      } else {
        console.log("error")
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  console.log(data);

  if (loading) return <div>Loading.....</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll</TableHead>
                <TableHead>Name </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role || "No Title"}</TableCell>
                    <TableCell>{user.name || "Anonymous"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.avatar ? (
                        <img className="rounded-full w-10 h-10" src={user.avatar} alt="User Avatar" />
                      ) : (
                        <FaUserCircle size={40} color="#888" />
                      )}
                    </TableCell>
                    <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="hover:bg-red-400 hover:text-white"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">
                    No comments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Userall;
