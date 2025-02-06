const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

// const isTokenExpired = (token) => {
//   if (!token) return true;

//   try {
//     const payloadBase64 = token.split(".")[1];
//     if (!payloadBase64) return true;

//     const payload = JSON.parse(atob(payloadBase64));
//     return payload.exp * 1000 < Date.now();
//   } catch (error) {
//     console.error("Invalid Token Format:", error);
//     return true;
//   }
// };

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    console.error("Token expired, logging out...");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error("API Error:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
};
