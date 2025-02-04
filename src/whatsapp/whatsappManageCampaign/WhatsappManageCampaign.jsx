import React, { useState } from 'react'
import DataTable from '../components/Datatable'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { MdClose } from 'react-icons/md';
import { WhatsApp } from '@mui/icons-material';

const WhatsappManageCampaign = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleDuplicate = (row) => {
    // Implement duplicate logic here
  };

  const handleDelete = (row) => {
    // Implement delete logic here
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <DataTable
        handleView={handleView}
        handleDuplicate={handleDuplicate}
        handleDelete={handleDelete}
      />

      <Modal open={open} onClose={handleClose} className='modal-view' >
        <Box sx={modalStyle} className="rounded-lg" >
          <div className="modal-content my-2 mx-2 rounded-md">
            <div className="fixed top-2  right-2 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-300 hover:text-gray-800">
              <span className='cursor-pointer rounded-full bg-gray-200' onClick={handleClose}><MdClose size={20} /></span>
            </div>
            <div className="modal-body border-2 rounded-lg border-gray-200">
              <div className="row">
                <div className="col-lg-12">
                  <div className="mainbox p-2">
                    <span className="main-icon">
                      <WhatsApp />
                    </span>
                    <div className="imgbox ">
                      <img src="https://y20india.in/wp-content/uploads/2024/05/Best-WhatsApp-Status.jpeg" alt="" />
                    </div>
                    <div className="contentbox text-sm">
                      <p>As vibrant hues fill the canvas of life, may this festival of colors bring immense joy, success and prosperity to your corporate endeavors🎇💻</p>
                      <p>Wishing our esteemed patrons and partners a Holi filled with the splendor of laughter, the warmth of togetherness and the brightness of positivity.📞📞</p>
                      <p>Let's continue to paint the digital landscape with creativity, innovation and strategic brilliance!✨✨</p>
                      <p>Here's to a colorful journey ahead!🎉🎊</p>
                      <p>Happy Holi!🎇✨</p>
                      <p>Best Regards,🎊🎉<br />[Team Celitix]</p>
                    </div>
                    <div className="btnbox">
                      <a href="#"><i className="bi bi-telephone-fill mr-2"></i>Contact Us</a>
                    </div>
                    <div className="btnbox">
                      <a href="#"><i className="bi bi-box-arrow-up-right mr-2"></i>Visit Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px"
};

export default WhatsappManageCampaign