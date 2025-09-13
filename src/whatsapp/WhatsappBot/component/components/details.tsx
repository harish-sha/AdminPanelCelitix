import React from "react";
import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { motion } from "framer-motion";
import CustomTooltip from "@/components/common/CustomTooltip";

export const Details = ({
  setDetails,
  details,
  handleSubmit,
  isUpdate,
  setIsSettingBtnDisables,
}: {
  setDetails: React.Dispatch<React.SetStateAction<any>>;
  setIsSettingBtnDisables: React.Dispatch<React.SetStateAction<any>>;
  details: any;
  handleSubmit: (isClose: Boolean) => void;
  isUpdate: Boolean;
}) => {
  return (
    <div className="flex gap-2">
      <div className="w-56">
        <AnimatedDropdown
          id="selecetWaba"
          name="selectWaba"
          label=""
          placeholder="Select WABA"
          tooltipContent="Select your whatsapp business account"
          tooltipPlacement="right"
          options={details?.waba?.map((waba) => ({
            value: waba.mobileNo,
            label: waba.name,
          }))}
          value={details?.selected}
          onChange={(e) => {
            setDetails((prev) => ({
              ...prev,
              selected: e,
            }));
            setIsSettingBtnDisables(false);

            if (!e) {
              setIsSettingBtnDisables(true);
            }
          }}
        />
      </div>
      {/* <InputField
        id="botName"
        name="botName"
        label="Bot Name"
        tooltipContent="Select Bot Name"
        tooltipPlacement="right"
        value={details?.name}
        placeholder="Enter Bot Name"
        onChange={(e) => {
          setDetails((prev) => ({
            ...prev,
            name: e.target.value,
          }));
        }}
      /> */}

      <motion.div
        transition={{ duration: 0.1, delay: 0.1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col w-full sm:w-auto"
      >
        <input
          id="botName"
          name="botName"
          type="text"
          placeholder="Enter Bot Name"
          value={details?.name}
          onChange={(e) => {
            setDetails((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
          className="sm:flex-col xs:flex-col px-3 py-1.5 border border-indigo-300 bg-white text-[0.82rem] rounded-md shadow-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none sm:min-w-[250px]"
        />
      </motion.div>

      <CustomTooltip
        title="Save the current bot configuration. This will validate inputs and prepare the bot for publish."
        placement="top"
        arrow
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSubmit(isUpdate ? false : true)}
          transition={{ duration: 0.1, delay: 0.4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-5 py-2 rounded-md text-nowrap font-medium text-sm shadow-sm flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-500 cursor-pointer`}
        >
          <SettingsOutlinedIcon sx={{ fontSize: "1.2rem" }} />
          {`${isUpdate ? "Update" : "Save "}`}
        </motion.button>
      </CustomTooltip>

      {isUpdate && (
        <CustomTooltip
          title="Save the current bot configuration. This will validate inputs and prepare the bot for publish."
          placement="top"
          arrow
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            transition={{ duration: 0.1, delay: 0.4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-5 py-2 rounded-md text-nowrap font-medium text-sm shadow-sm flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-500 cursor-pointer`}
          >
            {/* <SettingsOutlinedIcon sx={{ fontSize: "1.2rem" }} /> */}
            {`${isUpdate ? "Update" : "Save"} and Exit`}
          </motion.button>
        </CustomTooltip>
      )}

      {/* <UniversalButton
            id="saveBot"
            name="saveBot"
            label={`${isUpdate ? "Update" : "Save"}`}
            onClick={() => handleSubmit(isUpdate ? false : true)}
            style={{}}
          /> */}

      {/* {isUpdate && (
            <UniversalButton
              id="saveBot"
              name="saveBot"
              label={`${isUpdate ? "Update" : "Save"} and Exit`}
              onClick={handleSubmit}
              style={{}}
            />
          )} */}
    </div>
  );
};
