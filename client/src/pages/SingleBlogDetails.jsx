import CommentCount from "@/components/CommentCount";
import CommentList from "@/components/CommentList";
import Comments from "@/components/Comments";
import LikeCount from "@/components/LikeCount";
import RelatedBlog from "@/components/RelatedBlog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getEnv } from "@/helpers/getenv";
import { useFetch } from "@/hooks/usefetch";
import { decode } from "entities";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";

const SingleBlogDetails = () => {
  const { blog,category } = useParams();
  
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  
  return (
    <div className="md:flex-nowrap flex justify-between gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded md:w-[100%] p-5">
            <h1 className="text-2xl font-bold mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>
                <div>
                  <p className="font-bold">{data.blog.author.name}</p>
                  <p>Date : {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                  <LikeCount props = {{blogid : data.blog._id}}/>
                  <CommentCount props = {{blogid : data.blog._id}}/>
              </div>
            </div>
            <div className="my-5">
              <img src={data.blog.featuredImage} className="rounded" />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent || ""),
              }}
            ></div>
            <div className="border-t mt-5">
              <Comments props={{ blogid: data.blog._id }} />
            </div>
            <div className="border-t mt-5">
              <CommentList props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      )}
      {/* <div className="border rounded w-[30%]">
        <RelatedBlog props={{ category: data?.blog?.category }} />
      </div> */}
    </div>
  );
};

export default SingleBlogDetails;
