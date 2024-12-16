export const fetchData = async (path) => {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const BASE_URL = `${API_URL}/api`;
  let data = [];
  let error = null;

  try {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    data = data.data; 
  } catch (err) {
    error = `Error fetching data from ${path}: ${err.message}`;
    console.error(error);
  }

  return { data, error };
};
