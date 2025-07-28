import axios from "axios";

export const fetchApi = async (data) => {

  try {
    const method = (data?.apiMethod || "get").toLowerCase(); // default to 'get'
    const url = data?.apiUrl;
    const headers = data?.apiHeader || {};
    const body = data?.apiRequestJson || {};
    const params = data?.jsonVar || {};

    let res;
    if (method === "get" || method === "delete") {
      res = await axios[method](url, { headers, params });
    } else {
      res = await axios[method](url, body, { headers, params });
    }
    return res.data;
  } catch (e) {
    console.error("API Error:", e.response?.data || e.message);
    return null;
  }
};
