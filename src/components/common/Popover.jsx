import React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const BasicPopover = ({
    id = `${Date.now()}`,
    name = `${Date.now()}`,
    label1,
    value1,
    label2,
    value2,
    label3,
    value3,
    label4,
    value4,
    icon,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const tableData = [
        { label: label1, value: value1 },
        { label: label2, value: value2 },
        { label: label3, value: value3 },
        { label: label4, value: value4 },
    ];

    return (
        <div>
            <i
                aria-describedby={id}
                name={name}
                variant="contained"
                onClick={handleClick}
                sx={{
                    backgroundColor: '#6200ea',
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#3700b3' },
                }}
            >
                {/* Open Popover  */}
                {icon}
            </i>
            <Popover
                id={id}
                name={name}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '12px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '0.5px solid #d4c7c7',
                    }}
                >
                    <Table>
                        <TableBody>
                            {tableData.map(
                                (row, index) =>
                                    row.label && (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                                                '&:hover': { backgroundColor: '#e0f7fa' },
                                            }}
                                        >
                                            <TableCell
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#37474f',
                                                    border: '0.5px solid #d4c7c7',
                                                }}
                                            >
                                                {row.label}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    color: '#37474f',
                                                    textAlign: 'right',
                                                    border: '0.5px solid #d4c7c7',
                                                }}
                                            >
                                                {row.value}
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
        </div>
    );
};

export default BasicPopover;
