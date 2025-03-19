import { Box, Button, Paper, styled, Typography } from '@mui/material'
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react'
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import usePagination from '@mui/material/usePagination';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import InputField from '../../../whatsapp/components/InputField';
import { IoSearch } from 'react-icons/io5';
import UniversalButton from '../../../whatsapp/components/UniversalButton';


const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
  const { items } = usePagination({
      count: totalPages,
      page: paginationModel.page + 1,
      onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
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
                          <Button key={index} variant="outlined" size="small" {...item} sx={{}} >
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

const SmsAttachmentdetaillog = ({ id, name }) => {
    const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  

  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    date: '27/09/2024',
    mobileno: '+918523698523',
    attachmenttype: 'File',
    clicktime: '27/01/2024 14:58:39',
    info: 'Mobile | OS : Android | Version : 10 | Browser : Chrome',
  }));

const columns = [
  { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 50 },
  { field: 'date', headerName: 'Date', flex: 1, minWidth: 50 },
  { field: 'mobileno', headerName: 'Mobile No.', flex: 1, minWidth: 80 },
  { field: 'attachmenttype', headerName: 'Attachment Type', flex: 1, minWidth: 100 },
  { field: 'clicktime', headerName: 'Click Time', flex: 1, minWidth: 150 },
  { field: 'info', headerName: 'Info', flex: 1, minWidth: 410 },
];
const totalPages = Math.ceil(rows.length / paginationModel.pageSize);
const CustomFooter = () => {
  return (
      <GridFooterContainer sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", lg: "space-between" },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
      }}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
              {selectedRows.length > 0 && (
                  <Typography variant="body2" sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}>
                      {selectedRows.length} Rows Selected
                  </Typography>
              )}

              <Typography variant="body2">
                  Total Records: <span className='font-semibold'>{rows.length}</span>
              </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", width: { xs: "100%", sm: "auto" } }}>
              <CustomPagination totalPages={totalPages} paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
          </Box>
      </GridFooterContainer>
  );
};
  return (
    <div>
          <div className='flex flex--wrap gap-4 items-end justify-start align-middle pb-5 w-full' >
              <div className="w-full sm:w-56">
                <InputField
                label="Mobile Number"
                id="detailslogmobile"
                name="detailslogmobile"
                type='number'
                placeholder='Enter Mobile Number'
                />
              </div>
              
              <div className="w-full sm:w-56">
                <div className="w-max-content">
                  <UniversalButton
                    label="Search"
                    id="detailslogsearch"
                    name="detailslogsearch"
                    variant="primary"
                    icon={<IoSearch />}
                  />
                </div>
              </div>
            </div>
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
                    "& .MuiDataGrid-columnHeaders": { color: "#193cb8", fontSize: "14px", fontWeight: "bold !important" },
                    "& .MuiDataGrid-row--borderBottom": { backgroundColor: "#e6f4ff !important" },
                    "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                }}
            />
        </Paper>
    </div>
  )
}

export default SmsAttachmentdetaillog
