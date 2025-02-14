import React, { useState } from 'react'
import { FaRegComments } from "react-icons/fa";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form"; 
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteSignIn } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getenv';
import CommentList from './CommentList';

const Comments = ({props}) => {
    const user = useSelector((state)=>state.user)

    
     const formSchema = z.object({
        comment: z.string().min(3, "comment must be at least 3 characters long"),
      });
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          comment: "",
        },
      });
    
    async function onSubmit(values) {
        try {
            const newValues = {...values, blogid: props.blogid, author: user.user._id}
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/comment/add`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newValues),
            }
          );
    
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Category creation failed");
          }
          form.reset();
          toast.success("comment added successfully!");
        } catch (error) {
          toast.error(error.message || "An internal error occurred");
        }
      }

  return (
    <div>
        <h3 className='flex items-center gap-2 text-2xl font-bold'>  <FaRegComments className='text-yellow-400'/> Comments</h3>
        {user && user.isLoggedIn
        ?
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Type you comments.." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="">
                Save
              </Button>
            </form>
          </Form>
        :
        <Button asChild>
            <Link to={RouteSignIn}>Sign In</Link>
        </Button>
        }
    </div>
  )
}

export default Comments