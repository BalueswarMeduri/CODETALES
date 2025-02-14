import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import Searchbox from "./Searchbox";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegUser, FaPlus } from "react-icons/fa";
import { IoIosLogOut, IoMdSearch } from "react-icons/io";
import { removeUser } from "@/redux/user/user.slice";
import { toast } from "react-toastify";
import { getEnv } from "@/helpers/getenv";
import { IoMenu } from "react-icons/io5";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const {toggleSidebar} = useSidebar()
  const [showSearch, setShowSearch] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
        method: "GET",
        credentials: "include", // Ensure cookies are included
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      dispatch(removeUser()); // ✅ Clears user from Redux state
      toast.success("Logout successful");
      navigate(RouteIndex); // ✅ Redirects to sign-in page
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const togglesearch=()=>{
    setShowSearch(!showSearch)
  }
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex justify-center items-center gap-2">
        <button onClick={toggleSidebar} className="md:hidden" type='button'>
        <IoMenu size={28} />
        </button>
        <Link to={RouteIndex}>
        <h1 className="text-yellow-500 text-3xl font-bold">CODETALES</h1>
        </Link>
      </div>
      <div className="w-[500px]">
        <div className={`md:relative md:block  absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch?'block':'hidden' }`}>

        <Searchbox />
        </div>
      </div>
      <div className="flex items-center gap-5">
            <button onClick={togglesearch} type="button" className="md:hidden block">
              <IoMdSearch size = {25}/>
            </button>
        {!user?.isLoggedIn ? (
          <Button asChild>
            <Link to={RouteSignIn}>
              <FaSignInAlt className="mr-2" />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.user?.avatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user?.user?.name}</p>
                <p className="text-sm">{user?.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={RouteProfile}>
                  <FaRegUser className="mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={RouteBlogAdd}>
                  <FaPlus className="mr-2" />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <IoIosLogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
