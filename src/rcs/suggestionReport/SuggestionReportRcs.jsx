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

const SuggestionReportRcs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [allAgents, setAllAgents] = useState([]);
  const [suggestionData, setSuggestionData] = useState({
    botId: "",
    fromDate: new Date(),
    toDate: new Date(),
    mobileNumber: "",
    offset: "0",
  });
  const [suggestionTableData, setSuggestionTableData] = useState([]);

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

    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    const data = {
      ...suggestionData,
      // fromDate: formatDate(suggestionData.fromDate),
      // toDate: formatDate(suggestionData.toDate),
      fromDate: "2021-02-26",
      toDate: "2025-02-26",
    };

    try {
      setIsFetching(true);
      const res = await fetchsuggestionReport(data);
      setSuggestionTableData(res.data);
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

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
            <UniversalDatePicker
              id="suggestionfrom"
              name="suggestionfrom"
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
              value={suggestionData.toDate}
              onChange={(newValue) => {
                setSuggestionData({ ...suggestionData, toDate: newValue });
              }}
            />
          </div>

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
            />
          </div>
        </div>

        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <SuggestionReportTableRcs
              id="suggestionreport"
              name="suggestionreport"
              data={suggestionTableData}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default SuggestionReportRcs;
