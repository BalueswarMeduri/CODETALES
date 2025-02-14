import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, options);
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}, ${response.status}`);
                }
                
                setData(responseData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies); // Dependency array ensures refetching when dependencies change

    return { data, loading, error };
};
