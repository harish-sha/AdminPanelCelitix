// import {
//     deleteblockUser,
//     getblockUser,
//     getWabaList,
// } from "@/apis/whatsapp/whatsapp";
// import { DataTable } from "@/components/layout/DataTable";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import AnimatedDropdown from "../components/AnimatedDropdown";
// import { CgUnblock } from "react-icons/cg";
// import { render } from "timeago.js";
// import { IconButton } from "@mui/material";
// import CustomTooltip from "../components/CustomTooltip";
// import { Dialog } from "primereact/dialog";
// import UniversalButton from "../components/UniversalButton";

// export const BlockUser = () => {
//     //   const [cols, setCols] = useState([]);
//     const [rows, setRows] = useState([]);
//     const [allWaba, setAllWaba] = useState([]);
//     const [selectedWaba, setSelectedWaba] = useState(null);
//     const [selectedId, setSelectedId] = useState(null);
//     const [dialogVisible, setDialogVisible] = useState(false);

//     async function getAllWaba() {
//         try {
//             const res = await getWabaList();
//             setAllWaba(res);
//         } catch (e) {
//             toast.error("Error fetching waba");
//         }
//     }

//     async function handleGetAllBlockUser() {
//         try {
//             const res = await getblockUser(selectedWaba);

//             const formattedData = Array.isArray(res?.data)
//                 ? res?.data?.map((item, index) => ({
//                     sn: index + 1,
//                     id: item.wa_id,
//                     ...item,
//                 }))
//                 : [];
//             setRows(formattedData);
//         } catch (e) {
//             console.log(e);
//             toast.error("Error fetching block user");
//         }
//     }
//     useEffect(() => {
//         getAllWaba();
//     }, []);

//     useEffect(() => {
//         console.log(rows);
//     }, [rows]);

//     useEffect(() => {
//         if (!selectedWaba) return;

//         handleGetAllBlockUser();
//     }, [selectedWaba]);

//     function handleUnblockClick(id) {
//         setSelectedId(id);
//         setDialogVisible(true);
//     }
//     async function handleUnblock() {
//         try {
//             const payload = {
//                 messaging_product: "whatsapp",
//                 block_users: [
//                     { user: selectedId },
//                     //,{ "user": "919610099620" }
//                 ],
//             };
//             const res = await deleteblockUser(selectedWaba, payload);
//             if (res?.block_users?.removed_users?.length == 0) {
//                 toast.error("Unable to unblock user");
//             }
//             toast.success("User unblocked successfully");
//             setDialogVisible(false);
//             await handleGetAllBlockUser();
//         } catch (e) {
//             toast.error("Error unblocking user");
//         }
//     }

//     const cols = [
//         { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
//         {
//             field: "wa_id",
//             headerName: "Mobile No.",
//             flex: 1,
//             minWidth: 120,
//         },
//         {
//             field: "action",
//             headerName: "Action",
//             flex: 1,
//             minWidth: 120,
//             renderCell: (params) => (
//                 <CustomTooltip title="Unblock User" placement="top" arrow>
//                     <IconButton
//                         className="no-xs"
//                         onClick={() => handleUnblockClick(params.row.id)}
//                     >
//                         <CgUnblock className="text-gray-500 cursor-pointer hover:text-gray-700" />
//                     </IconButton>
//                 </CustomTooltip>
//             ),
//         },
//     ];
//     return (
//         <div>
//             <div className="flex items-center justify-center w-full flex-col gap-2" >
//                 <h1 className="text-2xl font-bold text-gray-600 mb-1 flex items-center gap-2">
//                     Blocked WhatsApp Users
//                 </h1>
//                 <p className="text-gray-600 mb-6 text-sm">
//                     Manage users who are currently blocked from messaging your WhatsApp business account. You can easily unblock users from the list below.
//                 </p>
//             </div>
//             <div className="mb-4 w-[15rem]">
//                 <AnimatedDropdown
//                     id="selectWaba"
//                     label={"Select WABA"}
//                     name="selectWaba"
//                     options={allWaba.map((waba) => ({
//                         value: waba.mobileNo,
//                         label: waba.name,
//                     }))}
//                     onChange={(e) => {
//                         setSelectedWaba(e);
//                     }}
//                     value={selectedWaba}
//                 />
//             </div>

//             <DataTable id="blockUser" rows={rows} col={cols} title="Block User" />

//             <Dialog
//                 header="Confirmation Dialog"
//                 visible={dialogVisible}
//                 style={{ width: "35rem" }}
//                 onHide={() => {
//                     setDialogVisible(false);
//                 }}
//                 draggable={false}
//             >
//                 <div className="space-y-2">
//                     <p>
//                         Are you sure you want to unblock this user
//                         <span className="font-semibold underline ml-1">{selectedId}</span>?
//                     </p>
//                     <div className="flex mr-auto ml-auto gap-2">
//                         <UniversalButton id="cancel" name="cancel" label="Cancel" />
//                         <UniversalButton
//                             id={"unblock"}
//                             name="unblock"
//                             label="Unblock"
//                             style={{ backgroundColor: "red" }}
//                             onClick={handleUnblock}
//                         />
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };


import { useState, useEffect } from "react";
import {
    deleteblockUser,
    getblockUser,
    getWabaList,
} from "@/apis/whatsapp/whatsapp";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { CgUnblock } from "react-icons/cg";
import UniversalButton from "../components/UniversalButton";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { FaHandPointDown } from "react-icons/fa";

