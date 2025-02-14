export const RouteIndex = '/'
export const RouteSignIn = '/sign-in'
export const RouteSignUp = '/sign-up'
export const RouteProfile = '/profile'
export const RouteCategory = '/categories'
export const RouteADDCategory = '/categories/add'
export const RouteEditCategory = (category_id) => {
    if (category_id) {
        return `/categories/edit/${category_id}`;
    } else {
        return `/categories/edit/:category_id`;
    }
};

export const RouteBlog = '/blog/'
export const RouteBlogAdd = '/blog/add'
export const RouteBlogEdit = (blogid = ":blogid") => `/blog/edit/${blogid}`;

export const RouteBlogeDetails = (category, blog) => {
    if (!category || !blog) {
        return "/blog/:category/:blog";  // Default route structure if params are missing
    }
    return `/blog/${category}/${blog}`;  // Proper dynamic route
};


export const RouteBlogByCategory = (category) => {
    if (!category) {
        return "/blog/:category";  // Default route structure if params are missing
    }else{
        return `/blog/${category}`;  // Proper dynamic route
    }
    
};

export const RouteSearch = (q) => {
    if(q){
        return `/search?q=${q}`; 
    }else{
        return '/search'
    }
   
};

export const RouteCommentDetails = '/comments'
export const RouteUser = '/users'