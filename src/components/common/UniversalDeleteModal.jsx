import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const DeleteModalContent = ({ id, name, onClose, onDelete }) => (
    <>
        <DialogTitle
            sx={{
                backgroundColor: "#fefefe",
                padding: "20px",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#333",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontSize: "20px", color: "#333" }}>
                    Are you sure?
                </Typography>
                <IconButton
                    aria-label={name}
                    onClick={onClose}
                    sx={{
                        color: "#9e9e9e",
                        "&:hover": { color: "#616161" },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>

        <DialogContent
            sx={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "16px",
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#fdecea",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    border: "4px solid #f44336",
                    marginTop: "24px",
                    marginBottom: "36px",
                }}
            >
                <CloseIcon
                    sx={{
                        color: "#d32f2f",
                        fontSize: "48px",
                    }}
                />
            </Box>
            <DialogContentText
                sx={{
                    color: "#999",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    marginBottom: "16px",
                }}
            >
                Do you really want to delete these records? This process cannot be undone.
            </DialogContentText>
        </DialogContent>

        <DialogActions
            sx={{
                padding: "16px",
                justifyContent: "center",
                gap: "12px",
            }}
        >
            <Button
                onClick={onClose}
                name={name}
                sx={{
                    backgroundColor: "#f5f5f5",
                    color: "#555",
                    fontWeight: "bold",
                    padding: "10px 30px",
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#e0e0e0",
                    },
                }}
            >
                Cancel
            </Button>
            <Button
                onClick={onDelete}
                name={name}
                sx={{
                    backgroundColor: "#1565c0",
                    color: "white",
                    fontWeight: "bold",
                    padding: "10px 30px",
                    borderRadius: "12px",
                    textTransform: "none",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    "&:hover": {
                        backgroundColor: "#0d47a1",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                    },
                }}
            >
                Delete
            </Button>
        </DialogActions>
    </>
);

const UniversalDeleteModal = ({ id, name, icon }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label={name}
                name={name}
                id={id}
                onClick={handleOpen}
                sx={{
                    backgroundColor: "#fdecea",
                    "&:hover": { backgroundColor: "#ffcdd2" },
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
            >
                {icon || <DeleteIcon sx={{ color: "#d32f2f", fontSize: "28px" }} />}
            </IconButton>

            <Dialog
                id={id}
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "16px",
                        boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                        backgroundColor: "#fefefe",
                    },
                }}
            >
                <DeleteModalContent
                    id={id}
                    name={name}
                    onClose={handleClose}
                    onDelete={handleDelete}
                />
            </Dialog>
        </div>
    );
};

export default UniversalDeleteModal;
