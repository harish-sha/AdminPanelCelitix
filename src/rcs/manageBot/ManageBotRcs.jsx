import React, { useEffect, useState } from "react";
import ManageBotTableRcs from "./components/ManageBotTableRcs";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import toast from "react-hot-toast";
import Loader from "@/whatsapp/components/Loader";
import { Dialog } from "primereact/dialog";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import {
  fetchAllBotsList,
  fetchAllUsers,
  saveAgentRcs,
  getBotDetailsBySrNo,
} from "@/apis/admin/admin";
import InputField from "@/components/layout/InputField";

const ManageBotRcs = () => {
  const [isFetching, setIsFetching] = useState(false);

  //allBotState
  const [allBots, setAllBots] = useState([]);
  const [selectedBotId, setselectedBotId] = useState(null);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addBotDialog, setAddBotDialog] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientKey, setClientKey] = useState("");

  const [editBotDialog, setEditBotDialog] = useState(false);
  const [editBotDetails, setEditBotDetails] = useState(null);

  const handleEdit = async (srno) => {
    // console.log("srno bot", srno);
    try {
      setIsFetching(true);
      const response = await getBotDetailsBySrNo(srno);
      // console.log("Bot Details Response:", response);

      if (Array.isArray(response) && response.length > 0) {
        const botDetails = response[0];

        const mappedResponse = {
          srno: botDetails.srno,
          agentName: botDetails.agent_name,
          agentId: botDetails.agent_id,
          clientId: botDetails.client_id,
          clientKey: botDetails.client_key,
          assignUserSrNo: botDetails.sr_no,
        };

        setEditBotDetails(mappedResponse);
        setEditBotDialog(true);
      } else {
        toast.error("Failed to fetch bot details.");
      }
    } catch (error) {
      console.error("Error fetching bot details:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateBot = async () => {
    if (
      !editBotDetails.agentName ||
      !editBotDetails.agentId ||
      !editBotDetails.clientId ||
      !editBotDetails.clientKey ||
      !editBotDetails.assignUserSrNo
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const payload = {
      srno: editBotDetails.srno,
      agentName: editBotDetails.agentName,
      agentId: editBotDetails.agentId,
      clientId: editBotDetails.clientId,
      clientKey: editBotDetails.clientKey,
      assignUserSrNo: editBotDetails.assignUserSrNo,
    };

    try {
      // console.log("Updating bot with payload:", payload);
      const response = await saveAgentRcs(payload);
      // console.log("API Response:", response);

      if (response.status) {
        toast.success(response.msg || "Bot updated successfully!");
        setEditBotDialog(false);
        setEditBotDetails(null);
        await fetchAllBotsData();
      } else {
        toast.error(response.msg || "Failed to update bot.");
      }
    } catch (error) {
      console.error("Error updating bot:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fetchAllBotsData = async () => {
    try {
      setIsFetching(true);
      setIsLoading(true);
      const res = await fetchAllBotsList();
      setAllBots(res);
      setDisplayedBots(res);
    } catch (e) {
      toast.error("Something went wrong while fetching bots.");
      // console.log(e);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };
  const fetchAllUserData = async () => {
    try {
      setIsFetching(true);
      setIsLoading(true);
      const res = await fetchAllUsers(data);
      setAllUsers(res.userMstPojoList);
    } catch (e) {
      toast.error("Something went wrong while fetching bots.");
      // console.log(e);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBotsData();
  }, []);

  const handleBotSearch = () => {
    // bot.agent_id === selectedBotId
    const filterBot = allBots.filter((bot) => {
      const matchAgent = !selectedBotId || bot.agent_id == selectedBotId;
      const matchUser = !selectedUser || bot.user_id == selectedUser;
      return matchAgent && matchUser;
    });

    setDisplayedBots(filterBot);
  };

  useEffect(() => {
    const fetchAllUsersDetails = async () => {
      const data = {
        userId: "",
        mobileNo: "",
        companyName: "",
        status: "-1",
      };
      try {
        setIsFetching(true);
        const res = await fetchAllUsers(data);
        setAllUsers(res.userMstPojoList);
        // console.log("res user list in manage bot", res)
      } catch (e) {
        // console.log(e);
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, []);

  const handleAddBot = async () => {
    if (!selectedUser || !agentName || !agentId || !clientId || !clientKey) {
      toast.error("Please fill all fields.");
      return;
    }
    const payload = {
      agentName,
      agentId,
      clientId,
      clientKey,
      assignUserSrNo: selectedUser,
    };
    try {
      // console.log("Saving bot with payload:", payload);
      const response = await saveAgentRcs(payload);
      // console.log("API Response:", response);

      if (response.status) {
        toast.success(response.msg || "Bot added successfully!");
        setAddBotDialog(false);
        setSelectedUser(null);
        setAgentName("");
        setAgentId("");
        setClientId("");
        setClientKey("");

        await fetchAllBotsData();
      } else {
        if (response.msg === "Agent already Exist.") {
          toast.error("Agent already exists. Please use a different Agent ID.");
        } else {
          toast.error(response.msg || "Failed to add bot.");
        }
      }
    } catch (error) {
      console.error("Error saving bot:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl text-gray-700 font-medium text-center my-2">
          Manage RCS Bot
        </h1>
        <div className="flex flex-wrap items-end justify-between w-full gap-2 mb-4">
          <div className="flex items-end gap-3">
            <div className="w-full sm:w-56">
              <DropdownWithSearch
                label="Bot Name"
                id="botName"
                name="botName"
                tooltipContent="Select your Bot"
                options={allBots.map((bot) => ({
                  label: bot.agent_name,
                  value: bot.agent_id,
                }))}
                value={selectedBotId}
                onChange={(e) => {
                  setselectedBotId(e);
                  // handleBotSearch();
                }}
                placeholder="Select Bot"
                filter
              />
            </div>
            <div className="w-full sm:w-56">
              <DropdownWithSearch
                label="Assign To"
                id="assignTo"
                name="assignTo"
                tooltipContent="Select user to filter bots"
                options={allUsers.map((user) => ({
                  label: user.firstName,
                  value: user.srno,
                }))}
                value={selectedUser}
                onChange={(e) => {
                  setSelectedUser(e);
                  // handleBotSearch();
                }}
                placeholder="Select User"
                filter
              />
            </div>

            <div className="w-max-content">
              <UniversalButton
                label="Search"
                disabled={isFetching}
                onClick={handleBotSearch}
              />
            </div>
          </div>

          <div className="w-max-content">
            <UniversalButton
              label="Add Bot"
              disabled={isFetching}
              onClick={() => setAddBotDialog(true)}
            />
          </div>
        </div>

        <div className="w-full">
          <ManageBotTableRcs
            id="suggestionreport"
            name="suggestionreport"
            data={displayedBots}
            onEdit={handleEdit}
          />
        </div>
      </div>
      {/* Add Bot start */}
      <Dialog
        header="Add Bot"
        visible={addBotDialog}
        onHide={() => setAddBotDialog(false)}
        className="lg:w-[35rem] md:w-[20rem] w-[35rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <AnimatedDropdown
            label="Users"
            options={allUsers?.map((user) => ({
              label: user.userId,
              value: user.srno,
            }))}
            value={selectedUser}
            onChange={(e) => setSelectedUser(e)}
          />

          <InputField
            label="Agent Name"
            id="agentName"
            name="agentName"
            placeholder="Enter Agent Name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />

          <InputField
            label="Agent ID"
            id="agentId"
            name="agentId"
            placeholder="Enter Agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />

          <InputField
            label="Client ID"
            id="clientId"
            name="clientId"
            placeholder="Enter Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />

          <InputField
            label="Client Key"
            id="clientKey"
            name="clientKey"
            placeholder="Enter Client Key"
            value={clientKey}
            onChange={(e) => setClientKey(e.target.value)}
          />

          <div className="flex justify-center">
            <UniversalButton label="Save Bot" onClick={handleAddBot} />
          </div>
        </div>
      </Dialog>
      {/* Add Bot end */}

      {/* edit bot start */}
      <Dialog
        header="Edit Bot"
        visible={editBotDialog}
        onHide={() => setEditBotDialog(false)}
        className="lg:w-[35rem] md:w-[20rem] w-[35rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <AnimatedDropdown
            label="Users"
            options={allUsers.map((user) => ({
              label: user.userId,
              value: user.srno,
            }))}
            value={editBotDetails?.assignUserSrNo || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({ ...prev, assignUserSrNo: e }))
            }
          />

          <InputField
            label="Agent Name"
            id="agentName"
            name="agentName"
            placeholder="Enter Agent Name"
            value={editBotDetails?.agentName || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({
                ...prev,
                agentName: e.target.value,
              }))
            }
          />

          <InputField
            label="Agent ID"
            id="agentId"
            name="agentId"
            placeholder="Enter Agent ID"
            value={editBotDetails?.agentId || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({
                ...prev,
                agentId: e.target.value,
              }))
            }
          />

          <InputField
            label="Client ID"
            id="clientId"
            name="clientId"
            placeholder="Enter Client ID"
            value={editBotDetails?.clientId || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({
                ...prev,
                clientId: e.target.value,
              }))
            }
          />

          <InputField
            label="Client Key"
            id="clientKey"
            name="clientKey"
            placeholder="Enter Client Key"
            value={editBotDetails?.clientKey || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({
                ...prev,
                clientKey: e.target.value,
              }))
            }
          />

          <div className="flex justify-center">
            <UniversalButton label="Update Bot" onClick={handleUpdateBot} />
          </div>
        </div>
      </Dialog>
      {/* edit bot end */}
    </>
  );
};

export default ManageBotRcs;
