// import * as React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
// import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
// import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

// export default function ResponsiveDateRangePickers() {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer
//                 components={[
//                     'DateRangePicker',
//                     'MobileDateRangePicker',
//                     'DesktopDateRangePicker',
//                     'StaticDateRangePicker',
//                 ]}
//             >
//                 <DemoItem label="Desktop variant" component="DesktopDateRangePicker">
//                     <DesktopDateRangePicker
//                         defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
//                     />
//                 </DemoItem>
//                 <DemoItem label="Mobile variant" component="MobileDateRangePicker">
//                     <MobileDateRangePicker
//                         defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
//                     />
//                 </DemoItem>
//                 <DemoItem label="Responsive variant" component="DateRangePicker">
//                     <DateRangePicker
//                         defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
//                     />
//                 </DemoItem>
//                 <DemoItem label="Static variant" component="StaticDateRangePicker">
//                     <StaticDateRangePicker
//                         defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
//                         sx={{
//                             [`.${pickersLayoutClasses.contentWrapper}`]: {
//                                 alignItems: 'center',
//                             },
//                         }}
//                     />
//                 </DemoItem>
//             </DemoContainer>
//         </LocalizationProvider>
//     );
// }


import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField } from "@mui/material";

export default function CustomDateRangePicker() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
        </LocalizationProvider>
    );
}
