import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getEnv } from "@/helpers/getenv";
import { RouteSignUp } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/usefetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { FaCamera } from "react-icons/fa";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {

  const [filepreview, setpreview]= useState()

  const [file, setfile] = useState()

  const user = useSelector((state) => state.user);

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user?.user?._id}`,
    { method: "GET", credentials: "include" }
  );

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.user?.name || "",
      email: userData?.user?.email || "",
      bio: userData?.user?.bio || "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData?.user?.name || "",
        email: userData?.user?.email || "",
        bio: userData?.user?.bio || "",
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));
  
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
  
      const data = await response.json();
      console.log("Response Data:", data); // Debugging log
  
      if (!response.ok) {
        toast.error(data?.message || "Update failed");
      } else {
        dispatch(setUser(data.user));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  }

  const handleFileSelection = (files) => {
    if (files.length > 0) {
      const selectedFile = files[0];
  
      // Revoke previous preview URL if it exists to prevent memory leaks
      if (filepreview) {
        URL.revokeObjectURL(filepreview);
      }
  
      const preview = URL.createObjectURL(selectedFile);
      setfile(selectedFile);
      setpreview(preview);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative group">
                  {userData?.user?.avatar ? (
                    <AvatarImage src={filepreview? filepreview : userData.user.avatar} />
                  ) : (
                    <AvatarFallback>CN</AvatarFallback>
                  )}
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center items-center bg-black  bg-opacity-15 border-2 border-yellow-400 rounded-full group-hover:flex hidden cursor-pointer">
                    <FaCamera className="text-yellow-400" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <div className="mt-5 text-sm flex justify-center items-center gap-2">
                  <p>Don't have an account?</p>
                  <Link
                    to={RouteSignUp}
                    className="text-yellow-400 hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
