import React from 'react';
import { Box, Typography } from '@mui/material';

const CustomNoRowsOverlay = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                p: 2,
            }}
        >
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.6rem", color: "#51a2ff", fontWeight: "500" }}>
              No Data Available
            </Typography>
        </Box>
    );
};

export default CustomNoRowsOverlay;