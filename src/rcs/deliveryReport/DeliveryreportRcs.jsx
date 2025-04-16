// import React, { useEffect, useState } from "react";
// import Loader from "../../whatsapp/components/Loader";
// import Box from "@mui/material/Box";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import { IoSearch } from "react-icons/io5";
// import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
// import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
// import {
//   a11yProps,
//   CustomTabPanel,
// } from "../../whatsapp/managetemplate/components/CustomTabPanel";
// import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
// import InputField from "../../whatsapp/components/InputField";
// import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
// import UniversalButton from "../../whatsapp/components/UniversalButton";
// import CampaignsLogsTable from "./components/CampaignsLogsTableRcs";
// import DayWiseSummarytableRcs from "./components/DayWiseSummarytableRcs";
// import { fetchCampaignReport, fetchSummaryReport } from "../../apis/rcs/rcs";
// import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
// import { Checkbox } from "primereact/checkbox";
// import toast from "react-hot-toast";

// const DeliveryreportRcs = () => {
//   const [value, setValue] = useState(0);
//   const [isFetching, setIsFetching] = useState(false);

//   //campaignState
//   const [campaignData, setCampaignData] = useState({
//     startDate: new Date().toLocaleDateString("en-GB"),
//     templateType: "",
//     campaignName: "",
//     status: "",
//   });
//   const [campaignTableData, setCampaignTableData] = useState([]);

//   //summaryState
//   const [summaryData, setSummaryData] = useState({
//     fromDate: new Date().toLocaleDateString("en-GB"),
//     toDate: new Date().toLocaleDateString("en-GB"),
//     isMonthWise: false,
//   });
//   const [summaryTableData, setSummaryTableData] = useState([]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   //formatDate
//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   //fetchCampaignData
//   const handleCampaignSearch = async () => {
//     const data = {
//       // startDate: new Date(campaignData.startDate).toLocaleDateString("en-GB"),
//       // endDate: new Date(campaignData.startDate).toLocaleDateString("en-GB"),
//       startDate: "01/10/2024",
//       endDate: "01/10/2024",
//       templateType: campaignData.templateType ?? "",
//       campaignName: campaignData.campaignName,
//       status: campaignData.status ?? "",
//     };

//     try {
//       setIsFetching(true);
//       const res = await fetchCampaignReport(data);
//       setCampaignTableData(res);
//     } catch (e) {
//       toast.error("Something went wrong.");
//       console.log(e);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   //fetchSummaryData
//   const handleSummarySearch = async () => {
//     if (!summaryData.fromDate || !summaryData.toDate) {
//       toast.error("Please select from and to date.");
//     }
//     const data = {
//       // fromDate: formatDate(summaryData.fromDate),
//       //toDate: formatDate(summaryData.toDate),
//       fromDate: "2022-10-01",
//       toDate: "2025-02-26",
//       summaryType: "rcs,date,user",
//       isMonthWise: Number(summaryData.isMonthWise),
//     };

//     try {
//       setIsFetching(true);
//       const res = await fetchSummaryReport(data);
//       setSummaryTableData(res);
//     } catch (e) {
//       console.log(e);
//       toast.error("Something went wrong.");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     handleSummarySearch();
//   }, [summaryData.isMonthWise]);

//   return (
//     <div>
//       <div className="w-full">
//         <Box sx={{ width: "100%" }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="Deliveryre Report Tabs"
//             textColor="primary"
//             indicatorColor="primary"
//             variant="scrollable"
//             scrollButtons="auto"
//             allowScrollButtonsMobile
//             className="w-full"
//           >
//             <Tab
//               label={
//                 <span className="flex items-center gap-1 text-sm md:text-base">
//                   <GradingOutlinedIcon fontSize="small" /> Campaigns Logs
//                 </span>
//               }
//               {...a11yProps(0)}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 color: "text.secondary",
//                 "&:hover": {
//                   color: "primary.main",
//                   backgroundColor: "#f0f4ff",
//                   borderRadius: "8px",
//                 },
//               }}
//             />
//             <Tab
//               label={
//                 <span className="flex items-center gap-1 text-sm md:text-base">
//                   <LibraryBooksOutlinedIcon fontSize="small" /> Day Wise Summary
//                 </span>
//               }
//               {...a11yProps(1)}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 color: "text.secondary",
//                 "&:hover": {
//                   color: "primary.main",
//                   backgroundColor: "#f0f4ff",
//                   borderRadius: "8px",
//                 },
//               }}
//             />
//           </Tabs>

