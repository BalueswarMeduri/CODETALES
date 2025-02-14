import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import {
  RouteADDCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogeDetails,
  RouteBlogEdit,
  RouteCategory,
  RouteCommentDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResults from "./pages/SearchResults";
import CommentsAll from "./pages/CommentsiAll";
import Userall from "./pages/Userall";
import AuthRouteProtection from "./components/AuthRouteprotechion";
import AuthRouteProtectiononlytoadmin from "./components/AuthRouteProtectiononlytoadmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
    

          {/* Blog Routes */}
          <Route path={RouteBlogeDetails()} element={<SingleBlogDetails />} />
          <Route path="/blog/:category" element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResults />} />
          

          {/* Protected Routes for Authenticated Users */}
          <Route element={<AuthRouteProtection />}>
          <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<CommentsAll />} />
          </Route>

          {/* Admin-only Routes */}
          <Route element={<AuthRouteProtectiononlytoadmin />}>
            <Route path={RouteADDCategory} element={<AddCategory />} />
            <Route path={RouteCategory} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<Userall />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
