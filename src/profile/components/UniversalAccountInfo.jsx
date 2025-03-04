import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Table from "react-bootstrap/Table";
// import FormControl from "react-bootstrap/FormControl";
// import InputGroup from "react-bootstrap/InputGroup";
// import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../../../components/layout/InputField";
import UniversalButton from "../../../components/common/UniversalButton";

function AccountInfoModal({ show, handleClose, id = "account-info-modal", name = "AccountInfo" }) {
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [showRcsModal, setShowRcsModal] = useState(false);

  return (
    <>
      <Modal
        id={id}
        name={name}
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        style={{ backdropFilter: "blur(10px)" }}
        dialogClassName="custom-modal"
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "none",
            backgroundColor: "#b5b5b5b8",
            color: "#000",
          }}
        >
          <Modal.Title style={{ fontWeight: "600", fontSize: "1.5rem" }}>
            Account Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
            padding: "20px 20px 40px",
          }}
        >
          {/* Account Info Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 style={{ fontWeight: "600", color: "#212529" }}>Account Information</h5>
            <div
              style={{
                backgroundColor: "#1d3557",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              Account Expiry: <strong>25/02/2024</strong>
            </div>
          </div>

          {/* Account Info Table */}
          <Table bordered responsive hover style={{ textAlign: "center", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            <thead
              style={{
                backgroundColor: "#1d3557",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                letterSpacing: "0.05rem",
              }}
            >
              <tr>
                <th>Service</th>
                <th>Credits</th>
                <th>Created On</th>
                <th>Plan Expiry</th>
                <th>Pricing</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: "SMS", credits: "25000", createdOn: "25/04/2023", expiry: "15/02/2024", pricing: "0.20 INR/Credit" },
                { service: "Two Way SMS", credits: "25000", createdOn: "25/04/2023", expiry: "15/02/2024", pricing: "0.20 INR" },
                {
                  service: "RCS",
                  credits: "25000",
                  createdOn: "25/04/2023",
                  expiry: "15/02/2024",
                  pricing: (
                    <a
                      href="#"
                      id="rcsPricing"
                      name="rcsPricing-name"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRcsModal(true); // Open RCS Pricing Modal
                      }}
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontSize: "1.5rem",
                      }}
                    >
                      👁️
                    </a>
                  ),
                },
                {
                  service: "WhatsApp",
                  credits: "25000",
                  createdOn: "25/04/2023",
                  expiry: "15/02/2024",
                  pricing: (
                    <a
                      href="#"
                      id="whatsappPricing"
                      name="whatsappPricing-name"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowWhatsappModal(true); // Open WhatsApp Pricing Modal
                      }}
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontSize: "1.5rem",
                      }}
                    >
                      👁️
                    </a>
                  ),
                },
              ].map((row, index) => (
                <tr key={index} style={{ fontSize: "0.95rem", fontWeight: "500", color: "#495057" }}>
                  <td>{row.service}</td>
                  <td>{row.credits}</td>
                  <td>{row.createdOn}</td>
                  <td>{row.expiry}</td>
                  <td>{row.pricing}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* WhatsApp Pricing Modal */}
      <WhatsAppPricingModal show={showWhatsappModal} handleClose={() => setShowWhatsappModal(false)} />

      {/* RCS Pricing Modal */}
      <RcsPricingModal show={showRcsModal} handleClose={() => setShowRcsModal(false)} />
    </>
  );
}

// WhatsApp Pricing Modal
function WhatsAppPricingModal({ show, handleClose, id = "WhatsApp-info-modal", name = "WhatsApp-AccountInfo" }) {
  return (
    <Modal id={id} name={name} show={show} onHide={handleClose} size="lg" centered style={{ backdropFilter: "blur(5px)" }}>
      <Modal.Header closeButton style={{ backgroundColor: "#b5b5b5b8", color: "#000" }}>
        <Modal.Title>WhatsApp Price</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
          padding: "20px 20px 40px",
        }}
      >
        <div className="d-flex align-items-center gap-2 w-50 mb-3">
          <InputField id="whatsappcountrynameinput" name='whatsappcountrynamename' placeholder="Country Name or Code" className="form-control w-50" />
          <button id="whatsappcountrybtn" name='whatsappcountrybtnname' className="bg-gray-800 px-3 py-[0.35rem] text-white rounded-md" >Search</button>
          {/* <UniversalButton id="whatsappcountrybtn" name='whatsappcountrybtnname' label="Search" variant="primary" /> */}
        </div>
        <Table bordered responsive hover>
          <thead style={{ backgroundColor: "#1d3557", color: "#fff" }}>
            <tr>
              <th>S.No</th>
              <th>Country</th>
              <th>Country Code</th>
              <th>Utility (INR/Credit)</th>
              <th>Marketing (INR/Credit)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
              <td>0.80</td>
            </tr>
            <tr>
              <td>2</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
              <td>0.80</td>
            </tr>
            <tr>
              <td>3</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
              <td>0.80</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

// RCS Pricing Modal
function RcsPricingModal({ show, handleClose, id = "rcs-info-modal", name = "rcs-AccountInfo" }) {
  return (
    <Modal id={id} name={name} show={show} onHide={handleClose} size="lg" centered style={{ backdropFilter: "blur(5px)" }}>
      <Modal.Header closeButton style={{ backgroundColor: "#b5b5b5b8", color: "#000" }}>
        <Modal.Title>RCS Price</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
          padding: "20px 20px 40px",
        }}
      >
        <div className="d-flex align-items-center gap-2 w-50 mb-3">
          <InputField id="rcscountrynameinput" name='rcscountrynamename' placeholder="Country Name or Code" className="form-control w-50" />
          {/* <UniversalButton id="rcscountrybtn" name='rcscountrybtnname' label="Search" variant="primary" /> */}
          <button id="rcscountrybtn" name='rcscountrybtnname' className="bg-gray-800 px-3 py-[0.35rem] text-white rounded-md" >Search</button>
        </div>
        <Table bordered responsive hover>
          <thead style={{ backgroundColor: "#1d3557", color: "#fff" }}>
            <tr>
              <th>S.No</th>
              <th>Country</th>
              <th>Country Code</th>
              <th>Rate (INR/Credit)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
            </tr>
            <tr>
              <td>2</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
            </tr>
            <tr>
              <td>3</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
            </tr>
            <tr>
              <td>4</td>
              <td>India</td>
              <td>+91</td>
              <td>0.30</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default AccountInfoModal;
