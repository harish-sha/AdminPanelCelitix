import React, { useEffect, useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import InputField from "../../whatsapp/components/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import { IoSearch } from "react-icons/io5";
import ManageUserTable from "./components/ManageUserTable";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../../apis/admin/admin";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";

const ManageUser = () => {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [dataToFilter, setDataToFilter] = useState({
    userId: "",
    mobileNo: "",
    companyName: "",
    status: "-1",
  });

  const handleAdduser = () => {
    navigate("/manageadduser");
  };

  const handleAddSalesPerson = () => {
    navigate("/addsalesuser", { state: { isSalesPerson: true } });
  };

  //fetchAllUsersDetails
  const fetchAllUsersDetails = async () => {
    const data = {
      userId: dataToFilter.userId ?? "",
      mobileNo: dataToFilter.mobileNo ?? "",
      companyName: dataToFilter.companyName ?? "",
      status: dataToFilter.status ?? "",
    };
    try {
      setIsFetching(true);
      const res = await fetchAllUsers(data);
      // setAllUsers(res.userMstPojoList);
      const filterData = res.userMstPojoList?.filter((item) =>
        dataToFilter.role ? item.role == dataToFilter.role : true
      );
      setAllUsers(filterData);
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllUsersDetails();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between w-full gap-4 mb-3 align-middle">
        <h1>
          <span className="text-xl font-semibold text-gray-700">Manage Users</span>
        </h1>
        <div className="w-max-content flex gap-2">
          <UniversalButton
            id="manageadduserbtn"
            name="manageadduserbtn"
            label="Add User"
            onClick={handleAdduser}
          />
          {/* <UniversalButton
            id="manageadduserbtn"
            name="manageadduserbtn"
            label="Add Sales Person"
            onClick={handleAddSalesPerson}
          /> */}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-3 align-middle">
        <div className="w-full sm:w-48">
          <InputField
            label="User ID"
            id="manageuserid"
            name="manageuserid"
            placeholder="Enter User ID"
            value={dataToFilter.userId}
            onChange={(e) => {
              setDataToFilter({
                ...dataToFilter,
                userId: e.target.value,
              });
            }}
          />
        </div>

        <div className="w-full sm:w-48">
          <InputField
            label="Mobile Number"
            id="managemobile"
            name="managemobile"
            placeholder="Enter Mobile Number"
            type="number"
            value={dataToFilter.mobileNo}
            onChange={(e) => {
              setDataToFilter({
                ...dataToFilter,
                mobileNo: e.target.value,
              });
            }}
          />
        </div>

        <div className="w-full sm:w-48">
          <InputField
            label="Company Name"
            placeholder="Enter Company Name"
            id="managecompanyname"
            name="managecompanyname"
            type="text"
            value={dataToFilter.companyName}
            onChange={(e) => {
              setDataToFilter({
                ...dataToFilter,
                companyName: e.target.value,
              });
            }}
          />
        </div>

        <div className="w-full sm:w-48">
          <AnimatedDropdown
            label="Status"
            placeholder="Status"
            id="managestatus"
            name="managestatus"
            options={[
              { value: "-1", label: "All" },
              { value: "1", label: "Active" },
              { value: "0", label: "Inactive" },
            ]}
            value={dataToFilter.status}
            onChange={(e) => {
              setDataToFilter({
                ...dataToFilter,
                status: e || "-1",
              });
            }}
          />
        </div>

        {/* <div className="w-full sm:w-48">
          <AnimatedDropdown
            label="Role"
            placeholder="Role"
            id="manageRole"
            name="manageRole"
            options={[
              { value: "Reseller User", label: "User" },
              { value: "Sales Person", label: "Sales Person" },
            ]}
            value={dataToFilter.role}
            onChange={(e) => {
              setDataToFilter({
                ...dataToFilter,
                role: e,
              });
            }}
          />
        </div> */}

        <div className="w-max-content">
          <UniversalButton
            id="managesearchbtn"
            name="managesearchbtn"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            onClick={fetchAllUsersDetails}
            disabled={isFetching}
          />
        </div>
      </div>

      <div>
        {/* {isFetching ? (
          <UniversalSkeleton height="35rem" width="100%" />
        ) : (
          <ManageUserTable allUsers={allUsers} fetchAllUsersDetails={fetchAllUsersDetails} />
        )} */}
        <ManageUserTable allUsers={allUsers} fetchAllUsersDetails={fetchAllUsersDetails} />
      </div>
    </div>
  );
};

export default ManageUser;
