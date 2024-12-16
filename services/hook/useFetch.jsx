import { useState, useEffect } from "react";
import { fetchData } from "@/lib/api";

const useFetch = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await fetchData(path);
      setData(data);
      setError(error);
      setLoading(false);
    };

    getData();
  }, [path]);

  return { data, loading, error };
};

export default useFetch;
