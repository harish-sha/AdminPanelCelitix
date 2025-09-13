import { useState, useRef, useEffect } from "react";
import { Checkbox } from 'primereact/checkbox';
import { MdOutlineDeleteForever } from "react-icons/md";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import { AiFillApi } from "react-icons/ai";
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { MdOutlineGeneratingTokens } from "react-icons/md";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { BsFiletypeJson } from "react-icons/bs";
import { BsJournalArrowDown } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import { FaHistory } from "react-icons/fa";



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const ApiDebugTool = () => {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [value, setValue] = useState(0);
  const [params, setParams] = useState([{ key: "", value: "", type: "text", enabled: true }]);
  const [headers, setHeaders] = useState([{ key: "", value: "", type: "text", enabled: true }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef(null);


  const [ingredients, setIngredients] = useState([]);


  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked)
      _ingredients.push(e.value);
    else
      _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  }


  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

  const handleHeaderChange = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const handleChange = (event, newValue) => setValue(newValue);

  const handleChangeField = (setState, index, field, value) => {
    setState(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addField = (setState) => setState(prev => [...prev, { key: "", value: "", type: "text", enabled: true }]);
  const deleteField = (setState, index) => setState(prev => prev.filter((_, i) => i !== index));
  const toggleEnabled = (setState, index) => setState(prev => prev.map((f, i) => i === index ? { ...f, enabled: !f.enabled } : f));

  // const buildUrlWithParams = () => {
  //   const url = new URL(endpoint);
  //   params.filter(p => p.enabled && p.key).forEach(p => url.searchParams.append(p.key, p.value));
  //   return url.toString();
  // };
  const buildUrlWithParams = () => {
    try {
      const tempUrl = endpoint.startsWith("http") ? endpoint : `https://${endpoint}`;
      const url = new URL(tempUrl);

      params
        .filter(p => p.enabled && p.key)
        .forEach(p => url.searchParams.append(p.key, p.value));

      return url.toString();
    } catch (error) {
      console.error("Invalid URL", error);
      return endpoint; // fallback to raw input
    }
  };

  useEffect(() => {
    if (endpoint && !endpoint.startsWith("http")) {
      setEndpoint(`https://${endpoint}`);
    }
  }, [endpoint]);




  const addHeaderField = () =>
    setHeaders([...headers, { key: "", value: "", type: "text" }]);

  // const handleRequest = async () => {
  //   try {
  //     let config = { method, headers: {} };
  //     let formData = new FormData();
  //     let isFormData = false;

  //     headers.forEach(({ key, value, type }) => {
  //       if (key) {
  //         if (type === "file" && value instanceof File) {
  //           formData.append(key, value);
  //           isFormData = true;
  //         } else {
  //           config.headers[key] = value;
  //         }
  //       }
  //     });

  //     if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;
  //     if (method !== "GET" && method !== "HEAD") {
  //       if (isFormData) {
  //         config.body = formData;
  //       } else {
  //         config.headers["Content-Type"] = "application/json";
  //         config.body = JSON.stringify(JSON.parse(body));
  //       }
  //     }

  //     const res = await fetch(endpoint, config);
  //     const data = await res.json();
  //     setResponse(data);
  //     setHistory([
  //       { method, endpoint, date: new Date().toLocaleString() },
  //       ...history.slice(0, 4),
  //     ]);
  //   } catch (err) {
  //     setResponse({ error: err.message });
  //   }
  // };

  const handleRequest = async () => {
    if (loading && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      return;
    }

    setLoading(true);
    setStatus(null);
    setResponse(null);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const url = buildUrlWithParams();
      const config = { method, headers: {}, signal: controller.signal };
      const formData = new FormData();
      let isFormData = false;

      headers.filter(h => h.enabled && h.key).forEach(({ key, value, type }) => {
        if (type === "file" && value instanceof File) {
          formData.append(key, value);
          isFormData = true;
        } else {
          config.headers[key] = value;
        }
      });

      if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;

      if (method !== "GET" && method !== "HEAD") {
        if (isFormData) {
          config.body = formData;
        } else if (body.trim()) {
          // Only attach JSON body if not empty
          config.body = JSON.stringify(JSON.parse(body));
          config.headers["Content-Type"] = "application/json";
        }
      }


      const start = performance.now();
      const res = await fetch(url, config);
      const duration = performance.now() - start;
      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);
      setResponseTime(`${Math.round(duration)} ms`);
      setResponse(data);
      setHistory(prev => [{ method, endpoint: url, date: new Date().toLocaleString() }, ...prev.slice(0, 4)]);
    } catch (err) {
      setStatus("Request Failed");
      setResponse({ error: err.message });
    }

    setLoading(false);
  };

  const formatBody = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(body), null, 2);
      setBody(formatted);
    } catch (e) {
      alert("Invalid JSON");
    }
  };

  return (
    <div className="bg-gradient-to-tr from-sky-50 to-white border border-gray-200 shadow-md rounded-lg p-6 w-full h-full overflow-scroll">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <AiFillApi /> API Debugger
      </h3>
      <div className="flex items-center gap-3  mb-4" >
        <div className="flex w-full ">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded-l-lg text-sm border-gray-400 focus:outline-none cursor-pointer"
          >
            {methods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.example.com/data"
            className="w-full border p-2 rounded-r-lg text-sm border-gray-400 focus:outline-none"
          />
        </div>
        <div>

          <button
            onClick={handleRequest}
            className="bg-orange-200 text-black h-max w-max px-4 py-2 rounded-md cursor-pointer shadow hover:bg-orange-400 hover:text-white">
            {/* <RocketLaunchOutlinedIcon fontSize="small" />Send */}
            {loading ? "Cancel" : <><RocketLaunchOutlinedIcon fontSize="small" /> Send</>}

          </button>
          {/* here where send request untill fetching the text was cancel and the rocket icon remove and bg was bg-gray-400 */}
        </div>
      </div>
      {/* authorization token */}
      <div className="flex items-center gap-3 mb-3" >

        <label className="flex gap-1 w-35 items-center text-md font-medium"><MdOutlineGeneratingTokens /> Bearer Token</label>
        <input
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
          placeholder="Authorization Token (optional)"
          className="w-full border p-2 rounded text-sm border-gray-400 focus:outline-none    "
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Final Request URL: <code>{buildUrlWithParams()}</code>
      </p>


      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Manage Campaigns Tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label={
              <span className="flex gap-2 items-center">Params</span>
            }
            {...a11yProps(0)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "#f0f4ff",
                borderRadius: "8px",
              },
            }}
          />
          <Tab
            label={
              <span>
                Headers
              </span>
            }
            {...a11yProps(1)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "#f0f4ff",
                borderRadius: "8px",
              },
            }}
          />
          <Tab
            label={
              <span>
                Summary
              </span>
            }
            {...a11yProps(2)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "#f0f4ff",
                borderRadius: "8px",
              },
            }}
          />
          <Tab
            label={
              <span>
                Cookies
              </span>
            }
            {...a11yProps(3)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "#f0f4ff",
                borderRadius: "8px",
              },
            }}
          />
        </Tabs>
        {/* here two tabs should be one for params and one for headers and separate inputs for them and delete functionlaity also and with the check box it was enable or disable and checkbox was for each input  */}
        <CustomTabPanel value={value} index={0} className="">
          <FieldEditor
            fields={params}
            setFields={setParams}
            title="Params"
            deleteField={deleteField}
            toggleEnabled={toggleEnabled}
            handleChangeField={handleChangeField}
          />

          {/* <div className="mb-4">
            <div className="flex items-center justify-between mb-3" >
              <label className="block text-md font-medium">Params</label>
              <button
                onClick={addHeaderField}
                className="text-sm text-green-500 bg-gray-900 cursor-pointer px-2 py-2 rounded-md"
              >
                + Add Params
              </button>
            </div>
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <div className="flex align-items-center">

                  <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
                </div>
                <input
                  placeholder="Key"
                  className=" border p-2 rounded text-sm border-gray-400 focus:outline-none w-1/4"
                  value={h.key}
                  onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
                />
                {h.type === "file" ? (
                  <input
                    type="file"
                    className="border p-2 rounded text-sm w-1/4"
                    onChange={(e) =>
                      handleHeaderChange(i, "value", e.target.files[0])
                    }
                  />
                ) : (
                  <input
                    placeholder="Value"
                    className="border p-2 rounded text-sm border-gray-400 focus:outline-none w-1/4"
                    value={h.value}
                    onChange={(e) => handleHeaderChange(i, "value", e.target.value)}
                  />
                )}
                <input
                  placeholder="Description"
                  className="border p-2 rounded text-sm border-gray-400 focus:outline-none w-2/4"
                  value={h.key}
                  onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
                />
                <select
                  value={h.type}
                  onChange={(e) => handleHeaderChange(i, "type", e.target.value)}
                  className="border p-2 rounded text-sm w-20 border-gray-400 focus:outline-none"
                >
                  <option value="text">Text</option>
                  <option value="file">File</option>
                </select>
                <button
                  className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                // onClick={handleRemoveFile}
                >
                  <MdOutlineDeleteForever
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    size={20}
                  />
                </button>
              </div>
            ))}

          </div> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} className="">
          {/* <div className="mb-4">
            <div className="flex items-center justify-between mb-3" >
              <label className="block text-md font-medium">Headers</label>
              <button
                onClick={addHeaderField}
                className="text-sm text-green-500 bg-gray-900 cursor-pointer px-2 py-2 rounded-md"
              >
                + Add Header
              </button>
            </div>
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <div className="flex align-items-center">

                  <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')} />
                </div>
                <input
                  placeholder="Key"
                  className=" border p-2 rounded text-sm border-gray-400 focus:outline-none w-1/4"
                  value={h.key}
                  onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
                />
                {h.type === "file" ? (
                  <input
                    type="file"
                    className="border p-2 rounded text-sm w-1/4"
                    onChange={(e) =>
                      handleHeaderChange(i, "value", e.target.files[0])
                    }
                  />
                ) : (
                  <input
                    placeholder="Value"
                    className="border p-2 rounded text-sm border-gray-400 focus:outline-none w-1/4"
                    value={h.value}
                    onChange={(e) => handleHeaderChange(i, "value", e.target.value)}
                  />
                )}
                <input
                  placeholder="Description"
                  className="border p-2 rounded text-sm border-gray-400 focus:outline-none w-2/4"
                  value={h.key}
                  onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
                />
                <select
                  value={h.type}
                  onChange={(e) => handleHeaderChange(i, "type", e.target.value)}
                  className="border p-2 rounded text-sm w-20 border-gray-400 focus:outline-none"
                >
                  <option value="text">Text</option>
                  <option value="file">File</option>
                </select>
                <button
                  className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                // onClick={handleRemoveFile}
                >
                  <MdOutlineDeleteForever
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    size={20}
                  />
                </button>
              </div>
            ))}

          </div> */}
          <FieldEditor
            fields={headers}
            setFields={setHeaders}
            title="Headers"
            deleteField={deleteField}
            toggleEnabled={toggleEnabled}
            handleChangeField={handleChangeField}
          />

        </CustomTabPanel>


      </Box>



      <>
        <div className="flex items-center justify-between mt-2 mb-3">
          <label className="block text-sm font-medium">
            Request Body (JSON)
          </label>
          <button
            onClick={formatBody}
            className="text-xs text-purple-600 hover:bg-gray-300 cursor-pointer px-2 py-2 rounded-md"
          >
            Format JSON
          </button>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={"{\n  \"key\": \"value\"\n}"}
          className="w-full border p-2 text-sm rounded mb-2 h-40 overflow-auto bg-orange-50 border-gray-400 focus:outline-none"
        />
      </>

      {/* {history.length > 1 && ( */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium mb-1">
          <FaHistory /> Request History:
        </label>
        <ul className="text-xs text-gray-600 space-y-1">
          {history.map((h, i) => (
            <li key={i}>
              • [{h.date}] {h.method} {h.endpoint}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-gray-300 mb-2"></div>
      {/* )} */}

      {/* in the response body here i create dummy status you have to get the real status code of all like not found server error ok and others each and every and with the response time  */}

      <div>
        <div className="flex items-center justify-between mb-2 pr-4">
          <div className="flex items-center">
            <h4 className="font-semibold  text-gray-700">
              Response Body
            </h4>
            <label htmlFor=""><VscJson /></label>
          </div>
          {/* <div className="flex items-center gap-2" >
            <h4 className="font-semibold  text-gray-700">
            </h4>
            <div className="font-semibold text-xs bg-green-300 rounded-xl  text-green-700 px-2 py-1" >
              200 OK
            </div>
            <div className="font-semibold text-xs bg-red-300 rounded-xl  text-red-600 px-2 py-1" >
              404 Not Found
            </div>
            <div className="font-semibold text-xs text-gray-600 px-2 border-l-2" >
              117 ms
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            {status && <div className="font-semibold text-xs bg-green-300 rounded-xl text-green-700 px-2 py-1">{status}</div>}
            {responseTime && <div className="font-semibold text-xs text-gray-600 px-2 border-l-2">{responseTime}</div>}
          </div>
        </div>
        <pre className="bg-gray-900 text-green-200 p-4 rounded-md text-xs h-72 overflow-auto">
          {response
            ? JSON.stringify(response, null, 2)
            : "// Response will appear here"}
        </pre>
      </div>
    </div>
  );
};

const FieldEditor = ({ fields, setFields, title, deleteField, toggleEnabled, handleChangeField }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-3">
      <label className="block text-md font-medium">{title}</label>
      <button
        onClick={() => setFields(prev => [...prev, { key: "", value: "", type: "text", enabled: true }])}
        className="text-sm text-green-500 bg-gray-900 px-2 py-2 rounded-md"
      >
        + Add {title}
      </button>
    </div>
    {fields.map((f, i) => (
      <div key={i} className="flex gap-2 mb-2 items-center">
        <Checkbox inputId={`cb-${title}-${i}`} onChange={() => toggleEnabled(setFields, i)} checked={f.enabled} />
        <input
          placeholder="Key"
          className="border p-2 rounded text-sm border-gray-400 w-1/4 focus:outline-none"
          value={f.key}
          onChange={(e) => handleChangeField(setFields, i, "key", e.target.value)}
        />
        {f.type === "file" ? (
          <input
            type="file"
            className="border p-2 rounded text-sm w-1/4"
            onChange={(e) => handleChangeField(setFields, i, "value", e.target.files[0])}
          />
        ) : (
          <input
            placeholder="Value"
            className="border p-2 rounded text-sm border-gray-400 w-1/4 focus:outline-none"
            value={f.value}
            onChange={(e) => handleChangeField(setFields, i, "value", e.target.value)}
          />
        )}
        <input
          placeholder="Description"
          className="border p-2 rounded text-sm border-gray-400 focus:outline-none w-2/4"
          value={f.description}
          onChange={(e) => handleChangeField(setFields, i, "description", e.target.value)}
        />

        <select
          value={f.type}
          onChange={(e) => handleChangeField(setFields, i, "type", e.target.value)}
          className="border p-2 rounded text-sm w-20 border-gray-400"
        >
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        <button onClick={() => deleteField(setFields, i)} className="rounded-2xl p-1.5 hover:bg-gray-200">
          <MdOutlineDeleteForever className="text-red-500 hover:text-red-600" size={20} />
        </button>
      </div>
    ))}
  </div>
);

export default ApiDebugTool;
