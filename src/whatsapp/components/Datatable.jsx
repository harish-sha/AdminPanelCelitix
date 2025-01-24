import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DataTable = ({ handleView, handleDuplicate, handleDelete }) => {
    const columns = [
        { field: 'sn', headerName: 'S.No', width: 80 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'type', headerName: 'Type', width: 130 },
        { field: 'health', headerName: 'Health', width: 130 },
        { field: 'createdat', headerName: 'Created At', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton className='text-xs' onClick={() => handleView(params.row)}>
                        <VisibilityIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'green'
                            }}
                        />
                    </IconButton>
                    <IconButton onClick={() => handleDuplicate(params.row)}>
                        <FileCopyIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: 'gray',

                            }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <DeleteForeverIcon
                            sx={{
                                fontSize: '1.2rem',
                                color: '#e31a1a',
                            }} />
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = [
        { id: 1, sn: 1, name: 'GulshanSharmaSharmaSharmaSharma', category: 'Sharma', status: 35, type: '2', health: 'High', createdat: '11/05/2024', action: 'True' },
        { id: 2, sn: 2, name: 'Akhil', category: 'Sharma', status: 45, type: '1', health: 'Low', createdat: '15/08/2024', action: 'True' },
        { id: 3, sn: 3, name: 'Sunil', category: 'Sharma', status: 14, type: '8', health: 'Poor', createdat: '10/06/2024', action: 'True' },
        { id: 4, sn: 4, name: 'Tarun', category: 'Sharma', status: 52, type: '7', health: 'Low', createdat: '10/07/2024', action: 'True' },
        { id: 5, sn: 5, name: 'Lakshay', category: 'SharmaSharmaSharmaSharmaSharma', status: 50, type: '6', health: 'Low', createdat: '10/09/2024', action: 'True' },
        { id: 6, sn: 6, name: 'Snow', category: 'Sharma', status: 88, type: '2', health: 'High', createdat: '10/10/2024', action: 'Shyam' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
        { id: 7, sn: 7, name: 'Ram', category: 'Sharma', status: 66, type: '5', health: 'High', createdat: '12/10/2024', action: 'True' },
    ];

    return (
        // <Paper style={{ height: 400, width: '100%' }}>
        //     <DataGrid rows={rows} columns={columns} pageSize={5} />
        // </Paper>
        <Paper sx={{ height: '29rem', width: '95%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                // initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20]}
                // checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default DataTable;