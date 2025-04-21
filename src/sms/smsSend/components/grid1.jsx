import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { RadioButton } from "primereact/radiobutton";
import { Variable } from "./Variable";

export const Grid1 = ({ inputDetails, setInputDetails,headers }) => {
  return (
    <div className="border border-blue-500 w-full p-2 space-y-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
            inputId="smsTypetrans"
            name="smsTypetrans"
            value={1}
            onChange={() => {
              setInputDetails({ ...inputDetails, templateType: 1 });
            }}
            checked={inputDetails.templateType === 1}
          />
          <label
            htmlFor="smsTypetrans"
            className="text-gray-700 font-medium text-sm cursor-pointer"
          >
            Transactional
          </label>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
            inputId="smsTypepro"
            name="smsTypepro"
            value={2}
            onChange={() => {
              setInputDetails({ ...inputDetails, templateType: 2 });
            }}
            checked={inputDetails.templateType === 2}
          />
          <label
            htmlFor="smsTypepro"
            className="text-gray-700 font-medium text-sm cursor-pointer"
          >
            Promotional
          </label>
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
          <RadioButton
            inputId="smsTypeIntl"
            name="smsTypeIntl"
            value={3}
            onChange={() => {
              setInputDetails({ ...inputDetails, templateType: 3 });
            }}
            checked={inputDetails.templateType === 3}
          />
          <label
            htmlFor="smsTypeIntl"
            className="text-gray-700 font-medium text-sm cursor-pointer"
          >
            International
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <InputField
          label="Campaign Name"
          id="campaignName"
          name="campaignName"
          value={inputDetails.campaingName}
          onChange={(e) => {
            setInputDetails((prev) => ({
              ...prev,
              campaingName: e.target.value,
            }));
          }}
          placeholder="Enter campaign name"
        />
        <DropdownWithSearch
          label="DLT Template"
          id="Dlt Template"
          name="Dlt Template"
          options={[{ label: "Option 1", value: "option1" }]}
          value="campaign name"
          onChange={() => {}}
        />

        {inputDetails.templateType === 3 && (
          <div className="flex gap-2 flex-col">
            <label htmlFor="" className="text-sm font-medium text-gray-700">
              Language
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="englishLanguage"
                  name="englishLanguage"
                  value="0"
                  onChange={() => {
                    setInputDetails((prev) => ({
                      ...prev,
                      unicode: 0,
                    }));
                  }}
                  checked={inputDetails.unicode === 0}
                />
                <label
                  htmlFor="englishLanguage"
                  className="text-gray-700 font-medium text-sm cursor-pointer"
                >
                  English
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="unicode"
                  name="unicode"
                  value="1"
                  onChange={() => {
                    setInputDetails((prev) => ({
                      ...prev,
                      unicode: 1,
                    }));
                  }}
                  checked={inputDetails.unicode === 1}
                />
                <label
                  htmlFor="unicode"
                  className="text-gray-700 font-medium text-sm cursor-pointer"
                >
                  Unicode
                </label>
              </div>
            </div>
          </div>
        )}

        <Variable
          setInputDetails={setInputDetails}
          inputDetails={inputDetails?.message}
          headers={headers}
        />

        <div className="grid grid-cols-2 gap-5 ml-5">
          <div className="border border-gray-300 rounded-md p-2">
            Characters: {inputDetails?.message?.length}/1000
          </div>
          <div className="border border-gray-300 rounded-md p-2">
            SMS Units: 8855858
          </div>
          <div className="border border-gray-300 rounded-md p-2">
            Entity ID: 8855858
          </div>
          <div className="border border-gray-300 rounded-md p-2">
            Template ID: 8855858
          </div>
        </div>
      </div>
    </div>
  );
};
