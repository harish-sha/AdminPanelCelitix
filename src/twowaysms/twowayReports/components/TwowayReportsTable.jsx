import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid'
import React, { useState } from 'react'
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import styled from 'styled-components';
import usePagination from '@mui/material/usePagination/usePagination';
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';

const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
});
const CustomPagination = ({
    totalPages,
    paginationModel,
    setPaginationModel,
}) => {
    const { items } = usePagination({
        count: totalPages,
        page: paginationModel.page + 1,
        onChange: (_, newPage) =>
            setPaginationModel({ ...paginationModel, page: newPage - 1 }),
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <PaginationList>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === "start-ellipsis" || type === "end-ellipsis") {
                        children = "…";
                    } else if (type === "page") {
                        children = (
                            <Button
                                key={index}
                                variant={selected ? "contained" : "outlined"}
                                size="small"
                                sx={{ minWidth: "27px" }}
                                {...item}
                            >
                                {page}
                            </Button>
                        );
                    } else {
                        children = (
                            <Button
                                key={index}
                                variant="outlined"
                                size="small"
                                {...item}
                                sx={{}}
                            >
                                {type === "previous" ? "Previous" : "Next"}
                            </Button>
                        );
                    }

                    return <li key={index}>{children}</li>;
                })}
            </PaginationList>
        </Box>
    );
};

const TwowayReportsTable = ({ id, name, }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const rows = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        source: "51510",
        keyword: "text",
        totalsms: "40",
        parsed: "25",
        notparsed: "5",
        processed: "5",
        notprocessed: "1",
        external: "1",
        notexternal: "1",
    }));

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
            field: "source",
            headerName: "Source",
            flex: 1,
            minWidth: 80,
        },
        { field: "keyword", headerName: "Keyword", flex: 1, minWidth: 80 },
        {
            field: "totalsms",
            headerName: "Total SMS",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "parsed",
            headerName: "Parsed",
            flex: 1,
            minWidth: 100,
        },
        { field: "notparsed", headerName: "Not Parsed", flex: 1, minWidth: 120 },
        {
            field: "processed",
            headerName: "Processed",
            flex: 1,
            minWidth: 100,
        },
        { field: "notprocessed", headerName: "Not Processed", flex: 1, minWidth: 80 },
        { field: "external", headerName: "External", flex: 1, minWidth: 80 },
        { field: "notexternal", headerName: "Not External", flex: 1, minWidth: 80 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <CustomTooltip
                        title="Two way Detail Report"
                        placement="top"
                        arrow={true}
                    >
                        <IconButton onClick={() => handleReport(params.row)}>
                            <DescriptionOutlinedIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                </>
            ),
        },
    ];

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    const CustomFooter = () => {
        return (
            <GridFooterContainer
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", lg: "space-between" },
                    alignItems: "center",
                    padding: 1,
                    gap: 2,
                    overflowX: "auto",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1.5,
                    }}
                >
                    {selectedRows.length > 0 && (
                        <Typography
                            variant="body2"
                            sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
                        >
                            {selectedRows.length} Rows Selected
                        </Typography>
                    )}

                    <Typography variant="body2">
                        Total Records: <span className="font-semibold">{rows.length}</span>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: { xs: "100%", sm: "auto" },
                    }}
                >
                    <CustomPagination
                        totalPages={totalPages}
                        paginationModel={paginationModel}
                        setPaginationModel={setPaginationModel}
                    />
                </Box>
            </GridFooterContainer>
        );
    };
    return (
        <Paper sx={{ height: 558 }} id={id} name={name}>
            <DataGrid
                id={id}
                name={name}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50]}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowHeight={45}
                slots={{
                    footer: CustomFooter,
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                disableRowSelectionOnClick
                disableColumnResize
                disableColumnMenu
                sx={{
                    border: 0,
                    "& .MuiDataGrid-cell": { outline: "none !important" },
                    "& .MuiDataGrid-columnHeaders": {
                        color: "#193cb8",
                        fontSize: "14px",
                        fontWeight: "bold !important",
                    },
                    "& .MuiDataGrid-row--borderBottom": {
                        backgroundColor: "#e6f4ff !important",
                    },
                    "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                }}
            />
        </Paper>
    )
}

export default TwowayReportsTable
