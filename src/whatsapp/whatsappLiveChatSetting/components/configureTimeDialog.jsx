import React, { useState } from 'react'
import { Dialog, Switch } from '@mui/material'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import UniversalButton from '../../components/UniversalButton';



function ConfigureTimeDialog({
    workingHoursDialog,
    setWorkingHoursDialog,
    selectedAgentName,
    setSelectedAgentName,
    workingHours,
    setWorkingHours,
    selectedAgentId,
    setSelectedAgentId


}) {

    const [fileData, setFileData] = useState({
        url: "",
        file: "",
    });
    const [agentList, setAgentList] = useState([]);
    const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);



    const handleOpenWorkingHoursDialog = async (agentId, agentName) => {
        setSelectedAgentId(agentId);
        setSelectedAgentName(agentName);
        setWorkingHoursDialog(true);
        setWorkingHours(null);

        try {
            const response = await getWorkingHours(agentId);
            if (response?.statusCode === 200) {
                if (response.data.length > 0) {
                    const newWorkingHours = {
                        Monday: { enabled: false, start: null, end: null },
                        Tuesday: { enabled: false, start: null, end: null },
                        Wednesday: { enabled: false, start: null, end: null },
                        Thursday: { enabled: false, start: null, end: null },
                        Friday: { enabled: false, start: null, end: null },
                        Saturday: { enabled: false, start: null, end: null },
                        Sunday: { enabled: false, start: null, end: null },
                    };

                    response.data.forEach((entry) => {
                        const dayMap = {
                            1: "Monday",
                            2: "Tuesday",
                            3: "Wednesday",
                            4: "Thursday",
                            5: "Friday",
                            6: "Saturday",
                            7: "Sunday",
                        };

                        const dayName = dayMap[entry.day];
                        if (dayName) {
                            newWorkingHours[dayName] = {
                                enabled: entry.status === 1,
                                start: dayjs(entry.fromTime, "HH:mm:ss"),
                                end: dayjs(entry.toTime, "HH:mm:ss"),
                            };
                        }
                    });

                    setWorkingHours(newWorkingHours);
                } else {
                    // setWorkingHours(null);
                    setWorkingHours({
                        Monday: { enabled: false, start: null, end: null },
                        Tuesday: { enabled: false, start: null, end: null },
                        Wednesday: { enabled: false, start: null, end: null },
                        Thursday: { enabled: false, start: null, end: null },
                        Friday: { enabled: false, start: null, end: null },
                        Saturday: { enabled: false, start: null, end: null },
                        Sunday: { enabled: false, start: null, end: null },
                    });
                }
            } else {
                toast.error("Failed to load working hours.");
                setWorkingHours(null);
            }
        } catch (error) {
            toast.error("Error fetching working hours.");
            setWorkingHours(null);
        }
    };

    const handleSaveWorkingHours = async () => {
        const schedule = {};
        let hasValidationError = false;

        Object.keys(workingHours).forEach((day) => {
            if (workingHours[day].enabled) {
                if (!workingHours[day].start || !workingHours[day].end) {
                    hasValidationError = true;
                }
                schedule[day.toLowerCase()] = {
                    starttime: workingHours[day].start
                        ? workingHours[day].start.format("HH:mm")
                        : null,
                    endTime: workingHours[day].end
                        ? workingHours[day].end.format("HH:mm")
                        : null,
                    status: 1,
                };
            } else {
                schedule[day.toLowerCase()] = {
                    starttime: null,
                    endTime: null,
                    status: 0,
                };
            }
        });

        if (hasValidationError) {
            toast.error("Please assign hours to all enabled days before saving.");
            return;
        }

        try {
            const response = await saveWorkingHours(selectedAgentId, schedule);
            if (response?.statusCode === 200) {
                toast.success("Working hours saved successfully!");
                setWorkingHoursDialog(false);
            } else {
                toast.error("Failed to save working hours.");
            }
        } catch (error) {
            toast.error("Error saving working hours.");
        }
    };

    const rows = agentList.map((agent, index) => ({
        id: agent.sr_no, // Using sr_no as unique ID
        // id: index + 1,
        sn: index + 1,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobileNo,
        department_name: agent.department_name,
        status: agent.status,
    }));

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
        { field: "mobile", headerName: "Mobile No", flex: 1, minWidth: 120 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <CustomTooltip
                    arrow
                    placement="top"
                    title={params.value === 1 ? "Active" : "Inactive"}
                >
                    <Switch
                        checked={params.value === 1}
                        onChange={() => handleStatusChange(params.row.id, params.value)}
                        sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#34C759",
                            },
                            "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                            {
                                backgroundColor: "#34C759",
                            },
                        }}
                    />
                </CustomTooltip>
            ),
        },
        {
            field: "department_name",
            headerName: "Department Name",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <>
                    <CustomTooltip arrow title="Auto Reply" placement="top">
                        <IconButton onClick={() => handleReply(params.row)}>
                            <ReplyIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip placement="top" arrow title="Working Hours">
                        <IconButton
                            onClick={() =>
                                handleOpenWorkingHoursDialog(params.row.id, params.row.name)
                            }
                        >
                            <AccessTimeOutlinedIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip placement="top" arrow title="Assign">
                        <IconButton onClick={() => handleAssign(params.row)}>
                            <SettingsOutlinedIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip placement="top" arrow title="Edit">
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditNoteIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip placement="top" arrow title="Delete">
                        <IconButton
                            className="no-xs"
                            onClick={() =>
                                handleOpenDeleteDialog(params.row.id, params.row.name)
                            }
                        >
                            <DeleteForeverIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "#e31a1a",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                </>
            ),
        },
    ];

    return (
        <Dialog
            header={`Working Hours-${selectedAgentName} `}
            visible={workingHoursDialog}
            onHide={() => setWorkingHoursDialog(false)}
            className="w-[80rem]"
            draggable={false}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="space-y-2">
                    {/* If working hours are not assigned, show a message + Assign Now button */}
                    {workingHours === null ? (
                        <div className="flex flex-col items-center justify-center text-gray-500 text-lg space-y-5 mt-5">
                            <p>{selectedAgentName} has not assigned working hours</p>
                            <button
                                className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer text-[1rem]"
                                onClick={() =>
                                    setWorkingHours({
                                        Monday: { enabled: false, start: null, end: null },
                                        Tuesday: { enabled: false, start: null, end: null },
                                        Wednesday: { enabled: false, start: null, end: null },
                                        Thursday: { enabled: false, start: null, end: null },
                                        Friday: { enabled: false, start: null, end: null },
                                        Saturday: { enabled: false, start: null, end: null },
                                        Sunday: { enabled: false, start: null, end: null },
                                    })
                                }
                            >
                                Assign Now
                            </button>
                        </div>
                    ) : (
                        workingHours &&
                        Object.keys(workingHours).map((day) => (
                            <div
                                key={day}
                                className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
                            >
                                {/* Toggle Open/Closed */}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        sx={{
                                            "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                                            {
                                                backgroundColor: "#34C759",
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked": {
                                                color: "#34C759",
                                            },
                                        }}
                                        checked={workingHours[day].enabled}
                                        onChange={() =>
                                            setWorkingHours((prev) => ({
                                                ...prev,
                                                [day]: {
                                                    ...prev[day],
                                                    enabled: !prev[day].enabled,
                                                },
                                            }))
                                        }
                                    />
                                    <span className="font-semibold text-blue-600 text-sm">
                                        {day}
                                    </span>
                                </div>

                                {/* Time Inputs when Enabled */}
                                {workingHours[day].enabled ? (
                                    <div className="flex gap-2">
                                        <TimePicker
                                            value={workingHours[day].start}
                                            onChange={(newTime) =>
                                                setWorkingHours((prev) => ({
                                                    ...prev,
                                                    [day]: { ...prev[day], start: newTime },
                                                }))
                                            }
                                            ampm
                                            className="w-35 text-xs"
                                        />
                                        <TimePicker
                                            value={workingHours[day].end}
                                            onChange={(newTime) =>
                                                setWorkingHours((prev) => ({
                                                    ...prev,
                                                    [day]: { ...prev[day], end: newTime },
                                                }))
                                            }
                                            ampm
                                            className="w-35 text-xs"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 flex p-2 pr-10 justify-center items-center">
                                        <span className="text-gray-400 text-sm font-semibold">
                                            Closed
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {/*  Show Save Button only if there are working hours to update */}
                    {workingHours !== null && (
                        <div className="flex justify-center mt-4">
                            <UniversalButton
                                label="Save"
                                id="workingHoursSave"
                                name="workingHoursSave"
                                onClick={handleSaveWorkingHours}
                            />
                        </div>
                    )}
                </div>
            </LocalizationProvider>
        </Dialog>
    )
}

export default ConfigureTimeDialog;


