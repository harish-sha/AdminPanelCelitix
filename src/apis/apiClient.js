const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, redirecting to login.");
    window.location.href = "/login";
    return;
  }

  console.log("Token:", token);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    console.log(`Fetching API: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

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
