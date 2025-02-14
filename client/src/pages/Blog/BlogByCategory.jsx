import BlogCard from '@/components/BlogCard';
import { getEnv } from '@/helpers/getenv';
import { useFetch } from '@/hooks/usefetch';
import React from 'react';
import { BiCategory } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

const BlogByCategory = () => {
    const { category } = useParams();

    const {
        data: blogData,
        loading,
        error,
    } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`, {
        method: "get",
        credentials: "include",
    },[category]);

    console.log("Fetched Blog Data:", blogData);

    // ✅ Fix: Corrected property name
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading blogs.</div>;
    if (!blogData || !blogData.blogs || !Array.isArray(blogData.blogs) || blogData.blogs.length === 0) {
        return <div>Data not found</div>;
    }

    return (
        <>
        <div className='flex items-center gap-3 text-2xl font-bold text-yellow-400 border-b pb-3 mb-5'>
            <BiCategory/>
           <h4>{blogData && blogData.categoryData?.name}</h4> 
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {blogData.blogs.map(blog => (
                <BlogCard key={blog._id} props={blog} />
            ))}
        </div>
        </>
    );
};

export default BlogByCategory;
