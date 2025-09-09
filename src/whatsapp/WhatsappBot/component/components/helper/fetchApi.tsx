import axios, { AxiosRequestConfig } from "axios";

export const fetchApi = async (data) => {
  try {
    const method = (data?.apiMethod || "get").toLowerCase(); // default to 'get'
    const url = data?.apiUrl;
    const headers = data?.header || {};
    const body = JSON.parse(data?.apiRequestJson || {}) || {};
    const params = data?.params || [{ key: "", value: "" }];

    let paramValue = {};
    let headerValue = {};

    paramValue = params
      ?.filter((p) => p.key && p.value)
      .reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});

    headerValue = headers
      ?.filter((p) => p.key && p.value)
      .reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});

    const config: AxiosRequestConfig = {};
    if (Object.keys(paramValue).length > 0) {
      config.params = paramValue;
    }
    if (Object.keys(headerValue).length > 0) {
      config.headers = headerValue;
    }

    let res;
    if (method === "get" || method === "delete") {
      res = await axios[method](url, config);
    } else {
      res = await axios[method](url, body, config);
    }
    return res.data;
  } catch (e) {
    console.error("API Error:", e);
    return null;
  }
};
