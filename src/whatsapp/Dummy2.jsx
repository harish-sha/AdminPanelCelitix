import * as React from "react";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

// ✅ Styled Pagination Container
const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
});

// ✅ Custom Pagination Component
const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
    const { items } = usePagination({
        count: totalPages, // Total number of pages
        page: paginationModel.page + 1, // Convert zero-based index to one-based
        onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
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
                                sx={{ minWidth: "36px" }}
                                {...item}
                            >
                                {page}
                            </Button>
                        );
                    } else {
                        children = (
                            <Button key={index} variant="outlined" size="small" {...item}>
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

// ✅ DataTable Component
const DataTable = ({ handleView, handleDuplicate, handleDelete }) => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { field: "sn", headerName: "S.No", width: 100 },
        { field: "name", headerName: "Name", width: 180 },
        { field: "category", headerName: "Category", width: 180 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "type", headerName: "Type", width: 150 },
        { field: "health", headerName: "Health", width: 180 },
        { field: "createdat", headerName: "Created At", width: 200 },
    ];

    // ✅ Mock Data for 52 rows
    const rows = Array.from({ length: 52 }, (_, i) => ({
        id: i + 1,
        sn: i + 1,
        name: "Ram",
        category: "Sharma",
        status: 66,
        type: "5",
        health: "High",
        createdat: "12/10/2024",
    }));

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    // ✅ Custom Footer (Total Records + Custom Pagination)
    const CustomFooter = () => {
        return (
            <GridFooterContainer sx={{ justifyContent: "space-between", padding: 1 }}>
                {/* Left Section: Selected Rows & Total Records */}
                <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
                    {selectedRows.length > 0 ? (
                        <Typography variant="body2" sx={{ mr: 2, fontWeight: "bold" }}>
                            {selectedRows.length} Rows Selected
                        </Typography>
                    ) : null}
                    <Typography variant="body2">
                        Total Records: <strong>{rows.length}</strong>
                    </Typography>
                </Box>

                {/* Right Section: Custom Pagination */}
                <CustomPagination
                    totalPages={totalPages}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                />
            </GridFooterContainer>
        );
    };

    return (
        <Paper sx={{ height: 629, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                checkboxSelection
                pageSizeOptions={[10, 20, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                slots={{ footer: CustomFooter }} // ✅ Fully Integrated Custom Footer
            />
        </Paper>
    );
};

export default DataTable;
