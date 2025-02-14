import BlogCard from '@/components/BlogCard';
import { getEnv } from '@/helpers/getenv';
import { useFetch } from '@/hooks/usefetch';
import React from 'react'

const Index = () => {
  const {
      data: blogData,
      loading,
      error,
      refetch, // To refresh data after deletion
    } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
      method: "get",
      credentials: "include",
    });
    if(loading) return <div>loading...</div>
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {blogData && blogData.blog.length > 0
        ?
          blogData.blog.map(blog=> <BlogCard key={blog._id} props={blog}/> )
        :
        <div>data not found</div>
      }
    </div>
  )
}

export default Index