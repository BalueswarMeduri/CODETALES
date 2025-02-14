import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaBlog, FaComment, FaUserCircle } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategory,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/usefetch";
import { getEnv } from "@/helpers/getenv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );
  console.log("User state:", user);


  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <h1 className="text-yellow-500 text-2xl font-bold text-center">
          CODETALES
        </h1>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IoHomeOutline />
              <Link to={RouteIndex}>Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {user?.isLoggedIn && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaBlog />
                  <Link to={RouteBlog}>Blogs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaComment />
                  <Link to={RouteCommentDetails}>Comments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}

          {user?.isLoggedIn && user.user?.email === "balueswar109@gmail.com" && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategory />
                  <Link to={RouteCategory}>Categories</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaUserCircle />
                  <Link to={RouteUser}>Users</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>

        <SidebarGroup />
        <SidebarGroupLabel>Categories</SidebarGroupLabel>
        <SidebarMenu>
          {categoryData?.category?.length > 0 ? (
            categoryData.category.map((category) => (
              <SidebarMenuItem key={category._id}>
                <SidebarMenuButton>
                  <GoDot />
                  <Link
                    to={
                      category?.slug ? RouteBlogByCategory(category.slug) : "#"
                    }
                  >
                    {category.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDot />
                <span>No categories found</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>

        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