//           <CustomTabPanel value={value} index={0}>
//             <div className="w-full">
//               <div className="flex flex-wrap items-end w-full gap-2 mb-5">
//                 <div className="w-full sm:w-56">
//                   <UniversalDatePicker
//                     label="Created On"
//                     id="created"
//                     name="created"
//                     value={setCampaignData.startDate}
//                     onChange={(e) => {
//                       setCampaignData({
//                         ...campaignData,
//                         startDate: e,
//                       });
//                     }}
//                     minDate={new Date().setMonth(new Date().getMonth() - 3)}
//                     maxDate={new Date()}
//                   />
//                 </div>
//                 <div className="w-full sm:w-56">
//                   <InputField
//                     label="Campaign Name"
//                     id="campaignName"
//                     name="campaignName"
//                     placeholder="Enter campaign name"
//                     value={campaignData.campaignName}
//                     onChange={(e) => {
//                       setCampaignData({
//                         ...campaignData,
//                         campaignName: e.target.value,
//                       });
//                     }}
//                   />
//                 </div>
//                 <div className="w-full sm:w-56">
//                   <AnimatedDropdown
//                     label="Template Type"
//                     id="templateType"
//                     name="templateType"
//                     options={[
//                       { label: "Text", value: "text" },
//                       { label: "Image", value: "image" },
//                       {
//                         label: "Rich Card Stand Alone",
//                         value: "richcardstandalone",
//                       },
//                       {
//                         label: "Rich Card Carausel",
//                         value: "richcardcarousel",
//                       },
//                     ]}
//                     value={campaignData.templateType}
//                     placeholder="Select Template Type"
//                     onChange={(e) => {
//                       setCampaignData({
//                         ...campaignData,
//                         templateType: e,
//                       });
//                     }}
//                   />
//                 </div>
//                 <div className="w-full sm:w-56">
//                   <AnimatedDropdown
//                     label="Status"
//                     id="status"
//                     name="status"
//                     options={[
//                       { label: "Pending", value: "Pending" },
//                       { label: "Completed", value: "Completed" },
//                       { label: "Cancelled", value: "Cancelled" },
//                       { label: "Scheduled", value: "Scheduled" },
//                     ]}
//                     value={campaignData.status}
//                     placeholder="Select Status"
//                     onChange={(e) => {
//                       setCampaignData({
//                         ...campaignData,
//                         status: e,
//                       });
//                     }}
//                   />
//                 </div>
//                 <div className="w-max-content">
//                   <UniversalButton
//                     label="Search"
//                     id="campaignsearch"
//                     name="campaignsearch"
//                     variant="primary"
//                     onClick={handleCampaignSearch}
//                     icon={<IoSearch />}
//                   />
//                 </div>
//               </div>
//             </div>
//             {isFetching ? (
//               <div className="">
//                 <UniversalSkeleton height="35rem" width="100%" />
//               </div>
//             ) : (
//               <div className="w-full">
//                 <CampaignsLogsTable
//                   id="whatsappManageCampaignTable"
//                   name="whatsappManageCampaignTable"
//                   data={campaignTableData}
//                 />
//               </div>
//             )}
//           </CustomTabPanel>
//           <CustomTabPanel value={value} index={1}>
//             <div className="flex flex-wrap items-end w-full gap-2 mb-5">
//               <div className="w-full sm:w-56">
//                 <UniversalDatePicker
//                   label="From Date"
//                   id="fromDate"
//                   name="fromDate"
//                   value={setSummaryData.fromDate}
//                   onChange={(e) => {
//                     setSummaryData({
//                       ...summaryData,
//                       fromDate: e,
//                     });
//                   }}
//                   minDate={new Date().setMonth(new Date().getMonth() - 3)}
//                   maxDate={new Date()}
//                 />
//               </div>
//               <div className="w-full sm:w-56">
//                 <UniversalDatePicker
//                   label="To Date"
//                   id="toDate"
//                   name="toDate"
//                   value={setSummaryData.toDate}
//                   onChange={(e) => {
//                     setSummaryData({
//                       ...summaryData,
//                       toDate: e,
//                     });
//                   }}
//                   minDate={new Date().setMonth(new Date().getMonth() - 3)}
//                   maxDate={new Date()}
//                 />
//               </div>
//               <div className="flex items-center justify-center gap-2">
//                 <Checkbox
//                   id="isMonthWise"
//                   name="isMonthWise"
//                   label="Month Wise"
//                   checked={summaryData.isMonthWise}
//                   onChange={(e) => {
//                     setSummaryData({
//                       ...summaryData,
//                       isMonthWise: e.target.checked,
//                     });
//                   }}
//                   className="m-2"
//                 />
//                 <label htmlFor="isMonthWise" className="text-md">
//                   Month Wise
//                 </label>
//               </div>
//               <div className="w-full sm:w-56">
//                 <UniversalButton
//                   label="Show"
//                   id="show"
//                   name="show"
//                   variant="primary"
//                   disabled={isFetching}
//                   onClick={handleSummarySearch}
//                 />
//               </div>
//             </div>
//             {isFetching ? (
//               <div className="">
//                 <UniversalSkeleton height="35rem" width="100%" />
//               </div>
//             ) : (
//               <div className="w-full">
//                 <DayWiseSummarytableRcs
//                   data={summaryTableData}
//                   isMonthWise={summaryData.isMonthWise}
//                 />
//               </div>
//             )}
//           </CustomTabPanel>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default DeliveryreportRcs;

