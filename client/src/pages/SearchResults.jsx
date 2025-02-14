import BlogCard from '@/components/BlogCard';
import { getEnv } from '@/helpers/getenv';
import { useFetch } from '@/hooks/usefetch';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');

    const {
        data: blogData,
        loading,
        error,
    } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`, {
        method: "GET",
        credentials: "include",
    });

    console.log(blogData);

    return (
        <>
            <div className="flex items-center gap-3 text-2xl font-bold text-yellow-400 border-b pb-3 mb-5">
                <h4>Search Results For: {q} </h4>
            </div>

            {/* ✅ Show loading state */}
            {loading && <div>Loading...</div>}

            {/* ✅ Show error state */}
            {error && <div className="text-red-500">Error fetching blogs.</div>}

            {/* ✅ Only render blogs if blogData exists */}
            {blogData && blogData.blogs && blogData.blogs.length > 0 ? (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                    {blogData.blogs.map((blog) => (
                        <BlogCard key={blog._id} props={blog} />
                    ))}
                </div>
            ) : (
                !loading && <div>No results found.</div> // Show "No results" only when not loading
            )}
        </>
    );
};

export default SearchResults;
