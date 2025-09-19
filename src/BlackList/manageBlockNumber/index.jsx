import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    addBlockNumber,
    deleteBlockNumber,
    // fetchUserSrno,
    getBlockNumberList,
} from "@/apis/blacklist/blacklist";
import { PaginationTable } from "@/components/layout/PaginationTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import { IconButton, Switch } from "@mui/material";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { is } from "date-fns/locale";
import { IoSearch } from "react-icons/io5";


const BlockNumber = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const [deleteData, setDeleteData] = useState({
        isOpen: false,
        blockSrNo: null,
        userSrNo: null,
    });
    const [editData, setEditData] = useState({
        isOpen: false,
    });

    const [addDataDialog, setAddDataDialog] = useState(false);

    const [mobileNo, setMobileNo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState([]);

    const [services, setServices] = useState([
        { name: "obd", status: false, },
        { name: "c2c", status: false },
        { name: "rcs", status: false },
        { name: "ibd", status: false },
        { name: "misscall", status: false },
        { name: "whatsapp", status: false },
        { name: "sms", status: false },
    ]);

    const [addData, setAddData] = useState({
        userSrNo: 0,
        mobileNo: "",
        type: "single",
        remark: "",
    });


    async function handleFetchBlockNumberList() {
        setIsFetching(true);
        try {
            const payload = { pageIndex: currentPage, mobileNo };

            const res = await getBlockNumberList(payload);

            const filterBlocked = (data) => {
                const keysWithZero = Object.keys(data)
                    .filter((key) => data[key] === 0)
                    ?.map((key) => key.toUpperCase());
                return keysWithZero;
            };
            const formattedRow = Array.isArray(res?.data?.content)
                ? res?.data?.content?.map((item, index) => ({
                    ...item,
                    id: index + 1,
                    sn: index + 1,
                    blocked:
                        filterBlocked(item).length === 0 ? "-" : filterBlocked(item),
                }))
                : [];

            setRows(formattedRow);
            setTotalPage(res?.data?.totalElements);
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    function handleDelete(row) {
        if (!row?.blockSrNo || !row?.userSrNo)
            return toast.error("Something went wrong");
        setDeleteData({
            isOpen: true,
            blockSrNo: row.blockSrNo,
            userSrNo: row.userSrNo,
        });
    }

    async function handleBlockNumberDelete() {
        setIsFetching(true);
        try {
            const res = await deleteBlockNumber(deleteData);

            if (!res?.success) {
                return toast.error("Something went wrong");
            }
            toast.success("Block number deleted successfully");
            setDeleteData({
                isOpen: false,
                blockSrNo: null,
                userSrNo: null,
            });
            handleFetchBlockNumberList();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    async function handleAddBlockNumber() {
        setIsFetching(true);
        try {
            const service = {};
            services?.forEach((item, index) => {
                service[item.name] = Number(item.status);
            });

            if (!addData?.mobileNo) return toast.error("Please enter mobile number");
            const payload = {
                ...addData,
                ...service,
            };

            const res = await addBlockNumber(payload);

            if (!res?.success) {
                // return toast.error("Something went wrong");
                return toast.error(res?.message || "Something went wrong");
            }

            toast.success("Block number added successfully");
            setAddDataDialog(false);
            setAddData({
                userSrNo: 0,
                mobileNo: "",
                type: "single",
                remark: "",
            });

            setServices([
                {
                    name: "obd",
                    status: false,
                },
                { name: "c2c", status: false },
                { name: "rcs", status: false },
                { name: "ibd", status: false },
                { name: "misscall", status: false },
                { name: "whatsapp", status: false },
                { name: "sms", status: false },
            ]);
            handleFetchBlockNumberList();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, width: 70 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0, minWidth: 200 },
        { field: "type", headerName: "Type", flex: 0, minWidth: 120 },
        { field: "blocked", headerName: "Blocked Service", flex: 1, minWidth: 200 },
        { field: "remark", headerName: "Remarks", flex: 1, minWidth: 150 },
        {
            field: "action",
            headerName: "Action",
            flex: 0,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <CustomTooltip title="Edit Account" placement="top" arrow>
                        <IconButton
                            onClick={() => {
                                handleEdit(params.row);
                            }}
                        >
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
                            onClick={() => {
                                handleDelete(params.row);
                            }}
                        >
                            <MdOutlineDeleteForever
                                className="text-red-500 cursor-pointer hover:text-red-600"
                                size={20}
                            />
                        </IconButton>
                    </CustomTooltip>
                </>
            ),
        },
    ];

    function handleEdit(row) {
        if (!row?.blockSrNo || !row?.userSrNo) return;

        const allServices = [...services];
        allServices.forEach((item) => {
            if (row.hasOwnProperty(item.name)) {
                item.status = Boolean(row[item.name]);
            }
        });

        const type = row.userSrNo === -1 ? "all" : "single";


        setServices(allServices);
        setEditData({
            isOpen: true,
            ...row,
            type,
            userSrNo: row.userSrNo,
        });
    }

    async function handleEditBlockRecord() {
        setIsFetching(true);
        try {
            const service = {};
            services?.forEach((item, index) => {
                service[item.name] = Number(item.status);
            });
            if (!editData?.mobileNo) return toast.error("Please enter mobile number");

            delete editData.blocked;
            delete editData.sn;
            delete editData.isOpen;
            delete editData.id;
            const payload = {
                ...editData,
                ...service,
            };

            const res = await addBlockNumber(payload);

            if (!res?.success) {
                return toast.error("Something went wrong");
            }

            toast.success("Block number updated successfully");
            // setEditData(false);
            setEditData({
                isOpen: false,
            });

            setServices([
                {
                    name: "obd",
                    status: false,
                },
                { name: "c2c", status: false },
                { name: "rcs", status: false },
                { name: "ibd", status: false },
                { name: "misscall", status: false },
                { name: "whatsapp", status: false },
                { name: "sms", status: false },
            ]);
            handleFetchBlockNumberList();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        handleFetchBlockNumberList();
    }, [currentPage]);

    return (
        <div>
            <div className="flex flex-wrap justify-center items-center gap-6 ">
                {/* <h1 className="text-2xl font-medium text-gray-800 ">
                    Manage Block Number
                </h1> */}
                <div className="flex gap-2 w-full items-end flex-wrap md:flex-nowrap justify-center">
                    <div className="flex gap-2 w-full items-end">
                        <div className="w-[350px]">
                            <InputField
                                id="blocknumber"
                                name="blocknumber"
                                label="Block Number"
                                value={mobileNo}
                                placeholder="Search Block Number"
                                onChange={(e) => setMobileNo(e.target.value)}
                            />
                        </div>

                        <div className="w-full w-max-content">

                            <UniversalButton
                                icon={<IoSearch />}
                                label={isFetching ? "Searching..." : "Search"}
                                disabled={isFetching}
                                id="search"
                                name="search"
                                onClick={handleFetchBlockNumberList}
                            />
                        </div>
                    </div>
                    <div className="w-max-content flex items-end text-nowrap">
                        <UniversalButton
                            label="Add Block Number"
                            id="addblocknumber"
                            name="addblocknumber"
                            onClick={() => setAddDataDialog(true)}
                        />
                    </div>
                </div>
            </div>


            <div className="mt-4">
                <PaginationTable
                    id="blocknumberlist"
                    name="blocknumberlist"
                    rows={rows}
                    col={columns}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                />
            </div>

            <Dialog
                header="Confirm Delete"
                visible={deleteData.isOpen}
                onHide={() => {
                    setDeleteData((prev) => ({
                        isOpen: false,
                        blockSrNo: any,
                        userSrNo: any,
                    }));
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div>
                    <div className="p-4 text-center">
                        <p className="text-[1.1rem] font-semibold text-gray-600">
                            Are you sure ?
                        </p>
                        <p>
                            Do you really want to delete this? This process cannot be undo.
                        </p>
                        <div className="flex justify-center gap-4 mt-2">
                            {!isFetching && (

                                <UniversalButton
                                    label="Cancel"
                                    style={{
                                        backgroundColor: "#090909",
                                    }}
                                    onClick={() => {
                                        setDeleteData((prev) => ({
                                            isOpen: false,
                                            blockSrNo: any,
                                            userSrNo: any,
                                        }));
                                    }}
                                />
                            )}
                            <UniversalButton
                                label={isFetching ? "Deleting..." : "Delete"}
                                disabled={isFetching}
                                variant="danger"
                                onClick={handleBlockNumberDelete}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* Add Mobile Dialoag */}
            <Dialog
                header="Add Mobile Number To Blacklist"
                visible={addDataDialog}
                onHide={() => {
                    setAddDataDialog(false);
                    setAddData({
                        userSrNo: 0,
                        mobileNo: "",
                        type: "single",
                        remark: "",
                    });

                    setServices([
                        {
                            name: "obd",
                            status: false,
                        },
                        { name: "c2c", status: false },
                        { name: "rcs", status: false },
                        { name: "ibd", status: false },
                        { name: "misscall", status: false },
                        { name: "whatsapp", status: false },
                        { name: "sms", status: false },
                    ]);
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className="space-y-2">


                    {/* <div className="grid grid-cols-2">
                        {services?.map((item, index) => (
                            <div className="flex items-center gap-2" key={item.name}>
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    id={item.name}
                                    checked={item.status}
                                    onChange={(e) => {
                                        const allServices = [...services];
                                        allServices[index].status = e.target.checked;
                                        setServices(allServices);
                                    }}
                                />
                                <label htmlFor={item.name}>{item.name.toUpperCase()}</label>
                            </div>
                        ))}
                    </div> */}

                    <div className="grid grid-cols-2 gap-3 my-4">
                        {services?.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-2 border p-2 rounded-md ">
                                <input
                                    type="checkbox"
                                    id={item.name}
                                    name={item.name}
                                    checked={item.status}
                                    onChange={(e) => {
                                        const allServices = [...services];
                                        allServices[index].status = e.target.checked;
                                        setServices(allServices);
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <label
                                    htmlFor={item.name}
                                    className="text-sm text-gray-700 cursor-pointer select-none"
                                >
                                    {item.name.toUpperCase()}
                                </label>
                            </div>
                        ))}
                    </div>


                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <InputField
                                id="addMobile"
                                name="addMobile"
                                label="Mobile Number"
                                tooltipContent="Enter mobile number you want to block"
                                value={addData.mobileNo}
                                placeholder="Enter Mobile Number"
                                onChange={(e) =>
                                    setAddData((prev) => ({
                                        ...prev,
                                        mobileNo: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <InputField
                            id="addRemarks"
                            name="addRemarks"
                            label="Remarks"
                            tooltipContent="Enter remarks/reason for blocking this number"
                            value={addData.remark}
                            placeholder="Enter Remarks"
                            onChange={(e) =>
                                setAddData((prev) => ({
                                    ...prev,
                                    remark: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <UniversalButton
                            id="save"
                            name="save"
                            // label="Save"
                            label={isFetching ? "Saving..." : "Save"}
                            disabled={isFetching}
                            onClick={handleAddBlockNumber}
                        />
                    </div>
                </div>
            </Dialog>

            {/* Edit Mobile Dialoag */}
            <Dialog
                header="Edit Blacklist Mobile Number"
                visible={editData.isOpen}
                onHide={() => {
                    setEditData((prev) => ({
                        isOpen: false,
                    }));
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-3 my-4">
                        {services?.map((item, index) => (
                            <div className="flex items-center border gap-2 rounded-md p-2" key={item.name}>
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    id={item.name}
                                    checked={item.status}
                                    onChange={(e) => {
                                        const allServices = [...services];
                                        allServices[index].status = e.target.checked;
                                        setServices(allServices);
                                    }}
                                />
                                <label
                                    htmlFor={item.name}
                                    className="text-sm text-gray-700 cursor-pointer select-none"

                                >
                                    {item.name.toUpperCase()}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2" >
                            <InputField
                                id="addMobile"
                                name="addMobile"
                                label="Mobile Number"
                                tooltipContent="Enter mobile number you want to block"
                                value={editData.mobileNo}
                                placeholder="Enter Mobile Number"
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        mobileNo: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <InputField
                            id="addRemarks"
                            name="addRemarks"
                            label="Remarks"
                            tooltipContent="Enter remarks/reason for blocking this number"
                            value={editData.remark}
                            placeholder="Enter Remarks"
                            onChange={(e) =>
                                setEditData((prev) => ({
                                    ...prev,
                                    remark: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="flex justify-center items-center">
                        <UniversalButton
                            id="update"
                            name="update"
                            // label="Update"
                            label={isFetching ? "Updating..." : "Update"}
                            disabled={isFetching}
                            onClick={handleEditBlockRecord}
                        />
                    </div>
                </div>
            </Dialog>
        </div >
    );
};

export default BlockNumber;
