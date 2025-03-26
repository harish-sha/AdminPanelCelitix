import React from "react";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { DataTable } from "@/components/layout/DataTable";
import UniversalButton from "../components/UniversalButton";
import { useNavigate } from "react-router-dom";

const WhatsappBot = () => {
  const navigate = useNavigate();
  const col = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "createdOn", headerName: "CreatedOn", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <>
            <CustomTooltip title="Edit Account" placement="top" arrow>
              <IconButton onClick={() => console.log(params.row)}>
                <EditNoteIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "gray",
                  }}
                />
              </IconButton>
            </CustomTooltip>
            <CustomTooltip title="Delete Account" placement="top" arrow>
              <IconButton
                className="no-xs"
                onClick={() => console.log(params.row)}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </IconButton>
            </CustomTooltip>
          </>
        );
      },
    },
  ];

  const rows = Array.from({ length: 10 }, (_, index) => ({
    sn: index + 1,
    id: index + 1,
    name: "Country Name",
    createdOn: "Created On",
  }));

  function handleNavigate() {
    navigate("/createwhatsappbot");
  }
  return (
    <div>
      <div className="flex items-center justify-between w-full gap-2 pb-3">
        <h1>WhatsApp Bot</h1>
        <UniversalButton
          id="addwhatsappbot"
          name="addwhatsappbot"
          label="Add Bot"
          onClick={handleNavigate}
        />
      </div>
      <DataTable col={col} rows={rows} id="whatsappBot" name="whatsappBot" />
    </div>
  );
};

export default WhatsappBot;