export const BlockUser = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [allWaba, setAllWaba] = useState([]);
    const [selectedWaba, setSelectedWaba] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     // Only for demo: generate 50 dummy users if no real data
    //     if (selectedWaba && blockedUsers.length === 0 && !loading) {
    //         const dummy = Array.from({ length: 50 }).map((_, i) => ({
    //             wa_id: `91999999${(1000 + i).toString().padStart(4, "0")}`,
    //         }));
    //         setBlockedUsers(dummy);
    //     }
    // }, [selectedWaba, blockedUsers, loading]);

    const filteredUsers = blockedUsers.filter((user) =>
        user.wa_id.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        fetchAllWaba();
    }, []);

    useEffect(() => {
        if (selectedWaba) {
            setLoading(true);
            fetchBlockedUsers();
        }
    }, [selectedWaba]);

    const fetchAllWaba = async () => {
        try {
            const res = await getWabaList();
            setAllWaba(res);
        } catch {
            toast.error("Failed to load WABA list");
        }
    };

    const fetchBlockedUsers = async () => {
        try {
            const res = await getblockUser(selectedWaba);
            const formatted = Array.isArray(res?.data)
                ? res.data.map((user, i) => ({ sn: i + 1, ...user }))
                : [];
            setBlockedUsers(formatted);
        } catch {
            toast.error("Failed to load blocked users");
        } finally {
            setLoading(false);
        }
    };

    const handleUnblock = async () => {
        try {
            const payload = {
                messaging_product: "whatsapp",
                block_users: [{ user: selectedId }],
            };
            const res = await deleteblockUser(selectedWaba, payload);
            if (res?.block_users?.removed_users?.length === 0) {
                toast.error("Could not unblock user");
                return;
            }
            toast.success("User unblocked");
            setDialogVisible(false);
            fetchBlockedUsers();
        } catch {
            toast.error("Error unblocking user");
        }
    };

    // Skeleton loader cards
    const skeletonCards = Array.from({ length: 3 }).map((_, idx) => (
        <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between animate-pulse min-h-[120px]"
        >
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
    ));

    function highlightMatch(text, query) {
        if (!query) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <span className="bg-yellow-200 text-black rounded">
                    {text.slice(idx, idx + query.length)}
                </span>
                {text.slice(idx + query.length)}
            </>
        );
    }

    return (
        <>
            <div className="min-h-[90vh] bg-gray-50 rounded-xl py-6 px-4 shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-4 ">
                        <h1 className="text-2xl font-bold text-gray-700 mb-2">
                            Blocked WhatsApp Users
                        </h1>
                        <p className="text-gray-600  text-sm text-center">
                            Manage users who are currently blocked from messaging your WhatsApp business account.<br />
                            Unblock users easily with a single click.
                        </p>
                    </div>

                    <div className="mb-6 max-w-sm mx-auto">
                        <AnimatedDropdown
                            id="selectWaba"
                            label={"Select WABA Account"}
                            name="selectWaba"
                            options={allWaba.map((waba) => ({
                                value: waba.mobileNo,
                                label: waba.name,
                            }))}
                            onChange={(val) => setSelectedWaba(val)}
                            value={selectedWaba}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 h-150">

                        {!selectedWaba ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.2 }}
                                            className="mb-2 flex items-center justify-center"
                                        >
                                            <FaHandPointDown className="text-5xl text-indigo-400" style={{ transform: "rotate(180deg)" }} />
                                        </motion.div>
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                            Please select a WABA account
                                        </h3>
                                        <p className="text-gray-500 text-center max-w-xs text-sm">
                                            Choose a WABA from the dropdown above to view blocked users.
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : loading ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {skeletonCards}
                            </div>
                        ) : blockedUsers.length === 0 ? (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.3 }}

                                    className="col-span-full flex flex-col items-center justify-center h-full">
                                    <CgUnblock className="text-6xl text-indigo-400 animate-bounce mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-700">No Blocked Users</h3>
                                    <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
                                        All clear! No users are currently blocked for this WABA.
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <>
                                <div className="mb-6 flex justify-start">
                                    <input
                                        type="number"
                                        placeholder="Search number..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-3 py-1.5 w-full max-w-xs focus:outline-none "
                                    />
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-scroll h-120">
                                    <AnimatePresence>
                                        {filteredUsers.length === 0 ? (
                                            <div className="col-span-full flex flex-col items-center justify-center py-16">
                                                <CgUnblock className="text-6xl text-indigo-400 animate-bounce mb-4" />
                                                <h3 className="text-xl font-semibold text-gray-700">No Blocked Users</h3>
                                                <p className="text-gray-500 text-center mt-2 max-w-xs text-sm">
                                                    No users match your search.
                                                </p>
                                            </div>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <motion.div
                                                    key={user.wa_id}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 30 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between border border-indigo-50 h-35"
                                                >
                                                    <div className="mb-4">
                                                        <h3 className="text-md font-semibold text-gray-700">
                                                            {highlightMatch(user.wa_id, search)}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            Blocked from: {selectedWaba}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedId(user.wa_id);
                                                            setDialogVisible(true);
                                                        }}
                                                        className="mt-auto inline-flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 transition px-4 py-2 rounded-lg text-sm font-medium cursor-pointer "
                                                    >
                                                        <CgUnblock size={18} />
                                                        Unblock
                                                    </button>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <Dialog
                    header="Unblock Confirmation"
                    visible={dialogVisible}
                    style={{ width: "30rem" }}
                    onHide={() => setDialogVisible(false)}
                    draggable={false}
                >
                    <div className="space-y-4">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to unblock:
                            <span className="font-medium text-black ml-1">{selectedId}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <UniversalButton
                                id="cancel"
                                name="cancel"
                                label="Cancel"
                                onClick={() => setDialogVisible(false)}
                            />
                            <UniversalButton
                                id="unblock"
                                name="unblock"
                                label="Unblock"
                                style={{ backgroundColor: "#EF4444", color: "#fff" }}
                                onClick={handleUnblock}
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>

    );
};
