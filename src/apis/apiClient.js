// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, redirecting to login.");
    window.location.href = "/login";
    return;
  }

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  // If FormData is used, do not set Content-Type header manually
  // if (options.body instanceof FormData) {
  //   delete headers["Content-Type"];
  // } else {
  //   headers["Content-Type"] = "application/json";
  // }

  // **Only set JSON Content-Type if NOT using FormData**
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    console.log(`Fetching API: ${API_BASE_URL}${endpoint}`);

    // const method = options.method || "GET";

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: options.method || "GET",
      headers,
    });

    if (response.status === 401) {
      console.error("Session expired. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
};
