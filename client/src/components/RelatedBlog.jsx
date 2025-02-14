import { useFetch } from "@/hooks/usefetch";

const RelatedBlog = ({ props }) => {
  console.log("Category passed to RelatedBlog:", props.category);

  const categorySlug = props.category?.slug; // Extract slug from category object

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${categorySlug}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  console.log("Fetched related blogs:", data);

  return (
    <div>
      <h2 className="text-2xl font-bold">Related Blogs</h2>
      <div>
        <div className="flex items-center gap-2">
          <img />
        </div>
      </div>
    </div>
  );
};

export default RelatedBlog;
