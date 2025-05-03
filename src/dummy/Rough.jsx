import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const FormDialog = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        onSubmit(formData);
        // Close dialog
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Contact Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;


import React, { useState } from 'react';
import UniversalButton from './UniversalButton'; // Assuming this is your custom button component
import FormDialog from './FormDialog'; // Import the dialog component

const MainComponent = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleShowFormPopup = () => {
        setOpenDialog(true); // Open the dialog when button is clicked
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleFormSubmit = (formData) => {
        console.log('Form Data Submitted:', formData);
        // You can process the form data here (e.g., make an API call)
    };

    return (
        <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
            <UniversalButton
                label="Talk to Expert"
                variant="brutal"
                className="bg-[#9B44B6] border-[#9B44B6] text-white px-3 py-2 font-semibold hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#9B44B6] mb-2"
                onClick={handleShowFormPopup}
            />
            <FormDialog
                open={openDialog} // Control the dialog visibility
                onClose={handleCloseDialog} // Close dialog when cancel button is clicked
                onSubmit={handleFormSubmit} // Handle form submission
            />
        </div>
    );
};

export default MainComponent;
