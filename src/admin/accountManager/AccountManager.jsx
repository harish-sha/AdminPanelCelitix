import React, { useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import AccountManagerTable from "./components/AccountManagerTable";
import { Dialog } from "primereact/dialog";
import InputField from "../../whatsapp/components/InputField";
import GeneratePasswordSettings from "../../profile/components/GeneratePasswordSettings";
import UniversalLabel from "../../whatsapp/components/UniversalLabel";
import { RadioButton } from "primereact/radiobutton";

const AccountManager = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [employeeidcreateStatus, setEmployeeidCreateStatus] =
    useState("disable");
  const [addAccountcreatepop, setAddAccountcreatepop] = useState(false);

  const handleChangeEmployeeidCreateStatus = (event) => {
    setEmployeeidCreateStatus(event.target.value);
  };

  const handleAddAccount = () => {
    setAddAccountcreatepop(true);
  };

  return (
    <div className="w-full">
      {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
      <div>
        <div className="flex flex-wrap gap-2 items-end justify-end pb-3 w-full">
          <div className="w-max-content">
            <UniversalButton
              label="Add Account"
              id="addaccountCreate"
              onClick={handleAddAccount}
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
            <AccountManagerTable
              id="accountManagerTable"
              name="accountManagerTable"
            />
          </div>
        )}
      </div>
      <Dialog
        header="Add Account Create"
        visible={addAccountcreatepop}
        style={{ width: "35rem" }}
        onHide={() => {
          setAddAccountcreatepop(false);
        }}
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="User ID"
              id="useridcreate"
              name="useridcreate"
              placeholder="Enter User id"
            />
            <InputField
              label="Employee ID"
              id="employeeidcreate"
              name="employeeidcreate"
              placeholder="Enter Employee id"
            />
          </div>
          <div>
            <GeneratePasswordSettings
              id="passwordcreate"
              name="passwordcreate"
              className="flex"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              id="firstnamecreate"
              name="firstnamecreate"
              placeholder="Enter first name"
            />
            <InputField
              label="Last Name"
              id="lastnamecreate"
              name="lastnamecreate"
              placeholder="Enter last name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Email"
              id="emailcreate"
              name="emailcreate"
              placeholder="Enter email"
            />
            <InputField
              label="Mobile Number"
              id="mobilenumbercreate"
              name="mobilenumbercreate"
              placeholder="Enter mobile number"
              type="number"
            />
          </div>
          <div className="lg:w-100 md:w-100 flex flex-wrap gap-4">
            <div className="flex justify-center items-center">
              <UniversalLabel
                text="Employee ID "
                id="employeeidcreate"
                name="employeeidcreate"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            {/* Option 1 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="employeeidcreateOption1"
                name="employeeidcreateredio"
                value="enable"
                onChange={handleChangeEmployeeidCreateStatus}
                checked={employeeidcreateStatus === "enable"}
              />
              <label
                htmlFor="employeeidcreateOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Active
              </label>
            </div>
            {/* Option 2 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="employeeidcreateOption2"
                name="employeeidcreateredio"
                value="disable"
                onChange={handleChangeEmployeeidCreateStatus}
                checked={employeeidcreateStatus === "disable"}
              />
              <label
                htmlFor="employeeidcreateOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Inactive
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <UniversalButton label="Save" id="savecreate" name="savecreate" />
          </div>
        </div>
      </Dialog>

      {/* )} */}
    </div>
  );
};

export default AccountManager;
