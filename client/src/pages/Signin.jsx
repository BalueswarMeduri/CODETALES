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
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { toast } from "react-toastify";
import { getEnv } from "@/helpers/getenv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";

const Signin = () => {

  const dispath = useDispatch()

  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
   try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`,{
        method : 'post',
        headers : {'Content-type' : 'application/json'},
        credentials : 'include',
        body : JSON.stringify(values)
      })
      const data = await response.json()
      if(!response.ok){
        toast.error("Login fail ")
      }
      dispath(setUser(data.user))
      navigate(RouteIndex)
      toast.success("Login Successfull!")
    } catch (error) {
      toast.error("Login fail or some internal error")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className= "w-[400px] p-5">
        <div className="flex justify-center items-center">
        <Link to={RouteIndex}>
           <h1 className="font-bold text-yellow-400 text-2xl mb-2"> CodeTales</h1>
        </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-5">Login Into Account</h1>

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
            <div className="mt-5">
                <Button type="submit" className="w-full">
                Sign In
                </Button>
                <div className="mt-5 text-sm flex justify-center items-center gap-2">
                    <p>Don&apos;t have account ? </p>
                    <Link to={RouteSignUp} className="text-yellow-400 hover:underline">Sign Up</Link>
                </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
