import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import { Dialog } from 'primereact/dialog';
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from '@mui/icons-material/EditNote';
import toast from 'react-hot-toast';

import UniversalButton from '../components/UniversalButton';
import { getWabaList, createWabaAccount } from '../../apis/whatsapp/whatsapp';
import Loader from '../components/Loader';

const WhatsappManageWaba = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wabaList, setWabaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWaba, setSelectedWaba] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newWabaName, setNewWabaName] = useState("");

    // Facebook Login Simulation
    const handleFacebookLogin = () => {
        console.log("Logging in with Facebook...");
        setIsLoggedIn(true); // Simulate successful login
    };

    // Fetch WABA List
    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchWabaList = async () => {
            try {
                setIsLoading(true);
                const response = await getWabaList();
                if (response?.length > 0) {
                    setWabaList(response);
                } else {
                    toast.error("No WABA accounts found. Please create one.");
                }
            } catch (error) {
                toast.error("Error fetching WABA list.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWabaList();
    }, [isLoggedIn]);

    // Handle WABA Creation
    const handleCreateWaba = async () => {
        if (!newWabaName) {
            toast.error("Please enter a valid WABA name.");
            return;
        }

        try {
            const response = await createWabaAccount({ name: newWabaName });
            if (response?.success) {
                toast.success("WABA Account Created Successfully!");
                setShowCreateModal(false);
                setNewWabaName("");
                setWabaList([...wabaList, response.waba]); // Add new WABA to list
            } else {
                toast.error("Failed to create WABA account.");
            }
        } catch (error) {
            toast.error("Error creating WABA.");
        }
    };

    // Table Columns
    const columns = [
        { field: 'wabaName', headerName: 'WABA Name', flex: 1, minWidth: 120 },
        { field: 'wabaNumber', headerName: 'WABA Mobile No.', flex: 1, minWidth: 120 },
        { field: 'createdOn', headerName: 'Created On', flex: 1, minWidth: 120 },
        { field: 'expiryDate', headerName: 'Expiry Date', flex: 1, minWidth: 120 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => setSelectedWaba(params.row)}>
                        <VisibilityIcon sx={{ fontSize: '1.2rem', color: 'blue' }} />
                    </IconButton>
                    <IconButton onClick={() => toast.info("Editing WABA...")}>
                        <EditNoteIcon sx={{ fontSize: '1.2rem', color: 'gray' }} />
                    </IconButton>
                    <IconButton onClick={() => toast.error("Deleting WABA...")}>
                        <MdOutlineDeleteForever sx={{ fontSize: '1.2rem', color: 'red' }} />
                    </IconButton>
                </>
            ),
        },
    ];

    // Format Data for DataGrid
    const rows = wabaList.map((waba, index) => ({
        id: index + 1,
        wabaName: waba.name || 'N/A',
        wabaNumber: waba.mobileNo || 'N/A',
        createdOn: waba.insertTime || 'N/A',
        expiryDate: waba.expiryDate || 'N/A',
    }));

    return (
        <div className='relative'>
            {!isLoggedIn ? (
                <div className='w-full flex items-center justify-center h-[80vh]'>
                    <div className='text-center p-10 rounded-xl shadow-md bg-white space-y-3'>
                        <h1 className='font-semibold text-xl'>No account connected yet!</h1>
                        <p className='mb-6 font-medium'>Login with Facebook to continue.</p>
                        <Button variant="contained" color="primary" onClick={handleFacebookLogin}>
                            Login with Facebook
                        </Button>
                    </div>
                </div>
            ) : isLoading ? (
                <Loader />
            ) : (
                <Paper sx={{ height: 550, padding: 2 }}>
                    <Box className="flex justify-between mb-4">
                        <Typography variant="h6">Manage WABA Accounts</Typography>
                        <Button variant="contained" color="primary" onClick={() => setShowCreateModal(true)}>
                            Create WABA
                        </Button>
                    </Box>

                    {wabaList.length === 0 ? (
                        <Typography>No WABA accounts found. Click "Create WABA" to add one.</Typography>
                    ) : (
                        <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 20, 50]} pagination />
                    )}
                </Paper>
            )}

            {/* Create WABA Modal */}
            <Dialog header="Create WABA Account" visible={showCreateModal} onHide={() => setShowCreateModal(false)} className="w-[30rem]">
                <div className="p-6 space-y-4">
                    <Typography>Enter the name of the new WABA account:</Typography>
                    <input
                        type="text"
                        value={newWabaName}
                        onChange={(e) => setNewWabaName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleCreateWaba}>
                        Create WABA
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default WhatsappManageWaba;









