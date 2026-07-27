export const getStrapiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured");
  }
  return `${apiUrl.replace(/\/$/, "")}/api`;
};

export const getStrapiHeaders = () => {
  const token = process.env.STRAPI_API_TOKEN;
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const strapiFetch = async (path, options = {}) => {
  const response = await fetch(`${getStrapiBaseUrl()}${path}`, {
    ...options,
    headers: {
      ...getStrapiHeaders(),
      ...(options.headers || {}),
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      result?.error?.message ||
      result?.error ||
      `Strapi request failed: ${response.status}`;
    const error = new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
    error.status = response.status;
    error.payload = result;
    throw error;
  }

  return result;
};
