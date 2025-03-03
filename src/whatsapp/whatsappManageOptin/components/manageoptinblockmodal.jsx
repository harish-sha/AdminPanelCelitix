import React, { useState } from "react";
import UniversalButton from "../../components/UniversalButton";
import AnimatedDropdown from "../../components/AnimatedDropdown";
import {
   
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
} from "@mui/material";

const ManageOptinblockModal = ({ open, handleClose, selectedContacts, id,
    name, }) => {
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");

    const options1 = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const options2 = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    return (
        <Dialog
        id={id}
        name={name}
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                "& .MuiPaper-root": {
                    borderRadius: 3,
                    padding: 2,
                    background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: "bold", color: "#193cb8" }}>
                Manage Conversation Preferences
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: "#ffffff",
                        borderRadius: 2,
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="#444">
                        Contacts
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {selectedContacts.length} contact(s) selected
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
                    <AnimatedDropdown
                        label="Incoming"
                        tooltipContent="Make no change to incoming message behaviour."
                        options={options1}
                        value={selectedOption1}
                        onChange={(value) => setSelectedOption1(value)}
                    />

                    <AnimatedDropdown
                        label="Opted In"
                        tooltipContent="Make no change to Opt-in preferences."
                        options={options2}
                        value={selectedOption2}
                        onChange={(value) => setSelectedOption2(value)}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                <UniversalButton
                    id="ManageOptinblockModalsave"
                    name="ManageOptinblockModalsave"
                    label="Save"
                    onClick={handleClose}
                />
            </DialogActions>
        </Dialog>
    );
};

export default ManageOptinblockModal;
