import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker.jsx";
import InputField from "../../whatsapp/components/InputField.jsx";
import UniversalButton from "../../whatsapp/components/UniversalButton.jsx";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton.jsx";
import Loader from "../../whatsapp/components/Loader.jsx";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown.jsx";
import SuggestionReportTableRcs from "./components/SuggestionReportTableRcs.jsx";
import toast from "react-hot-toast";
import { fetchAllAgents, fetchsuggestionReport } from "../../apis/rcs/rcs.js";
import moment from "moment";

import { IconButton } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { exportToExcel } from "@/utils/utills.js";

const SuggestionReportRcs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [allAgents, setAllAgents] = useState([]);
  const [suggestionData, setSuggestionData] = useState({
    botId: "",
    fromDate: new Date(),
    toDate: new Date(),
    mobileNumber: "",
    page: "1",
  });
  const [suggestionTableData, setSuggestionTableData] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  const [fileData, setFileData] = useState({
    url: "",
    type: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleView(row) {
    if (!row.fileUri || !row.mimeType) return;
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ];

    const validVideoTypes = [
      "video/mp4",
      // "image/png",
      // "image/jpg",
      // "image/gif",
    ];
    const validDocumentTypes = ["application/pdf"];
    const validAudioTypes = ["audio/mp4"];

    if (validImageTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "image",
      });
    }

    if (validVideoTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "video",
      });
    }
    if (validDocumentTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "pdf",
      });
    }
    if (validAudioTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "audio",
      });
    }
    setIsDialogOpen(true);
  }

  function handleView(row) {
    if (!row.fileUri || !row.mimeType) return;
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ];

    const validVideoTypes = [
      "video/mp4",
      // "image/png",
      // "image/jpg",
      // "image/gif",
    ];
    const validDocumentTypes = ["application/pdf"];
    const validAudioTypes = ["audio/mp4"];

    if (validImageTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "image",
      });
    }

    if (validVideoTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "video",
      });
    }
    if (validDocumentTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "pdf",
      });
    }
    if (validAudioTypes.includes(row.mimeType)) {
      setFileData({
        url: row.fileUri,
        type: "audio",
      });
    }
    setIsDialogOpen(true);
  }

  useEffect(() => {
    async function fetchAllBotsData() {
      try {
        setIsFetching(true);
        const res = await fetchAllAgents();
        setAllAgents(res);
      } catch (e) {
        toast.error("Something went wrong.");
        // console.log(e);
      } finally {
        setIsFetching(false);
      }
    }

    fetchAllBotsData();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  const handleSearch = async () => {
    if (!suggestionData?.botId) {
      return toast.error("Please select bot.");
    }

    const data = {
      ...suggestionData,
      fromDate: formatDate(suggestionData.fromDate),
      toDate: formatDate(suggestionData.toDate),
      page: currentPage,
      // fromDate: "2021-02-26",
      // toDate: "2025-02-26",
    };

    try {
      setIsFetching(true);
      const res = await fetchsuggestionReport(data);
      setSuggestionTableData(res);
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!initialLoad) {
      handleSearch();
    }
    setInitialLoad(false);
  }, [currentPage]);

  async function fetchNextPageData() { }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "mobileNo",
      headerName: "Mobile Number",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "messageType",
      headerName: "Messaging Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        if (params.row.messageType === "USER_FILE") {
          return (
            // <img
            //   src={params.fileuri}
            //   alt="User Upload"
            //   style={{
            //     width: 50,
            //     height: 50,
            //     objectFit: "cover",
            //     borderRadius: 5,
            //   }}
            // />
            <IconButton onClick={(e) => handleView(params.row)}>
              <RemoveRedEyeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          );
        } else if (params.row.messageType === "LOCATION") {
          return (
            <>
              <p>
                {params.row.latitude} , {params.row.longitude}
              </p>
              {/* <p>{params.row.longitude}</p> */}
            </>
          );
        } else return params.row.message;
      },
    },
    {
      field: "insertTime",
      headerName: "Receive Time",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <>{moment(params.row.insertTime).format("DD-MM-YYYY HH:mm:ss")}</>
      ),
    },
  ];

  async function handleExport() {
    if (!suggestionTableData?.data?.length) {
      return toast.error("No data to download");
    }

    const col = columns.map((col) => col.field);

    const row = suggestionTableData.data.map((rowData, index) =>
      col.map((field) => {
        if (field === "sn") return index + 1;
        if (field === "message" && rowData.messageType === "USER_FILE") {
          return rowData.fileUri;
        }
        if (field === "message" && rowData.messageType === "LOCATION") {
          return `${rowData.latitude} , ${rowData.longitude}`;
        }
        return rowData[field];
      })
    );

    const name = `${suggestionData?.fromDate}_${suggestionData?.toDate}_suggestionReport`;
    exportToExcel(col, row, name);
    // console.log(row);
    toast.success("File Downloaded Successfully");
  }

  return (
    <div className="w-full">
      {/* {isLoading ? (
        <>
          <Loader />
        </>
      ) : ( */}
      <div>
        <div className="flex flex-wrap items-end w-full gap-2 mb-5">
          {/* From Date Picker */}

          <div className="w-full sm:w-48">
            <AnimatedDropdown
              label="Agent"
              options={allAgents.map((bot) => ({
                label: bot.agent_name,
                value: bot.agent_id,
              }))}
              id="suggestionagent"
              name="suggestionagent"
              value={suggestionData.botId}
              onChange={(newValue) => {
                setSuggestionData({ ...suggestionData, botId: newValue });
              }}
              placeholder="Select Agent Name"
              tooltipPlacement="top"
              tooltipContent="Select Agent Name"
            />
          </div>

          <div className="w-full sm:w-48">
            <UniversalDatePicker
              id="suggestionfrom"
              name="suggestionfrom"
              tooltipPlacement="top"
              tooltipContent="Select From Date"
              label="From Date"
              maxDate={new Date()}
              value={suggestionData.fromDate}
              onChange={(newValue) => {
                setSuggestionData({ ...suggestionData, fromDate: newValue });
              }}
            />
          </div>

          {/* To Date Picker */}
          <div className="w-full sm:w-48">
            <UniversalDatePicker
              id="suggestionto"
              name="suggestionto"
              label="To Date"
              tooltipPlacement="top"
              tooltipContent="Select To Date"
              value={suggestionData.toDate}
              onChange={(newValue) => {
                setSuggestionData({ ...suggestionData, toDate: newValue });
              }}
            />
          </div>


          {/* Mobile Number Input Field */}
          <div className="w-full sm:w-48">
            <InputField
              id="suggestionmobile"
              name="suggestionmobile"
              type="number"
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              value={suggestionData.mobileNumber}
              onChange={(e) => {
                setSuggestionData({
                  ...suggestionData,
                  mobileNumber: e.target.value,
                });
              }}
              tooltipPlacement="top"
              tooltipContent="Enter Mobile Number"
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              id="suggestionsearch"
              name="suggestionsearch"
              label={isFetching ? "Searching..." : "Search"}
              icon={<IoSearch />}
              disabled={isFetching}
              onClick={handleSearch}
            />
          </div>

          <div className="w-max-content">
            <UniversalButton
              label="Export"
              id="suggestionexport"
              name="suggestionexport"
              onClick={handleExport}
            />
          </div>
        </div>

        <div className="w-full">
          <SuggestionReportTableRcs
            id="suggestionreport"
            name="suggestionreport"
            data={suggestionTableData}
            handleSearch={handleSearch}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            columns={columns}
            fileData={fileData}
            setFileData={setFileData}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default SuggestionReportRcs;
