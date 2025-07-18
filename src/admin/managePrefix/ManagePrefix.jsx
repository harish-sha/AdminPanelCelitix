import React, { useEffect, useState } from "react";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import ManagePrefixTable from "./components/ManagePrefixTable";
import { Dialog } from "primereact/dialog";
import UniversalTextArea from "../../whatsapp/components/UniversalTextArea";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  addPrefix,
  getCountryList,
  getOperatorList,
  getPrefixList,
} from "@/apis/admin/admin";
import InputField from "@/components/layout/InputField";

const ManagePrefix = () => {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [prefixadd, setPrefixAdd] = useState(false);
  const [addPrefixData, setAddPrefixData] = useState({
    operatorSrno: 0,
    circleSrno: 0,
    countrySrno: 0,
    prefix: [],
  });
  const [dropdownData, setDropdownData] = useState({
    operator: [],
    country: [],
  });
  const [searchData, setSearchData] = useState({
    country: "",
    operator: "",
  });
  const [data, setData] = useState([]);

  async function handleFetchOperatorList() {
    try {
      const res = await getOperatorList();
      const mappedData = res?.map((item) => ({
        label: item.operatorName,
        value: item.srNo,
      }));

      setDropdownData((prev) => ({
        ...prev,
        operator: mappedData,
      }));
    } catch (e) {
      toast.error("Something went wrong");
    }
  }
  async function handleFetchCountryList() {
    try {
      const res = await getCountryList();
      const mappedData = res?.map((item) => ({
        label: item.countryName,
        value: item.srNo,
      }));

      setDropdownData((prev) => ({
        ...prev,
        country: mappedData,
      }));
    } catch (e) {
      toast.error("Something went wrong");
    }
  }
  async function handleSearch() {
    if (!searchData.country && !searchData.operator) return;
    try {
      const res = await getPrefixList(searchData);
      const countryList = await getCountryList();

      if (!res?.length) {
        setData([]);
        return;
      }

      const countryMap = new Map(
        countryList.map((country) => [country.srNo, country.countryName])
      );

      const enrichedOperators = res?.map((operator) => ({
        ...operator,
        countryName: countryMap.get(operator.countrySrno) || null,
      }));

      const sortedData = enrichedOperators
        ?.filter((item) => item.countryName != null)
        .sort((a, b) => a.countryName.localeCompare(b.countryName));

      setData(sortedData);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    handleFetchOperatorList();
    handleFetchCountryList();
    handleSearch();
  }, []);

  const handleAddOperator = () => {
    navigate("/addoperator");
  };

  const countryOptions = [
    { label: "India", value: "India" },
    { label: "USA", value: "USA" },
    { label: "UK", value: "UK" },
    { label: "Australia", value: "Australia" },
  ];

  const operatorOptions = [
    { label: "Vodafone", value: "Vodafone" },
    { label: "Aircel", value: "Aircel" },
    { label: "BSNL", value: "BSNL" },
    { label: "Reliance Jio", value: "Reliance Jio" },
  ];

  const circleOptions = [
    { label: "All", value: "all" },
    { label: "Circle 1", value: "circle1" },
    { label: "Circle 2", value: "circle2" },
    { label: "Circle 3", value: "circle3" },
  ];

  const handleAddPrefix = () => {
    setPrefixAdd(true);
  };

  async function handleSavePrefix() {
    try {
      const payload = {
        ...addPrefixData,
        prefix: addPrefixData.prefix.split(),
      };
      const res = await addPrefix(payload);

      if (!res?.flag) {
        return toast.error(res?.msg);
      }
      toast.success(res?.msg);
      setPrefixAdd(false);
      setAddPrefixData({});
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
        <div className="flex flex-wrap gap-2 items-end">
          <div className="w-60">
            <DropdownWithSearch
              label="Country"
              id="country"
              name="country"
              options={dropdownData.country}
              onChange={(e) => {
                setSearchData({ ...searchData, country: e });
              }}
              value={searchData.country}
            />
          </div>
          <div className="w-60">
            <DropdownWithSearch
              label="Operator"
              id="operator"
              name="operator"
              options={dropdownData.operator}
              onChange={(e) => {
                setSearchData({ ...searchData, operator: e });
              }}
              value={searchData.operator}
            />
          </div>
          {/* <div className="w-max-content">
            <DropdownWithSearch
              label="Circle"
              id="circle"
              name="circle"
              options={circleOptions}

            />
          </div> */}
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="searcherrorcode"
              name="searcherrorcode"
              onClick={handleSearch}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Delete"
              id="deleteerrorcode"
              name="deleteerrorcode"
              // onClick={handleSMPPErrorDelete}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-max-content">
            <UniversalButton
              label="Add Operator"
              id="addoperator"
              name="addoperator"
              onClick={handleAddOperator}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Add Prefix"
              id="addprefix"
              name="addprefix"
              onClick={handleAddPrefix}
            />
          </div>
        </div>
      </div>

      {/* ✅ Show Loader or Table */}
      {isFetching ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        <div className="w-full">
          <ManagePrefixTable
            id="managePrefixTable"
            name="managePrefixTable"
            data={data}
            // isFetching={isFetching}
          />
        </div>
      )}

      <Dialog
        header="Add Prefix"
        visible={prefixadd}
        onHide={() => setPrefixAdd(false)}
        className="w-2/3 md:w-1/2 lg:w-1/3"
        draggable={false}
      >
        <small className="font-bold">
          Enter each prefix with sign and new line.{" "}
        </small>
        <div className="space-y-4 w-full">
          <DropdownWithSearch
            label="Country"
            id="country"
            name="country"
            options={dropdownData.country}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, countrySrno: e });
            }}
            value={addPrefixData.countrySrno}
          />

          <DropdownWithSearch
            label="Operator"
            id="operator"
            name="operator"
            options={dropdownData.operator}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, operatorSrno: e });
            }}
            value={addPrefixData.operatorSrno}
          />

          <InputField
            id="circle"
            name="circle"
            label="Circle"
            value={addPrefixData.circleSrno}
            onChange={(e) => {
              setAddPrefixData({
                ...addPrefixData,
                circleSrno: Number(e.target.value),
              });
            }}
            placeholder="Enter Circle Code"
          />

          <UniversalTextArea
            label="Prefix :"
            id="prefixaddtext"
            name="prefixaddtext"
            placeholder="Enter Prefix"
            value={addPrefixData.prefix}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, prefix: e.target.value });
            }}
          />
          <div className="flex justify-center">
            <UniversalButton
              label="Save"
              id="saveaddprefix"
              name="saveaddprefix"
              onClick={handleSavePrefix}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManagePrefix;
