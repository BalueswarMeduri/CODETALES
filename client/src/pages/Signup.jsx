import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getenv";
import { toast } from 'react-toastify';
import GoogleLogin from "@/components/GoogleLogin";

const Signup = () => {
    const navigate = useNavigate()
    const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.string().email(),
      password: z.string().min(5, "Password must be at least 5 characters long"),
      confirmPassword: z.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"], // Error on confirmPassword field
          message: "Password and Confirm Password should be the same.",
        });
      }
    });
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
    
      async function onSubmit(values) {
          try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`,{
              method : 'post',
              headers : {'Content-type' : 'application/json'},
              body : JSON.stringify(values)
            })
            const data = await response.json()
            if(!response.ok){
              return toast.error("Register fail ")
            }
            navigate(RouteSignIn)
            toast.success("Register Successfull!")
          } catch (error) {
            toast.error("Register fail or some internal error")
          }
      }
    
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className= "w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">Create Your Account</h1>
        <div>
          <GoogleLogin/>
          <div className="border-2 my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">Or</span>
          </div>
        </div>
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
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ConfirmPassword</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password again"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
                <Button type="submit" className="w-full">
                Sign Up
                </Button>
                <div className="mt-5 text-sm flex justify-center items-center gap-2">
                    <p>Already have account ? </p>
                    <Link to={RouteSignIn} className="text-yellow-400 hover:underline">Sign In</Link>
                </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Signup