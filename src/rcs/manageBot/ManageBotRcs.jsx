import React, { useEffect, useState } from "react";
import ManageBotTableRcs from "./components/ManageBotTableRcs";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { fetchAllBotsList } from "../../apis/rcs/rcs";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import toast from "react-hot-toast";

const ManageBotRcs = () => {
  const [isFetching, setIsFetching] = useState(false);

  //allBotState
  const [allBots, setAllBots] = useState([]);
  const [selectedBotId, setselectedBotId] = useState(null);
  const [selectedBotData, setselectedBotData] = useState([]);

  useEffect(() => {
    async function fetchAllBotsData() {
      try {
        setIsFetching(true);
        const res = await fetchAllBotsList();
        setAllBots(res);
      } catch (e) {
        toast.error("Something went wrong.");
        console.log(e);
      } finally {
        setIsFetching(false);
      }
    }

    fetchAllBotsData();
  }, []);

  const handleBotSearch = async () => {
    if (selectedBotId === "no-selection") {
      toast.error("Please select bot name.");
      return;
    }
    try {
      setIsFetching(true);
      const res = await fetchAllBotsList(selectedBotId);
      setselectedBotData(res);
    } catch (e) {
      console.log(e);
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
        <div className="flex flex-wrap items-end w-full gap-2 mb-2">
          <div className="w-full sm:w-56">
            <DropdownWithSearch
              label="Bot Name"
              id="botName"
              name="botName"
              options={allBots.map((bot) => ({
                label: bot.agent_name,
                value: bot.agent_id,
              }))}
              value={selectedBotId}
              onChange={(e) => {
                setselectedBotId(e);
              }}
              placeholder="select bot name"
              filter
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              label="Show"
              disabled={isFetching}
              onClick={handleBotSearch}
            />
          </div>
        </div>

        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageBotTableRcs
              id="suggestionreport"
              name="suggestionreport"
              data={selectedBotData}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default ManageBotRcs;