// // {isFetching ? (
// //   <UniversalSkeleton height="35rem" width="100%" />

// // ) : (
// //   // Case 3: Show data in the table
// //   // <DataTable
// //   //     id="whatsappManageTemplateTable"
// //   //     name="whatsappManageTemplateTable"
// //   //     wabaNumber={selectedWaba}
// //   //     wabaList={wabaList}
// //   //     data={filteredData}
// //   // />
// // )}


import React, { useEffect, useState } from "react";
import Loader from "../../whatsapp/components/Loader";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoSearch } from "react-icons/io5";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
  a11yProps,
  CustomTabPanel,
} from "../../whatsapp/managetemplate/components/CustomTabPanel";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import InputField from "../../whatsapp/components/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import CampaignsLogsTable from "./components/CampaignsLogsTableRcs";
import DayWiseSummarytableRcs from "./components/DayWiseSummarytableRcs";
import { fetchCampaignReport, fetchSummaryReport } from "../../apis/rcs/rcs";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";

const DeliveryreportRcs = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  //campaignState
  const [campaignData, setCampaignData] = useState({
    startDate: new Date().toLocaleDateString("en-GB"),
    templateType: "",
    campaignName: "",
    status: "",
  });
  const [campaignTableData, setCampaignTableData] = useState([]);

  //summaryState
  const [summaryData, setSummaryData] = useState({
    fromDate: new Date().toLocaleDateString("en-GB"),
    toDate: new Date().toLocaleDateString("en-GB"),
    isMonthWise: false,
  });
  const [summaryTableData, setSummaryTableData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //formatDate
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  //fetchCampaignData
  const handleCampaignSearch = async () => {
    const data = {
      startDate: new Date(campaignData.startDate).toLocaleDateString("en-GB"),
      endDate: new Date(campaignData.startDate).toLocaleDateString("en-GB"),
      templateType: campaignData.templateType ?? "",
      campaignName: campaignData.campaignName,
      status: campaignData.status ?? "",
    };

    console.log(data);

    try {
      setIsFetching(true);
      const res = await fetchCampaignReport(data);
      console.log(res);
      setCampaignTableData(res);
    } catch (e) {
      toast.error("Something went wrong.");
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  //fetchSummaryData
  const handleSummarySearch = async () => {
    if (!summaryData.fromDate || !summaryData.toDate) {
      toast.error("Please select from and to date.");
    }
    const data = {
      // fromDate: formatDate(summaryData.fromDate),
      //toDate: formatDate(summaryData.toDate),
      fromDate: "2022-10-01",
      toDate: "2025-02-26",
      summaryType: "rcs,date,user",
      isMonthWise: Number(summaryData.isMonthWise),
    };

    try {
      setIsFetching(true);
      const res = await fetchSummaryReport(data);
      setSummaryTableData(res);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleSummarySearch();
  }, [summaryData.isMonthWise]);

  return (
    <div>
      <div className="w-full">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Deliveryre Report Tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            className="w-full"
          >
            <Tab
              label={
                <span className="flex items-center gap-1 text-sm md:text-base">
                  <GradingOutlinedIcon fontSize="small" /> Campaigns Logs
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span className="flex items-center gap-1 text-sm md:text-base">
                  <LibraryBooksOutlinedIcon fontSize="small" /> Day Wise Summary
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <div className="w-full">
              <div className="flex flex-wrap items-end w-full gap-2 mb-5">
                <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    label="Created On"
                    id="created"
                    name="created"
                    value={setCampaignData.startDate}
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        startDate: e,
                      });
                    }}
                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                    maxDate={new Date()}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <InputField
                    label="Campaign Name"
                    id="campaignName"
                    name="campaignName"
                    placeholder="Enter campaign name"
                    value={campaignData.campaignName}
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        campaignName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Template Type"
                    id="templateType"
                    name="templateType"
                    options={[
                      { label: "Text", value: "text" },
                      { label: "Image", value: "image" },
                      {
                        label: "Rich Card Stand Alone",
                        value: "richcardstandalone",
                      },
                      {
                        label: "Rich Card Carausel",
                        value: "richcardcarousel",
                      },
                    ]}
                    value={campaignData.templateType}
                    placeholder="Select Template Type"
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        templateType: e,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Status"
                    id="status"
                    name="status"
                    options={[
                      { label: "Pending", value: "Pending" },
                      { label: "Completed", value: "Completed" },
                      { label: "Cancelled", value: "Cancelled" },
                      { label: "Scheduled", value: "Scheduled" },
                    ]}
                    value={campaignData.status}
                    placeholder="Select Status"
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        status: e,
                      });
                    }}
                  />
                </div>
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="campaignsearch"
                    name="campaignsearch"
                    variant="primary"
                    onClick={handleCampaignSearch}
                    icon={<IoSearch />}
                  />
                </div>
              </div>
            </div>
            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <CampaignsLogsTable
                  id="whatsappManageCampaignTable"
                  name="whatsappManageCampaignTable"
                  data={campaignTableData}
                />
              </div>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex flex-wrap items-end w-full gap-2 mb-5">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="fromDate"
                  name="fromDate"
                  value={setSummaryData.fromDate}
                  onChange={(e) => {
                    setSummaryData({
                      ...summaryData,
                      fromDate: e,
                    });
                  }}
                  minDate={new Date().setMonth(new Date().getMonth() - 3)}
                  maxDate={new Date()}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="toDate"
                  name="toDate"
                  value={setSummaryData.toDate}
                  onChange={(e) => {
                    setSummaryData({
                      ...summaryData,
                      toDate: e,
                    });
                  }}
                  minDate={new Date().setMonth(new Date().getMonth() - 3)}
                  maxDate={new Date()}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Checkbox
                  id="isMonthWise"
                  name="isMonthWise"
                  label="Month Wise"
                  checked={summaryData.isMonthWise}
                  onChange={(e) => {
                    setSummaryData({
                      ...summaryData,
                      isMonthWise: e.target.checked,
                    });
                  }}
                  className="m-2"
                />
                <label htmlFor="isMonthWise" className="text-md">
                  Month Wise
                </label>
              </div>
              <div className="w-full sm:w-56">
                <UniversalButton
                  label="Show"
                  id="show"
                  name="show"
                  variant="primary"
                  disabled={isFetching}
                  onClick={handleSummarySearch}
                />
              </div>
            </div>
            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <DayWiseSummarytableRcs
                  data={summaryTableData}
                  isMonthWise={summaryData.isMonthWise}
                />
              </div>
            )}
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default DeliveryreportRcs;

// {isFetching ? (
//   <UniversalSkeleton height="35rem" width="100%" />

// ) : (
//   // Case 3: Show data in the table
//   // <DataTable
//   //     id="whatsappManageTemplateTable"
//   //     name="whatsappManageTemplateTable"
//   //     wabaNumber={selectedWaba}
//   //     wabaList={wabaList}
//   //     data={filteredData}
//   // />
// )}